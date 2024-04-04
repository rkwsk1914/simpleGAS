import * as Head from './app/header.js'
import { App } from './app/app.js'
import { Event } from './app/event.js'

const Application = new App()

global.testApp = () => {
  console.info('test')
  Application.test()
}

global.originEdit = (e) => {
  const nowBook = SpreadsheetApp.getActiveSpreadsheet().getName()
  const nowSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetName()
  if (nowBook === Head.BOOK_NAME) {
    const event = new Event(Application, e, nowSheet)
    event.test()
  }
}

const reply = (contents) => {
  const channelAccessToken = process.env.CHANNEL_ACCESS_TOKEN
  // LINE にデータを送り返すときに使う URL
  const replyUrl = 'https://api.line.me/v2/bot/message/reply'
  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + channelAccessToken
    },
    payload: JSON.stringify(contents) // リクエストボディは payload に入れる
  }
  UrlFetchApp.fetch(replyUrl, options)
}

global.doPost = (e) => {
  const data = JSON.parse(e.postData.contents) // LINE から来た json データを JavaScript のオブジェクトに変換する
  const events = data.events

  const sheet = SpreadsheetApp.getActive().getActiveSheet()
  // e.postData.contents に LINE からの json 形式データがある
  sheet.appendRow([new Date(), e.postData.contents])
  sheet.appendRow([process.env.CHANNEL_ACCESS_TOKEN])
  const contents = {
    replyToken: events.replyToken, // event.replyToken は受信したメッセージに含まれる応答トークン
    messages: [{ type: 'text', text: 'GASから返信' }]
  }
  reply(contents)
}
