import { MESSAGE } from '@/const/Message'
import { CHANNEL_ACCESS_TOKEN } from '@/const/settings'

import { FetchFunction } from '@/app/common/fetch'
import { Log } from '@/app/common/Log'
import { CreateDataMessage } from '@/app/CreateDataMessage'
import { GASController } from '@/app/GASController'

import type { MessagesType, UserDataType } from '@/types/lineApp'

export class LineApp {
  urlData: Record<string, string>
  log: Log
  gasController: GASController
  fetchFunction: FetchFunction
  createMessage :CreateDataMessage
  HEADERS: {
    'Content-Type': string
    Authorization: string
  }

  constructor () {
    this.urlData = {
      reply: 'https://api.line.me/v2/bot/message/reply',
      push: 'https://api.line.me/v2/bot/message/push',
      profile: 'https://api.line.me/v2/bot/profile/'
    }

    this.log = new Log('LineApp')
    this.fetchFunction = new FetchFunction()
    this.gasController = new GASController()
    this.createMessage = new CreateDataMessage()

    this.HEADERS = {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + CHANNEL_ACCESS_TOKEN
    }
  }

  private __checkMessagesUndefined (messages: Array<MessagesType>): boolean {
    for (let index = 0; index < messages.length; index++) {
      if (messages[index] === undefined) return true
    }
    return false
  }

  private __getUserData (userId: string): UserDataType | undefined {
    if (!userId) return undefined

    const options = {
      method: 'GET',
      headers: this.HEADERS
    }
    const url = this.urlData.profile + '/' + userId
    const res = this.fetchFunction.doGet({ url, options })

    if (!res.userId) return undefined

    return {
      userId: res.userId,
      name: res.displayName
    }
  }

  private __switchMessage (text: string): Array<MessagesType> {
    const status = this.gasController.getStatus()
    const settingMonth = this.gasController.getSettingMonth() ?? undefined

    if (status === 'setMonth') {
      const regex = /^(1|2|3|4|5|6|7|8|9|10|11|12)月$/
      const isValid = regex.test(text)

      if (!isValid) {
        return [{
          type: 'text',
          text: '無効な値です。'
        }]
      }

      this.gasController.setStatus('')
      this.gasController.setSettingMonth(text)
      return [{
        type: 'text',
        text: `${text} に変更しました。`
      }]
    }

    switch (text) {
      case 'メニュー': {
        return [{
          type: 'text',
          text: '以下のメッセージをしてください。\n月指定\n残高\nカード\n詳細\n引き落とし'
        }]
      }
      case '月確認': {
        if (!settingMonth) {
          return [{
            type: 'text',
            text: '現在、月は設定されていません。\n\n今月のデータが参照できます。'
          }]
        }
        return [{
          type: 'text',
          text: `${settingMonth}月が設定されています。`
        }]
      }
      case '月指定': {
        this.gasController.setStatus('setMonth')
        return [{
          type: 'text',
          text: '月を指定してください。\n\nex) 1月、12月'
        }]
      }
      case '残高': {
        return [this.createMessage.pay(this.gasController.getThisMonthData(settingMonth))]
      }
      case 'カード': {
        return [this.createMessage.card(this.gasController.getThisMonthData(settingMonth))]
      }
      case '詳細': {
        return [this.createMessage.detail(this.gasController.getThisMonthData(settingMonth))]
      }
      case '引き落とし': {
        return [this.createMessage.debit(this.gasController.getThisMonthData(settingMonth))]
      }
      default: {
        const array = text.split('\n')
        const number = Number(array[0])

        if (!isNaN(number)) {
          this.gasController.addPayData(number, array[1] ?? '', array[2] ?? '')
          return [MESSAGE.successAddPay]
        }

        return [MESSAGE.failedAddPay]
      }
    }
  }

  public checkMessageAndPost (e: any) {
    const data = JSON.parse(e.postData.contents)
    const event = data.events[0]

    this.log.push([event])

    if (event.message.type !== 'text') return
    if (!event.source.userId) return

    const messages = this.__switchMessage(event.message.text)

    this.reply(e, messages)
  }

  public reply (e: any, messages: Array<MessagesType>) {
    if (this.__checkMessagesUndefined(messages)) return

    const data = JSON.parse(e.postData.contents)
    const event = data.events[0]

    const postData = {
      replyToken: event.replyToken,
      messages
    }
    const options = {
      method: 'POST',
      headers: this.HEADERS,
      payload: JSON.stringify(postData)
    }

    this.fetchFunction.doPost({ url: this.urlData.reply, options })
  }

  public post (toId: string, messages: Array<MessagesType>) {
    if (this.__checkMessagesUndefined(messages)) return

    const postData = {
      to: toId,
      messages
    }

    const options = {
      method: 'POST',
      headers: this.HEADERS,
      payload: JSON.stringify(postData)
    }

    this.fetchFunction.doPost({ url: this.urlData.push, options })
  }

  public announceBalance (toId: string) {
    const postData = {
      to: toId,
      messages: [this.createMessage.pay(this.gasController.getThisMonthData())]
    }

    const options = {
      method: 'POST',
      headers: this.HEADERS,
      payload: JSON.stringify(postData)
    }

    this.fetchFunction.doPost({ url: this.urlData.push, options })
  }
}
