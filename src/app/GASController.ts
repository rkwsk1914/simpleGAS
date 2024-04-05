import * as HEAD from './Header'
import { SimpleGoogleSpreadsheet } from './common/SimpleGoogleSpreadsheet'
import type { MessagesType, UserDataType, UserStateType } from './../types/lineApp'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale/ja'
import formatNumber from 'format-number'
import { Log } from './Log'
import { ERROR_MESSAGE, WARN_MESSAGE } from './Message'

export class GASController {
  console: Log
  sgsThisMonth: SimpleGoogleSpreadsheet
  sgsUserApplyEvent: SimpleGoogleSpreadsheet
  sgsUserPayedEvent: SimpleGoogleSpreadsheet
  sgsEventParticipationStatus: SimpleGoogleSpreadsheet
  sgsUserState: SimpleGoogleSpreadsheet

  constructor () {
    this.console = new Log()
    this.sgsThisMonth = new SimpleGoogleSpreadsheet(HEAD.BOOK_URL, 'this Month')
    this.sgsUserApplyEvent = new SimpleGoogleSpreadsheet(HEAD.BOOK_URL, 'user apply Event')
    this.sgsUserPayedEvent = new SimpleGoogleSpreadsheet(HEAD.BOOK_URL, 'user payed Event')
    this.sgsEventParticipationStatus = new SimpleGoogleSpreadsheet(HEAD.BOOK_URL, 'Event Participation Status')
    this.sgsUserState = new SimpleGoogleSpreadsheet(HEAD.BOOK_URL, 'user state')
  }

  private __getData (rowData: Array<any>, index: number): Record<string, string | boolean> | undefined {
    let isAllBlank = true
    for (let col = 0; col < rowData.length; col++) {
      const element = rowData[col]
      if (element || element !== '') isAllBlank = false
    }
    if (isAllBlank) return undefined

    const notFix = rowData[HEAD.ARRAY_COL_J] === true

    const startDay = format(new Date(rowData[HEAD.ARRAY_COL_B]), 'M/d(E)', { locale: ja })
    const startTime = format(new Date(rowData[HEAD.ARRAY_COL_D]), 'H:mm')

    const endDay = format(new Date(rowData[HEAD.ARRAY_COL_C]), 'M/d(E)', { locale: ja })
    const endTime = format(new Date(rowData[HEAD.ARRAY_COL_E]), 'H:mm')

    const isOneDay = startDay === endDay
    const whenDay = isOneDay ? `${startDay} ` : ''
    const whenTime = isOneDay
      ? `${startTime} ~ ${endTime}`
      : `${startDay} ${startTime} ~ ${endDay} ${endTime}`

    const when = whenDay + whenTime
    const what = rowData[HEAD.ARRAY_COL_A]
    const where = rowData[HEAD.ARRAY_COL_G]

    const price = formatNumber({
      round: 0
    })(rowData[HEAD.ARRAY_COL_I])
    const title = notFix
      ? `(${index}) ${what} (未確定)`
      : `(${index}) ${what}`

    const subText = rowData[HEAD.ARRAY_COL_K]
    const description = rowData[HEAD.ARRAY_COL_H]

    return {
      title,
      when,
      what,
      where,
      price,
      subText,
      description,
      isOneDay
    }
  }

