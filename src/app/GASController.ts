import { format } from 'date-fns'
import formatNumber from 'format-number'

import { BOOK_URL, COL_A } from '@/const/Header'
import { MONTH_COL } from '@/const/monthCol'

import { Log } from '@/app/common/Log'
import { SimpleGoogleSpreadsheet } from '@/app/common/SimpleGoogleSpreadsheet'

import type { CalDataType } from '@/types/cal'
export class GASController {
  log: Log
  paySgs: SimpleGoogleSpreadsheet
  dataSgs: SimpleGoogleSpreadsheet
  statusSgs: SimpleGoogleSpreadsheet

  constructor () {
    this.log = new Log('GASController')
    this.paySgs = new SimpleGoogleSpreadsheet(BOOK_URL, '発生支払い')
    this.dataSgs = new SimpleGoogleSpreadsheet(BOOK_URL, '残高計算')
    this.statusSgs = new SimpleGoogleSpreadsheet(BOOK_URL, 'status')
  }

  addPayData (price: number, content?: string, credit?: string): void {
    const today = new Date()
    const formatToday = format(new Date(), 'yyyy/M/d HH:mm:ss')
    const isCredit = credit === 'カード'
    const thisMonth = isCredit ? String(today.getMonth() + 2) : String(today.getMonth() + 1)
    this.paySgs.addData([
      formatToday,
      content ?? '',
      String(price),
      '',
      thisMonth
    ])
  }

  getThisMonthData (month?: number): CalDataType {
    const today = new Date()
    const thisMonth = month || today.getMonth() + 1

    const sheetData = this.dataSgs.doReadSSVerString(MONTH_COL[thisMonth])
    this.log.push([MONTH_COL[thisMonth], sheetData])
    const myMoney = formatNumber({
      prefix: '¥',
      integerSeparator: ',',
      decimal: '.',
      decimalsSeparator: '',
      padRight: 0
    })

    const data: CalDataType = {
      month: `${thisMonth}月`,
      // 生活費
      lifePay: myMoney(sheetData[1][0]),
      // 支出
      pay: myMoney(sheetData[2][0]),
      // 収入
      income: myMoney(sheetData[3][0]),
      // 残高
      balance: myMoney(sheetData[7][0]),
      // 総資産
      assets: myMoney(sheetData[8][0]),
      // 月末引き落とし
      debit: {
        // 町田UFJ
        machida: myMoney(sheetData[10][0]),
        // 横浜UFJ
        yokohama: myMoney(sheetData[11][0]),
        // ゆうちょ
        yucho: myMoney(sheetData[12][0]),
        // SBI
        sbi: myMoney(sheetData[13][0])
      },
      // 詳細
      detail: {
        card: {
          // 楽天
          raluten: myMoney(sheetData[14][0]),
          // ライフ
          life: myMoney(sheetData[15][0]),
          // アプラス
          aplus: myMoney(sheetData[16][0]),
          // au
          au: myMoney(sheetData[17][0])
        },
        // MTG
        mtg: myMoney(sheetData[18][0]),
        // ローン
        loan: myMoney(sheetData[19][0]),
        // 家賃
        home: myMoney(sheetData[20][0]),
        // 税金
        tax: myMoney(sheetData[21][0]),
        // 発生
        other: myMoney(sheetData[28][0])
      }
    }
    this.log.push([data])
    return data
  }

  getStatus (): string {
    return this.statusSgs.doReadSS({
      row: 1,
      col: COL_A
    })
  }

  setStatus (status: string) {
    this.statusSgs.doWriteSS(status, 1, COL_A)
  }

  getSettingMonth (): number | undefined {
    const value = this.statusSgs.doReadSS({
      row: 2,
      col: COL_A
    })
    const match = value.match(/^(\d{1,2})月$/)
    if (match || match !== null) {
      return Number(match[1])
    }

    return undefined
  }

  setSettingMonth (status: string) {
    this.statusSgs.doWriteSS(status, 2, COL_A)
  }
}
