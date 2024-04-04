import * as HEAD from './Header'
import { SimpleGoogleSpreadsheet } from './common/SimpleGoogleSpreadsheet'

export class Log {
  sgsCheck: SimpleGoogleSpreadsheet

  constructor () {
    this.sgsCheck = new SimpleGoogleSpreadsheet(HEAD.BOOK_URL, 'check')
    this.sgsCheck.delRow({
      row: 1,
      col: HEAD.COL_A,
      endRow: 1000,
      endCol: HEAD.COL_AZ
    })
  }

  log (data: Array<string>) {
    if (data.length === 0) return
    this.sgsCheck.addData(data)
  }
}
