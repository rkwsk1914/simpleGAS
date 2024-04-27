import { MESSAGE } from '@/const/Message'
import { CHANNEL_ACCESS_TOKEN } from '@/const/settings'

import { FetchFunction } from '@/app/common/fetch'
import { Log } from '@/app/common/Log'
import { GASController } from '@/app/GASController'

import type { MessagesType, UserDataType } from '@/types/lineApp'

export class LineApp {
  urlData: Record<string, string>
  log: Log
  gasController: GASController
  fetchFunction: FetchFunction
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
    switch (text) {
      default: {
        const number = Number(text)

        if (!isNaN(number)) {
          this.gasController.addPayData(number)
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
}
