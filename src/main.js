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

global.doPost = (e) => {
  const data = JSON.parse(e.postData.contents)
  const events = data.events[0]

  const sheet = SpreadsheetApp.getActive().getActiveSheet()

  // LINE にデータを送り返すときに使う URL
  const replyUrl = 'https://api.line.me/v2/bot/message/reply'
  const ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN
  const HEADERS = {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: 'Bearer ' + ACCESS_TOKEN
  }
  const postData = {
    replyToken: events.replyToken,
    messages: [{
      type: 'text',
      text: 'GASから返信'
    }]
  }
  const options = {
    method: 'POST',
    headers: HEADERS,
    payload: JSON.stringify(postData)
  }

  sheet.appendRow([new Date(), events.replyToken, JSON.stringify(events)])

  const res = UrlFetchApp.fetch(replyUrl, options)
  sheet.appendRow([res.getContentText()])
}

global.postMessage = () => {
  // LINE にデータを送り返すときに使う URL
  const url = 'https://api.line.me/v2/bot/message/push'
  const ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN
  const HEADERS = {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: 'Bearer ' + ACCESS_TOKEN
  }
  const postData = {
    to: 'Ua20dc44c3f92c4475da1e28de064512a',
    messages: [{
      type: 'text',
      text: 'GASから返信'
    }]
  }
  const options = {
    method: 'POST',
    headers: HEADERS,
    payload: JSON.stringify(postData)
  }

  UrlFetchApp.fetch(url, options)
}
