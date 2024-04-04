import { BOOK_URL } from './Header'
import { FetchFunction } from './common/fetch'
import { SimpleGoogleSpreadsheet } from './common/SimpleGoogleSpreadsheet'
import { ScanMessage } from './ScanMessage'

type MessagesType = Array<{
  type: 'text',
  text: string
}>

export class LineApp extends ScanMessage {
  urlData: Record<string, string>
  sgsGetMessage: SimpleGoogleSpreadsheet
  fetchFunction: FetchFunction
  HEADERS: {
    'Content-Type': string
    Authorization: string
  }

  constructor () {
    super()

    const DOMAIN = 'https://api.line.me/v2/bot/message'
    this.urlData = {
      reply: `${DOMAIN}/reply`,
      push: `${DOMAIN}/push`
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
  }

  reply (e: any, messages: MessagesType) {
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

  post (to: string, messages: MessagesType) {
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
}
