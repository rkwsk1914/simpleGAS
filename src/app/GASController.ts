import { format } from 'date-fns'

import { BOOK_URL } from '@/const/Header'
import { MONTH_COL } from '@/const/monthCol'

import { Log } from '@/app/common/Log'
import { SimpleGoogleSpreadsheet } from '@/app/common/SimpleGoogleSpreadsheet'

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
    format(new Date(), 'yyyy/M/d')
    this.paySgs.addData(['', '', String(price)])
  }

  getThisMonthData (): void {
    const today = new Date()
    const thisMonth = today.getMonth() + 1

    const data = this.dataSgs.doReadSSVerString(MONTH_COL[thisMonth])
    this.log.push([MONTH_COL[thisMonth], data])
  }
}
