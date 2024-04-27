import { CHANNEL_ACCESS_TOKEN } from '@/const/settings'

import { FetchFunction } from '@/app/common/fetch'
import { SimpleGoogleSpreadsheet } from '@/app/common/SimpleGoogleSpreadsheet'
import * as HEAD from '@/app/Header'

// import { GASController } from '@/app/GASController'
import type { MessagesType, UserDataType } from '@/types/lineApp'

export class LineApp {
  urlData: Record<string, string>
  sgsGetMessage: SimpleGoogleSpreadsheet

  fetchFunction: FetchFunction
  HEADERS: {
    'Content-Type': string
    Authorization: string
  }

  constructor () {
    const DOMAIN = 'https://api.line.me/v2/bot/message'
    this.urlData = {
      reply: `${DOMAIN}/reply`,
      push: `${DOMAIN}/push`,
      profile: 'https://api.line.me/v2/bot/profile/'
    }

    this.sgsGetMessage = new SimpleGoogleSpreadsheet(HEAD.BOOK_URL, 'Chat')
    this.fetchFunction = new FetchFunction('')

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

  public checkMessageAndPost (e: any) {
    const data = JSON.parse(e.postData.contents)
    const event = data.events[0]

    this.sgsGetMessage.addData(['', JSON.stringify(event)])

    if (event.message.type !== 'text') return
    if (!event.source.userId) return

    // const userData = this.__getUserData(event.source.userId)

    this.reply(e, [{
      type: 'text',
      text: `${event.source.userId}`
    }])
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
