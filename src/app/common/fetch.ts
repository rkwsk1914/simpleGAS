import { Log } from '@/app/common/Log'
export class FetchFunction {
  log: Log

  constructor () {
    this.log = new Log('FetchFunction')
  }

  async doGet ({
    url,
    options
  }: {
    url: string,
    options?: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions
  }) {
    if (!url || url === '') return

    // await this.log.push([url])
    const response = options ? UrlFetchApp.fetch(url, options) : UrlFetchApp.fetch(url)

    if (response.getContentText()) {
      const jsonData = JSON.parse(response.getContentText())
      // await this.log.push([JSON.stringify(jsonData)])
      return jsonData
    }

    if (!response.getContentText()) {
      return null
    }
  }

  async doPost ({
    url,
    options
  }: {
    url: string,
    options?: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions
  }): Promise<any> {
    if (!url || url === '') return

    await this.log.push([url, JSON.stringify(options)])
    try {
      const response = options ? UrlFetchApp.fetch(url, options) : UrlFetchApp.fetch(url)
      if (response.getContentText()) {
        const jsonData = JSON.parse(response.getContentText())
        await this.log.push(['','jsonData', JSON.stringify(jsonData)])
        return jsonData
      }

      if (!response.getContentText()) {
        return null
      }
    } catch (e) {
      if (e instanceof Error) {
        // エラーが Error オブジェクトの場合
        const errorInfo = {
          name: e.name,
          message: e.message,
          stack: e.stack || 'No stack trace'
        }
        await this.log.push(['response', errorInfo])
      } else {
        // その他のエラー（非 Error オブジェクト）
        await this.log.push(['response', { message: 'Unknown error', raw: e }])
      }
    }
  }
}
