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
  }
}

