import { Log } from '@/app/common/Log'
export class FetchFunction {
  log: Log

  constructor () {
    this.log = new Log('FetchFunction')
  }

  doGet ({
    url,
    options
  }: {
    url: string,
    options?: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions
  }) {
    if (!url || url === '') return

    this.log.push([url])
    const response = options ? UrlFetchApp.fetch(url, options) : UrlFetchApp.fetch(url)

    if (response.getContentText()) {
      const jsonData = JSON.parse(response.getContentText())
      this.log.push([JSON.stringify(jsonData)])
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
    url: string,
    options?: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions
  }) {
    if (!url || url === '') return

    this.log.push([url, JSON.stringify(options)])
    const response = options ? UrlFetchApp.fetch(url, options) : UrlFetchApp.fetch(url)

    if (response.getContentText()) {
      const jsonData = JSON.parse(response.getContentText())
      this.log.push(['', JSON.stringify(jsonData)])
      return jsonData
    }

    if (!response.getContentText()) {
      return null
    }
  }
}
