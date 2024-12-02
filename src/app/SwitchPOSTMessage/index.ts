import { MESSAGE } from '@/const/Message'
import { Log } from '@/app/common/Log'
import { GASController } from '@/app/GASController'
import { LineApp } from '@/app/LineApp'
import { CreateDataMessage } from '@/app/CreateDataMessage'

import type { MessagesType } from '@/types/lineApp'

export class SwitchPOSTMessage {
  log: Log
  gasController: GASController
  LineApplication: LineApp
  CreateMessage: CreateDataMessage

  constructor () {
    this.log = new Log('SwitchPOSTMessage')
    this.gasController = new GASController()
    this.LineApplication = new LineApp()
    this.CreateMessage = new CreateDataMessage()
  }

  private async __getDeadline(): Promise<Array<MessagesType>> {
    return await this.CreateMessage.pushMtgInfo()
  }

  private async __mtgInfo(): Promise<Array<MessagesType>> {
    return [{
      type: 'text',
      text: '開発中'
    }]
  }

  private async __setting(userId: string): Promise<Array<MessagesType>> {
    this.gasController.setStatus('setting', userId)
    return [{
      type: 'text',
      text: '開発中'
    }]
  }

  private async __switchMenuMessage ({
    text,
    userId,
    callBack
  }: {
    text: string
    userId: string,
    callBack?: {
      getDeadline?: () => Promise<Array<MessagesType>>,
      mtgInfo?: () => Promise<Array<MessagesType>>,
      setting?: (_userId: string) => Promise<Array<MessagesType>>,
    }
  }): Promise<Array<MessagesType> | null> {
    this.gasController.setStatus('', userId)

    switch (text) {
      case '〆切': {
        this.log.push(['〆切メニュー選択'])
        if (callBack && callBack.getDeadline) return await callBack.getDeadline()
        break
      }
      case 'MTG情報': {
        this.log.push(['MTG情報メニュー選択'])
        if (callBack && callBack.mtgInfo) return await callBack.mtgInfo()
        break
      }
      case '通知設定': {
        this.log.push(['通知設定メニュー選択'])
        if (callBack && callBack.setting) return await callBack.setting(userId)
        break
      }
      default: {
        return null
      }
    }
    return null
  }

  private async __switchMessage ({
    e,
    callBack,
  }: {
    e: GoogleAppsScript.Events.DoPost,
    callBack?: {
      menu?: () => Promise<void>,
      default?: () => Promise<void>,
      getDeadline?: () => Promise<void>,
      mtgInfo?: () => Promise<void>,
      setting?: () => Promise<void>,
    }
  }): Promise<Array<MessagesType>> {
    const user = await this.LineApplication.getUserDataFromMessage(e)
    if (!user?.userId) {
      return [{
        type: 'text',
        text: 'ユーザー情報の取得エラー'
      }]
    }

    const userId = user.userId
    const data = JSON.parse(e.postData.contents)
    const event = data.events[0]
    const text = event.message.text
    // const status = this.gasController.getStatus(userId)

    const switchMenuMessage = () => this.__switchMenuMessage({
      userId,
      text,
      callBack: {
        getDeadline: this.__getDeadline,
        mtgInfo: this.__mtgInfo,
        setting: this.__setting
      }
    })

    switch (text) {
      case 'メニュー': {
        if (callBack && callBack.menu) callBack.menu()
        return [{
          type: 'text',
          text: '以下のメッセージをしてください。\n〆切\nMTG情報\n通知設定'
        }]
      }

      default: {
        const message = await switchMenuMessage()
        if (message) return message

        if (callBack && callBack.default) callBack.default()
        const array = text.split('\n')
        const number = Number(array[0])

        if (!isNaN(number)) {
          return [MESSAGE.successAddPay]
        }

        return [MESSAGE.failedAddPay]
      }
    }
  }

  public async checkMessageAndPost ({
    e,
    callBack
  } : {
    e: GoogleAppsScript.Events.DoPost,
    callBack?: {
      message?: () => Promise<void>,
      join?: () => Promise<void>,
      leave?: () => Promise<void>,
      follow?: () => Promise<void>,
    }
  }) {
    const data = JSON.parse(e.postData.contents)
    const event = data.events[0]

    this.log.push([event])

    switch (event.type) {
      case 'message':
        this.__switchMessage({
          e,
          callBack: {
            default: callBack?.message ?? undefined,
            getDeadline: undefined,
          }
        })
        return
      case 'join':
        if(callBack?.join) callBack.join()
        return
      case 'follow':
        if(callBack?.follow) callBack.follow()
        return
      default:
        return
    }
  }
}
