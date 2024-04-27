import { format } from 'date-fns'
import formatNumber from 'format-number'

import { BOOK_URL } from '@/const/Header'
import { MONTH_COL } from '@/const/monthCol'

import { Log } from '@/app/common/Log'
import { SimpleGoogleSpreadsheet } from '@/app/common/SimpleGoogleSpreadsheet'

import type { CalDataType } from '@/types/cal'
export class GASController {
  log: Log
  paySgs: SimpleGoogleSpreadsheet
  dataSgs: SimpleGoogleSpreadsheet

  constructor () {
    this.log = new Log('GASController')
    this.paySgs = new SimpleGoogleSpreadsheet(BOOK_URL, '発生支払い')
    this.dataSgs = new SimpleGoogleSpreadsheet(BOOK_URL, '残高計算')
  }

  addPayData (price: number): void {
    const today = new Date()
    const formatToday = format(new Date(), 'yyyy/M/d')
    const thisMonth = String(today.getMonth() + 1)
    this.paySgs.addData([formatToday, '', String(price), '', thisMonth])
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
      // 生活費
      lifePay: myMoney(sheetData[1][0]),
      // 支出
      pay: myMoney(sheetData[2][0]),
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
}
