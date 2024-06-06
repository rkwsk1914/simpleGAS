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

    const sheetData = this.dataSgs.doReadSSVerString(MONTH_COL[thisMonth], true)
    this.log.push([MONTH_COL[thisMonth], sheetData])
    const myMoney = formatNumber({
      prefix: '¥',
      integerSeparator: ',',
      decimal: '.',
      decimalsSeparator: '',
      padRight: 0,
      truncate: 0
    })

    const data: CalDataType = {
      month: `${thisMonth}月`,
      income: myMoney(sheetData[2][0]),
      pay: myMoney(sheetData[3][0]),
      savings: myMoney(sheetData[4][0]),
      profit: myMoney(sheetData[5][0]),
      balance: myMoney(sheetData[6][0]),
      savingDetail: {
        savings: myMoney(sheetData[14][0]),
        savingsVienna: myMoney(sheetData[15][0])
      },
      debit: {
        machida: myMoney(sheetData[9][1]),
        yokohama: myMoney(sheetData[10][1]),
        yucho: myMoney(sheetData[11][1]),
        sbi: myMoney(sheetData[12][1])
      },
      card: {
        raluten: myMoney(sheetData[21][0]),
        life: myMoney(sheetData[22][0]),
        aplus: myMoney(sheetData[23][0]),
        au: myMoney(sheetData[24][0])
      },
      detail: sheetData
        .filter((row, index) => index >= 25 && row[1] !== '')
        .map((row) => {
          return {
            name: row[1],
            value: myMoney(row[0])
          }
        })
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
