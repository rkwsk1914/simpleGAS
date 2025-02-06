import { BOOK_URL } from '@/const/Header'
import { formatStringDay } from '@/utils/formatDay'

import { SimpleGoogleSpreadsheet } from '@/app/common/SimpleGoogleSpreadsheet'

export class Log {
  appName: string
  sgs: SimpleGoogleSpreadsheet

  constructor (appName: string) {
    this.appName = appName
    this.sgs = new SimpleGoogleSpreadsheet(BOOK_URL, 'log')
  }

  push (data: Array<any>) {
    if (process.env.NODE_ENV === 'production' || data.length === 0) return
    const logData = data.map((item) => JSON.stringify(item))
    const time = formatStringDay({
      targetDay: String(new Date()),
      formatStr: 'yyyy/M/d HH:mm:ss.SSS'
    }) ?? String(new Date())
    this.sgs.addData([this.appName, time, ...logData])
  }
}
