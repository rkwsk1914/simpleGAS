import * as HEAD from './Header'
import { FetchFunction } from './common/fetch'
import { SimpleGoogleSpreadsheet } from './common/SimpleGoogleSpreadsheet'
import { GASController } from './GASController'
import { ERROR_MESSAGE, INFO_MESSAGE } from './Message'

import type { MessagesType, UserDataType, UserStateType } from './../types/lineApp'

export class LineApp extends GASController {
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
      push: `${DOMAIN}/push`,
      profile: 'https://api.line.me/v2/bot/profile/'
    }

    this.sgsGetMessage = new SimpleGoogleSpreadsheet(HEAD.BOOK_URL, 'getMessage')
    this.fetchFunction = new FetchFunction('')

    const ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN
    this.HEADERS = {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + ACCESS_TOKEN
    }
  }

  private __checkMessagesUndefined (messages: Array<MessagesType>): boolean {
    // this.console.log(['__checkMessagesUndefined', String(messages.length)])
    for (let index = 0; index < messages.length; index++) {
      // this.console.log(['__checkMessagesUndefined', String(index), JSON.stringify(messages[index])])
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

    const stateListData = this.sgsUserState.doReadSSVerString('A:C')
    let state = '' as UserStateType
    let rowIndex = 0
    stateListData.forEach((rowData, index) => {
      if (rowData[HEAD.ARRAY_COL_B] === res.userId) {
        state = rowData[HEAD.ARRAY_COL_C] as UserStateType
        rowIndex = index
      }
    })

    if (rowIndex === 0) {
      this.sgsUserState.doWriteSS(res.displayName, stateListData.length, HEAD.ARRAY_COL_A)
      this.sgsUserState.doWriteSS(res.userId, stateListData.length, HEAD.ARRAY_COL_B)
      rowIndex = stateListData.length
    }

    return {
      userId: res.userId,
      name: res.displayName,
      state,
      rowIndex
    }
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

  public post (to: string, messages: Array<MessagesType>) {
    // this.console.log(['POST', String(this.__checkMessagesUndefined(messages))])
    if (this.__checkMessagesUndefined(messages)) return

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

  public checkMessageAndPost (e: any) {
    const data = JSON.parse(e.postData.contents)
    const event = data.events[0]

    if (event.message.type !== 'text') return

    const userData = this.__getUserData(event.source.userId)
    if (!userData) {
      this.reply(e, [ERROR_MESSAGE.notFindUserId])
      return
    }

    switch (event.message.text) {
      case '参加申込': {
        this.setGASUserState(userData, 'apply')
        this.reply(e, [
          this.getGASEventList(),
          INFO_MESSAGE.telMeApplyEventId,
          INFO_MESSAGE.doYouWannaDetail
        ])
        return
      }
      case '詳細': {
        this.setGASUserState(userData, 'before apply detail')
        this.reply(e, [
          this.getGASEventList(), INFO_MESSAGE.telMeDetailEventId
        ])
        return
      }
      default: {
        if (userData.state === 'before apply detail') {
          this.setGASUserState(userData, 'apply')
          this.reply(e, [
            this.getGASEventDetail(event.message.text),
            INFO_MESSAGE.telMeApplyEventId,
            INFO_MESSAGE.doYouWannaDetail
          ])
          return
        }

        if (userData.state === 'apply') {
          this.__apply(e, userData)
          this.setGASUserState(userData, '')
          return
        }

        this.reply(e, [INFO_MESSAGE.default])
      }
    }
  }

  private __apply (e: any, userData: UserDataType) {
    const data = JSON.parse(e.postData.contents)
    const event = data.events[0]

    this.reply(e, [this.setGASApplyEvent(userData, event.message.text)])
  }
}