// import { format } from 'date-fns'
// import formatNumber from 'format-number'

import { BOOK_URL, COL_A } from '@/const/Header'

import { Log } from '@/app/common/Log'
import { SimpleGoogleSpreadsheet } from '@/app/common/SimpleGoogleSpreadsheet'
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
  getStatus (): string {
    return this.statusSgs.doReadSS({
      row: 1,
      col: COL_A
    })
  }

  setStatus (status: string) {
    this.statusSgs.doWriteSS(status, 1, COL_A)
  }
}
