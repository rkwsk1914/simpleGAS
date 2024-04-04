export class Fetch {
  constructor (url) {
    this.url = url
  }

  doGet () {
    const response = UrlFetchApp.fetch(this.url)

    if (response.getContentText()) {
      const jsonData = JSON.parse(response.getContentText())
      // console.info('[Fetch] doGet [data] json data:', jsonData)
      return jsonData
    }

    if (!response.getContentText()) {
      return null
    }
  }
}