  private __extractNumbers (input): Array<number> {
    const fixHalf = input.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
    })
    // 正規表現を使用して数字を抽出
    const numbers = fixHalf.match(/\d+/g)
    // 数字が見つかった場合、それらをNumber型に変換して配列に格納
    if (numbers) {
      return numbers.map(num => Number(num))
    } else {
      return []
    }
  }

  public getGASSchedule (): MessagesType {
    const data = this.sgsThisMonth.doReadSSVerString('A:Z')
    // this.console.log(['getGASSchedule', JSON.stringify(data)])

    let message = ''
    data.forEach((row, index) => {
      if (index > 0 && row[0] !== '') {
        const detail = this.__getData(row, index)

        if (!detail) {
          return WARN_MESSAGE.notFindSchedule
        }

        if (detail) {
          message = message + `${detail.title}`
          message = message + (detail.isOneDay ? `\n🗓️ ${detail.when}` : `\n🗓️\n${detail.when}`)
          message = message + (detail.price === '0' ? `\n💰 なし` : `\n💰 ${detail.price}円`)
          if (detail.where) message = message + `\n🚩 ${detail.where}`
          if (detail.subText) message = message + `\n\n${detail.subText}`
          message = message + '\n\n------------------------------\n\n'
        }
      }
    })

    return {
      type: 'text',
      text: message
    }
  }

  public getGASEventList (): MessagesType {
    const data = this.sgsThisMonth.doReadSSVerString('A:Z')
    // this.console.log(['getGASEventList', JSON.stringify(data)])

    let message = ''
    data.forEach((row, index) => {
      if (index > 0 && row[0] !== '') {
        const detail = this.__getData(row, index)
        if (!detail) {
          return WARN_MESSAGE.notFindSchedule
        }

        if (detail) message = message + `${detail.title}\n`
      }
    })

    return {
      type: 'text',
      text: message
    }
  }

  public getGASEventDetail (input: string): MessagesType {
    const data = this.sgsThisMonth.doReadSSVerString('A:Z')
    // this.console.log(['getGASEventDetail', JSON.stringify(data)])

    const eventIndexList = this.__extractNumbers(input)

    if (eventIndexList.length > 1) {
      return ERROR_MESSAGE.pleaseOne
    }

    if (eventIndexList.length === 0) {
      return ERROR_MESSAGE.undefinedEventId
    }

    let message = ''
    const index = eventIndexList[0]
    const detail = this.__getData(data[index], index)

    if (!detail) {
      return ERROR_MESSAGE.notFindEventId
    }

    if (detail) {
      message = message + `${detail.title}`
      message = message + (detail.isOneDay ? `\n🗓️ ${detail.when}` : `\n🗓️\n${detail.when}`)
      message = message + (detail.price === '0' ? `\n💰 なし` : `\n💰 ${detail.price}円`)
      if (detail.where) message = message + `\n🚩 ${detail.where}`
      if (detail.description) message = message + `\n\n${detail.description}`
    }

    return {
      type: 'text',
      text: message
    }
  }

  private __setUerList (userData: UserDataType) {
    const findUserIndex = (userData: UserDataType, sgs: SimpleGoogleSpreadsheet) => {
      const data = sgs.doReadSSVerString('A:B')

      for (let index = 0; index < data.length; index++) {
        const row = data[index]

        if (row[HEAD.ARRAY_COL_B] === userData.userId) return

        if (row[HEAD.ARRAY_COL_B] === '') {
          sgs.addData([userData.name, userData.userId])
          return
        }
      }
    }

    findUserIndex(userData, this.sgsUserApplyEvent)
    findUserIndex(userData, this.sgsUserPayedEvent)
    findUserIndex(userData, this.sgsUserState)
  }

  public setGASApplyEvent (userData: UserDataType, input: string): MessagesType {
    const addEventParticipationStatus = (userId: string, index: number) => {
      const list = this.sgsThisMonth.doReadSSVerString('A:I')
      const fixList = list.filter((row, index) => index > 0 && row[0] !== '')
      const data = [...Array(fixList.length)].map((_item, _i) => {
        return _i === (index - 1) ? userId : ''
      })

      this.sgsEventParticipationStatus.addData(data)
    }

    if (!userData) {
      return ERROR_MESSAGE.notFindUserId
    }

    const eventIndexList = this.__extractNumbers(input)
    if (eventIndexList.length === 0) {
      return ERROR_MESSAGE.missApplyMessage
    }

    this.__setUerList(userData)

    eventIndexList.forEach((eventIndex: number) => {
      addEventParticipationStatus(userData.userId, eventIndex)
    })

    return {
      type: 'text',
      text: '申し込み完了しました。'
    }
  }

  public setGASUserState (userData: UserDataType, state: UserStateType) {
    this.sgsUserState.doWriteSS(state, userData.rowIndex, HEAD.ARRAY_COL_C)
  }
}
