import { BOOK_URL } from './Header'
import * as HEAD from './Header'
import { SimpleGoogleSpreadsheet } from './common/SimpleGoogleSpreadsheet'
import type { MessagesType, UserData } from './../types/lineApp'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale/ja'
import formatNumber from 'format-number'
import { Log } from './Log'

export class ScanMessage {
  console: Log
  sgsThisMonth: SimpleGoogleSpreadsheet
  sgsUserApplyEvent: SimpleGoogleSpreadsheet
  sgsUserPayedEvent: SimpleGoogleSpreadsheet
  sgsEventParticipationStatus: SimpleGoogleSpreadsheet

  constructor () {
    this.console = new Log()
    this.sgsThisMonth = new SimpleGoogleSpreadsheet(BOOK_URL, 'this Month')
    this.sgsUserApplyEvent = new SimpleGoogleSpreadsheet(BOOK_URL, 'user apply Event')
    this.sgsUserPayedEvent = new SimpleGoogleSpreadsheet(BOOK_URL, 'user payed Event')
    this.sgsEventParticipationStatus = new SimpleGoogleSpreadsheet(BOOK_URL, 'Event Participation Status')
  }

  getData (rowData: Array<any>, index: number): Record<string, string | boolean> | null {
    let isAllBlank = true
    for (let index = 0; index < rowData.length; index++) {
      const element = rowData[index]
      if (element || element !== '') isAllBlank = true
    }
    if (isAllBlank) return null

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

  showSchedule (): MessagesType {
    const data = this.sgsThisMonth.doReadSSVerString('A:Z')

    let message = ''
    data.forEach((row, index) => {
      if (index > 0 && row[0] !== '') {
        const detail = this.getData(row, index)

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

    if (message === '') return null

    return {
      type: 'text',
      text: message
    }
  }

  showList (): MessagesType {
    const data = this.sgsThisMonth.doReadSSVerString('A:Z')

    let message = ''
    data.forEach((row, index) => {
      if (index > 0 && row[0] !== '') {
        const detail = this.getData(row, index)
        this.console.log(['message', message, JSON.stringify(detail)])
        if (detail) message = message + `${detail.title}\n`
      }
    })

    if (message === '') return null

    return {
      type: 'text',
      text: message
    }
  }

  showDetail (eventNumber: number): MessagesType {
    const data = this.sgsThisMonth.doReadSSVerString('A:I')

    let message = ''
    const index = eventNumber
    const detail = this.getData(data[index], index)

    if (detail) {
      message = message + `${detail.title}`
      message = message + (detail.isOneDay ? `\n🗓️ ${detail.when}` : `\n🗓️\n${detail.when}`)
      message = message + (detail.price === '0' ? `\n💰 なし` : `\n💰 ${detail.price}円`)
      if (detail.where) message = message + `\n🚩 ${detail.where}`
      if (detail.description) message = message + `\n\n${detail.description}`
    }

    if (message === '') return null

    return {
      type: 'text',
      text: message
    }
  }

  addUerList (userData: UserData) {
    const findUserIndex = (userData: UserData, sgs: SimpleGoogleSpreadsheet) => {
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
  }

  __extractNumbers (input): Array<number> {
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

  addApply (userData: UserData, input: string): MessagesType {
    const addEventParticipationStatus = (userId: string, index: number) => {
      const list = this.sgsThisMonth.doReadSSVerString('A:I')
      const fixList = list.filter((row, index) => index > 0 && row[0] !== '')
      const data = [...Array(fixList.length)].map((_item, _i) => {
        return _i === (index - 1) ? userId : ''
      })

      this.sgsEventParticipationStatus.addData(data)
    }

    if (!userData) {
      return {
        type: 'text',
        text: '申し込み失敗\n\nユーザーIDが見つかりませんでした。'
      }
    }

    const eventIndexList = this.__extractNumbers(input)
    if (eventIndexList.length === 0) {
      return {
        type: 'text',
        text: '申し込み失敗\n\nメッセージが不正でした。'
      }
    }

    this.addUerList(userData)

    eventIndexList.forEach((eventIndex: number) => {
      addEventParticipationStatus(userData.userId, eventIndex)
    })
  }
}
