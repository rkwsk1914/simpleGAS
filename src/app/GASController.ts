import { toZonedTime } from 'date-fns-tz'
import { isWithinInterval, format, addDays } from 'date-fns'

import * as Header from '@/const/Header'

import { Log } from '@/app/common/Log'
import { SimpleGoogleSpreadsheet } from '@/app/common/SimpleGoogleSpreadsheet'
export class GASController {
  log: Log
  scheduleSgs: SimpleGoogleSpreadsheet
  statusSgs: SimpleGoogleSpreadsheet

  constructor () {
    this.log = new Log('GASController')
    this.scheduleSgs = new SimpleGoogleSpreadsheet(Header.BOOK_URL, 'スケジュール')
    this.statusSgs = new SimpleGoogleSpreadsheet(Header.BOOK_URL, 'status')
  }
  getStatus (): string {
    return this.statusSgs.doReadSS({
      row: 1,
      col: Header.COL_A
    })
  }

  setStatus (status: string) {
    this.statusSgs.doWriteSS(status, 1, Header.COL_A)
  }

  getCloseDeadLineData () {
    const data = this.scheduleSgs.doReadSS({
      row: 2,
      col: Header.COL_A,
      endRow: 700,
      endCol: Header.COL_K,
    })

    const closeDeadLineData = data.filter((item: Array<string>) => {
      const timeZone = 'Asia/Tokyo'
      const now = toZonedTime(new Date(), timeZone)
      const today = format(now, 'yyyy-MM-dd HH:mm:ss')
      const deadLineDay = addDays(today, 3)

      if (!item[Header.ARRAY_COL_B]) return

      const itemDay = format(item[Header.ARRAY_COL_B], 'yyyy-MM-dd HH:mm:ss')

      if (isWithinInterval(itemDay, {
        start: today,
        end: deadLineDay,
      })) return item
    })

    this.log.push(closeDeadLineData)
  }
}
