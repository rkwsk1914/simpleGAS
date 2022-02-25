class Fetch {
  constructor (url) {
    this.url
  }

  doGet() {
    const response = UrlFetchApp.fetch(this.url)

    if (response.getContentText()) {
      const jsonData = JSON.parse(response.getContentText())
      //console.log('[Fetch] doGet [data] json data:', jsonData)
      return jsonData
    }

    if (!response.getContentText()) {
      return null
    }
  }
}