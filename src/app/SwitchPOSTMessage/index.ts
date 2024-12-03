import { Log } from '@/app/common/Log'
import { GASController } from '@/app/GASController'
import { LineApp } from '@/app/LineApp'
import { CreateDataMessage } from '@/app/CreateDataMessage'

import type { MessagesType } from '@/types/lineApp'
import { SelectMenu } from '@/types/selectMenu'
import { StatusType } from '@/types/status'

export class SwitchPOSTMessage {
  log: Log
  gasController: GASController
  LineApplication: LineApp

  constructor () {
    this.log = new Log('SwitchPOSTMessage')
    this.gasController = new GASController()
    this.LineApplication = new LineApp()
  }

  private async __getTodayDeadline(): Promise<Array<MessagesType>> {
    const createMessage = new CreateDataMessage()
    const message = createMessage.pushTodayDeadlineInfo()
    return message ? message : [{
      type: 'text',
      text: 'ご安心を！\n本日〆切のMTGはありません'
    }]
  }

  private async __getDeadline(): Promise<Array<MessagesType>> {
    const createMessage = new CreateDataMessage()
    return createMessage.pushMtgInfo()
  }

  private async __mtgInfo(): Promise<Array<MessagesType>> {
    const createMessage = new CreateDataMessage()
    return createMessage.pushSchedule()
  }

  private async __suggestionSetting(userId: string): Promise<Array<MessagesType>> {
    const gas = new GASController()
    gas.setStatus(StatusType.startSetting, userId)
    const setting = gas.getSetting(userId)
    const text1 = '現在の通知設定です。\n\n' + setting
    const text2 = '設定を変更しますか？\n\n1. はい\n2. いいえ'

    return [{
      type: 'text',
      text: text1
    },{
      type: 'text',
      text: text2
    }]
  }

  private __setting (): Array<MessagesType> {
    const text2 = '好きな通知設定（数字）を選んでください。\n\n' +
    `1. ${SelectMenu.deadline}` + '\n' +
    `2. ${SelectMenu.todayDeadline}` + '\n' +
    `3. ${SelectMenu.schedule}` + '\n' +
    `4. ${SelectMenu.cancel}`
  return [{
    type: 'text',
    text: text2
  }]
  }

  private async __settingStart ({
    text,
    userId,
  }: {
    text: string
    userId: string,
  }): Promise<Array<MessagesType> | null> {
    const gas = new GASController()
    switch (text) {
      case '1':
      case '１':
      case SelectMenu.yes: {
        gas.setStatus(StatusType.processSetting, userId)
        return this.__setting()
      }
      default: {
        gas.setStatus(StatusType.default, userId)
        return null
      }
    }
  }

