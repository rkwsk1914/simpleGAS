import { BOOK_URL } from './Header'
import { FetchFunction } from './common/fetch'
import { SimpleGoogleSpreadsheet } from './common/SimpleGoogleSpreadsheet'
import { ScanMessage } from './ScanMessage'

import type { MessagesType, UserData } from './../types/lineApp'

export class LineApp extends ScanMessage {
  urlData: Record<string, string>
  sgsGetMessage: SimpleGoogleSpreadsheet
  fetchFunction: FetchFunction
  HEADERS: {
    'Content-Type': string
    Authorization: string
  }

  state: {
    apply: boolean
    eventDetail: boolean
  }

  constructor () {
    super()

    const DOMAIN = 'https://api.line.me/v2/bot/message'
    this.urlData = {
      reply: `${DOMAIN}/reply`,
      push: `${DOMAIN}/push`,
      profile: 'https://api.line.me/v2/bot/profile/'
    }
    const sheetName = [
      'getMessage'
    ]

    this.sgsGetMessage = new SimpleGoogleSpreadsheet(BOOK_URL, sheetName[0])
    this.fetchFunction = new FetchFunction('')

    const ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN
    this.HEADERS = {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + ACCESS_TOKEN
    }

    // 状態管理
    this.state = {
      apply: false,
      eventDetail: false
    }
  }

  reply (e: any, messages: Array<MessagesType>) {
    if (!messages) return

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

  post (to: string, messages: Array<MessagesType>) {
    if (!messages) return

    const postData = {
      to,
      messages
    }

    const options = {
      method: 'POST',
      headers: this.HEADERS,
      payload: JSON.stringify(postData)
    }

    this.fetchFunction.doPost({ url: this.urlData.push, options })
  }

  getUserData (userId: string): UserData {
    if (!userId) return

    const options = {
      method: 'GET',
      headers: this.HEADERS
    }

    const url = this.urlData.profile + '/' + userId

    const res = this.fetchFunction.doGet({ url, options })

    return {
      userId: res.userId,
      name: res.displayName
    }
  }

  checkMessageAndPost (e: any) {
    const data = JSON.parse(e.postData.contents)
    const event = data.events[0]

    if (event.message.type !== 'text') return

    if (this.state.apply && this.state.eventDetail) {
      const eventIndexList = this.__extractNumbers(event.message.text)
      eventIndexList.forEach((eventIndex) => this.showDetail(eventIndex))
      return
    }

    if (this.state.apply) {
      this.apply(e)
      this.state.apply = false
      this.state.eventDetail = false
      return
    }

    switch (event.message.text) {
      case '参加申込': {
        this.state.apply = true
        this.reply(e, [this.showList(), {
          type: 'text',
          text: '参加するイベントの番号を教えて！'
        }, {
          type: 'text',
          text: '詳細が知りたければ「詳細」ってメッセージして！'
        }])
        break
      }
      case '詳細': {
        this.state.eventDetail = true
        this.reply(e, [this.showList(), {
          type: 'text',
          text: '詳細が知りたいイベントの番号を教えて！'
        }])
        break
      }
      default: {
        this.postDefaultResponseMessage(e)
        break
      }
    }
  }

  postDefaultResponseMessage (e: any) {
    this.reply(e, [{
      type: 'text',
      text: '参加するなら「参加申込」ってメッセージして！'
    }])
  }

  apply (e: any) {
    const data = JSON.parse(e.postData.contents)
    const event = data.events[0]

    const userData = this.getUserData(event.source.userId)

    const postData = {
      replyToken: event.replyToken,
      messages: this.addApply(userData, event.message.text)
    }
    const options = {
      method: 'POST',
      headers: this.HEADERS,
      payload: JSON.stringify(postData)
    }

    this.fetchFunction.doPost({ url: this.urlData.reply, options })
  }
}
