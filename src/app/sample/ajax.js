import $ from 'jquery'

export class Ajax {
  doing () {
    const username = ''
    const password = ''
    const url = ''

    const options = {
      headers: {
        Authorization: 'Basic ' + Utilities.base64Encode(username + ':' + password)
      }
    }
    const response = UrlFetchApp.fetch(url, options)
    const context = response.getContentText()
    const data = context.split(/\n/)
    return data
  }

  testDoing () {
    const url = ''

    return $.ajax({
      type: 'GET', /* リクエストタイプ GETかPOSTか */
      url: url, /* Ajaxリクエストを送信するURL */
      dataType: 'text' /* csv、txtファイルなら「text」, jsonファイルなら「json」などなど */
    })
      .done((data, textStatus, jqXHR) => {
        /* 読み込みに成功した時に行う処理 */
      // const jsData = this.readIndexjs()
        const testdata = data.split(/\n/)
        console.log(testdata)
      })
      .fail((jqXHR, textStatus, errortdrown) => {
        console.log(jqXHR)
        /* 読み込みに失敗した時に行う処理 */
      })
      .always(() => {
        /* どんな場合でも行う処理 */
      })
  }
}
