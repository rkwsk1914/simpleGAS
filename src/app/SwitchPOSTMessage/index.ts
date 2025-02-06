import { Log } from '@/app/common/Log'
import { GASController, } from '@/app/GASController'
import { LineApp } from '@/app/LineApp'
import { CreateDataMessage } from '@/app/CreateDataMessage'
import { Gemini } from '@/app/Gemini'

import type { MessagesType } from '@/types/lineApp'
import { SelectMenu } from '@/types/selectMenu'
import { StatusType } from '@/types/status'

import { Setting } from './Setting'

export class SwitchPOSTMessage {
  log: Log
  gasController: GASController
  LineApplication: LineApp
  GeminiApplication: Gemini
  Setting: Setting

  constructor () {
    this.log = new Log('SwitchPOSTMessage')
    this.gasController = new GASController()
    this.LineApplication = new LineApp()
    this.GeminiApplication = new Gemini()
    this.Setting = new Setting()
  }

  private async __getTodayDeadline(): Promise<Array<MessagesType>> {
    const createMessage = new CreateDataMessage()
    const message = await createMessage.pushTodayDeadlineInfo()
    return message ? message : [{
      type: 'text',
      text: `大丈夫です❗\n${SelectMenu.getTodayDeadline}のMTGはありません❗`
    }]
  }

  // private async __getDeadline(): Promise<Array<MessagesType>> {
  //   const createMessage = new CreateDataMessage()
  //   return createMessage.pushMtgInfo()
  // }

  private async __mtgInfo(): Promise<Array<MessagesType>> {
    const createMessage = new CreateDataMessage()
    return createMessage.pushSchedule()
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
    await this.log.push(['メニュー選択', '__switchMenuMessage', text])
    switch (text) {
      case SelectMenu.getTodayDeadline: {
        if (callBack && callBack.todayDeadline) return await callBack.todayDeadline()
        break
      }
      case SelectMenu.getDeadline: {
        await this.log.push(['〆切メニュー選択', callBack?.getDeadline ? true : false])
        if (callBack && callBack.getDeadline) return await callBack.getDeadline()
        break
      }
      case SelectMenu.getSchedule: {
        await this.log.push(['MTG情報メニュー選択'])
        if (callBack && callBack.mtgInfo) return await callBack.mtgInfo()
        break
      }
      case SelectMenu.setting: {
        await this.log.push(['通知設定メニュー選択'])
        if (callBack && callBack.setting) return await callBack.setting(userId)
        break
      }
      default: {
        return null
      }
    }
    return null
  }

  private async __switchStatus ({ userId, text }: {
    userId: string,
    text: string
  }): Promise<Array<MessagesType> | null> {
    const status = this.gasController.getStatus(userId)

    switch (status) {
      case StatusType.suggestionSetting: {
        // await this.log.push(['設定変更開始'])
        return await this.Setting.settingStart({
          text,
          userId
        })
      }
      case StatusType.processSetting: {
        // await this.log.push(['設定変更中'])
        return await this.Setting.switchSetting({
          text,
          userId,
        })
      }
      default: {
        return null
      }
    }
  }

  private async __groupResponse (event: any): Promise<{
    message: Array<MessagesType> | null
    userId: string | null
  }>  {
    const text = event.message.text
    const type = event.source.type
    const groupId = event.source.groupId

    if (type === 'group' && text) {
      if (groupId === process.env.MY_GROUP_ID) {
        this.LineApplication.post(groupId, [{
          type: 'text',
          text: 'MTG情報を読み込みます'
        }])
        const createMessage = new CreateDataMessage()
        const data = await this.GeminiApplication.doAskSchedule(text)

        if (!data || data.length === 0) return {
          message: null,
          // 本当はGropuId
          userId: null
        }

        const message = await createMessage.pushCreateMTGData(data)

        return {
          message: message ?? null,
          // 本当はGropuId
          userId: groupId
        }
      }
    }

    return {
      message: null,
      // 本当はGropuId
      userId: null
    }
  }

  private async __switchMessage ({ e, callBack }: {
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

    if (event.source.type === 'group') {
      return await this.__groupResponse(event)
    }

    const switchMenuMessage = () => this.__switchMenuMessage({
      userId,
      text,
      callBack: {
        todayDeadline: this.__getTodayDeadline,
        // getDeadline: this.__getDeadline,
        mtgInfo: this.__mtgInfo,
        setting: this.Setting.suggestionSetting
      }
    })

    const statusMessage = await this.__switchStatus({ userId, text })
    if (statusMessage) return {
      message: statusMessage,
      userId
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

    await this.log.push(['checkMessageAndPost', e])

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