  private async __switchSetting ({
    text,
    userId,
  }: {
    text: string
    userId: string,
  }): Promise<Array<MessagesType>> {
    const gas = new GASController()
    gas.setStatus(StatusType.default, userId)
    const setting = gas.getSetting(userId)
    switch (text) {
      case '1':
      case '１':
      case SelectMenu.deadline: {
        this.gasController.setSetting(SelectMenu.deadline, userId)
        break
      }
      case '2':
      case '２':
      case SelectMenu.todayDeadline: {
        this.gasController.setSetting(SelectMenu.todayDeadline, userId)
        break
      }
      case '3':
      case '３':
      case SelectMenu.schedule: {
        this.gasController.setSetting(SelectMenu.schedule, userId)
        break
      }
      case '4':
      case '４':
      case SelectMenu.cancel:
      case 'キャンセル': {
        return [{
          type: 'text',
          text: 'キャンセルしました'
        }, {
          type: 'text',
          text:  '現在の通知設定です。\n\n' + setting
        }]
      }
      case SelectMenu.getDeadline:
      case SelectMenu.getTodayDeadline:
      case SelectMenu.getSchedule:
      case SelectMenu.setting: {
        const missSelectMessage: Array<MessagesType> = []
        missSelectMessage.push({
          type: 'text',
          text: 'ちょいまち！\n先に通知設定を完了してね！'
        })
        const settingMessage = await this.__setting()
        this.log.push(['__switchSetting', settingMessage])
        return [...missSelectMessage, ...settingMessage]
      }
      default: {
        const missSelectMessage: Array<MessagesType> = []
        missSelectMessage.push({
          type: 'text',
          text: '無効な入力です。1~4の数字で選択してください。'
        })
        const settingMessage = await this.__setting()
        this.log.push(['__switchSetting', settingMessage])
        return [...missSelectMessage, ...settingMessage]
      }
    }

    const newSetting = gas.getSetting(userId)
    return [{
      type: 'text',
      text: '通知設定を変更しました！'
    }, {
      type: 'text',
      text:  '現在の通知設定です。\n\n' + newSetting
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
      todayDeadline?: () => Promise<Array<MessagesType>>,
      getDeadline?: () => Promise<Array<MessagesType>>,
      mtgInfo?: () => Promise<Array<MessagesType>>,
      setting?: (_userId: string) => Promise<Array<MessagesType>>,
    }
  }): Promise<Array<MessagesType> | null> {
    switch (text) {
      case SelectMenu.getTodayDeadline: {
        if (callBack && callBack.todayDeadline) return await callBack.todayDeadline()
        break
      }
      case SelectMenu.getDeadline: {
        this.log.push(['〆切メニュー選択', callBack?.getDeadline ? true : false])
        if (callBack && callBack.getDeadline) return await callBack.getDeadline()
        break
      }
      case SelectMenu.getSchedule: {
        this.log.push(['MTG情報メニュー選択'])
        if (callBack && callBack.mtgInfo) return await callBack.mtgInfo()
        break
      }
      case SelectMenu.setting: {
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
      default?: () => Promise<void>,
      menu?: () => Promise<void>,
    }
  }): Promise<{
    message: Array<MessagesType> | null
    userId: string | null
  }> {
    const user = await this.LineApplication.getUserDataFromMessage(e)
    if (!user?.userId) {
      return {
        message: [{
          type: 'text',
          text: 'ユーザー情報の取得エラー'
        }],
        userId: null
      }
    }

    const userId = user.userId
    const data = JSON.parse(e.postData.contents)
    const event = data.events[0]
    const text = event.message.text

    if (event.source.type === 'group') return {
      message: null,
      userId: null
    }

    const switchMenuMessage = () => this.__switchMenuMessage({
      userId,
      text,
      callBack: {
        todayDeadline: this.__getTodayDeadline,
        getDeadline: this.__getDeadline,
        mtgInfo: this.__mtgInfo,
        setting: this.__suggestionSetting
      }
    })

    const status = this.gasController.getStatus(userId)

    switch (status) {
      case StatusType.suggestionSetting: {
        this.log.push(['設定する？'])
        const message = await this.__suggestionSetting(userId)
        return {
          message,
          userId
        }
      }
      case StatusType.startSetting: {
        this.log.push(['設定変更開始'])
        const message = await this.__settingStart({
          text,
          userId
        })
        return {
          message,
          userId
        }
      }
      case StatusType.processSetting: {
        this.log.push(['設定変更中'])
        const message = await this.__switchSetting({
          text,
          userId,
        })
        return {
          message,
          userId
        }
      }
      default: {
        break
      }
    }

    switch (text) {
      case 'メニュー': {
        if (callBack && callBack.menu) callBack.menu()
        return {
          message: [{
            type: 'text',
            text: `以下のメッセージをしてください。\n${SelectMenu.getDeadline}\n${SelectMenu.getTodayDeadline}\n${SelectMenu.getSchedule}\n${SelectMenu.setting}`
          }],
          userId
        }
      }

      default: {
        const message = await switchMenuMessage()
        if (message) return {
          message,
          userId
        }

        if (callBack && callBack.default) callBack.default()
        return {
          message: null,
          userId: null
        }
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
  }): Promise<{
    message: Array<MessagesType> | null
    userId: string | null
  } | null> {
    const data = JSON.parse(e.postData.contents)
    const event = data.events[0]

    this.log.push([event])

    switch (event.type) {
      case 'message': {
          return await this.__switchMessage({
            e,
            callBack: {
              default: callBack?.message ?? undefined,
            }
          })
        }
      case 'join': {
        if(callBack?.join) callBack.join()
          return null
        }
      case 'follow': {
        if(callBack?.follow) callBack.follow()
          return null
        }
      default: {
        return null
        }
    }
  }
}
