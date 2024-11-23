import { BOOK_URL } from '@/const/Header'

import { SimpleGoogleSpreadsheet } from '@/app/common/SimpleGoogleSpreadsheet'

export class Log {
  appName: string
  sgs: SimpleGoogleSpreadsheet

  constructor (appName: string) {
    this.appName = appName
    this.sgs = new SimpleGoogleSpreadsheet(BOOK_URL, 'log')
  }

  push (data: Array<string | Record<string, string>>) {
    if (data.length === 0) return
    const logData = data.map((item) => JSON.stringify(item))
    this.sgs.addData([this.appName, String(new Date()), ...logData])
  }
}
