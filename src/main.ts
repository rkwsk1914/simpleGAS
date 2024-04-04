import * as Head from './app/header.js'
import { App } from './app/app.js'
import { Event } from './app/event.js'

const APPLICAION = new App()

global.testApp = () => {
  console.log('test')
  APPLICAION.test()
}

global.originEdit = (e) => {
  const nowBook = SpreadsheetApp.getActiveSpreadsheet().getName()
  const nowSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetName()
  if (nowBook === Head.BOOK_NAME) {
    const event = new Event(APPLICAION, e, nowSheet)
  }
}

global.doPost = (e) => {
  const sheet = SpreadsheetApp.getActive().getActiveSheet()
  // e.postData.contents に LINE からの json 形式データがある
  sheet.appendRow([new Date(), e.postData.contents])
}
