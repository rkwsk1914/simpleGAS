import $ from 'jquery'
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

/*
$(window).on('load', () => {
  console.log('test')
  APPLICAION.test()
})
*/
