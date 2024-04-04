import { BOOK_URL } from './../Header'
import { SimpleGoogleSpreadsheet } from './../common/SimpleGoogleSpreadsheet'

export class FetchFunction {
  baseUrl : string
  sgsLog: SimpleGoogleSpreadsheet

  constructor (url: string) {
    this.baseUrl = url
    this.sgsLog = new SimpleGoogleSpreadsheet(BOOK_URL, 'fetch log')
  }

  doGet ({
    url,
    options
  }: {
    url?: string,
    options?: Record<string, any>
  }) {
    const fetchUrl = url ?? this.baseUrl
    if (!fetchUrl || fetchUrl === '') return

    this.sgsLog.addData([String(new Date()), fetchUrl])
    const response = UrlFetchApp.fetch(fetchUrl, options)

    if (response.getContentText()) {
      const jsonData = JSON.parse(response.getContentText())
      // console.info('[Fetch] doGet [data] json data:', jsonData)
      this.sgsLog.addData(['', JSON.stringify(jsonData)])
      return jsonData
    }

    if (!response.getContentText()) {
      return null
    }
  }

  doPost ({
    url,
    options
  }: {
    url?: string,
    options?: Record<string, any>
  }) {
    const fetchUrl = url ?? this.baseUrl
    if (!fetchUrl || fetchUrl === '') return

    this.sgsLog.addData([String(new Date()), fetchUrl, JSON.stringify(options)])
    const response = UrlFetchApp.fetch(fetchUrl, options)

    if (response.getContentText()) {
      const jsonData = JSON.parse(response.getContentText())
      // console.info('[Fetch] doGet [data] json data:', jsonData)
      this.sgsLog.addData(['', JSON.stringify(jsonData)])
      return jsonData
    }

    if (!response.getContentText()) {
      return null
    }
  }
}
