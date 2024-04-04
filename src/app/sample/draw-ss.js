import * as Head from './../header'

export class DrawSS {
  constructor (gasApp) {
    this.gasApp = gasApp
    this.redColorRanges = []
    this.yellowColorRanges = []
    this.blueColorRanges = []

    this.lastRow = this.gasApp.doGetLastRow(1, Head.COL_A)
    this.lastCol = this.gasApp.doGetLastCol(1, Head.COL_Z)
    this.ssData = this.getAllData()
  }

  getAllData () {
    const data = this.gasApp.doReadSS(1, Head.COL_A, this.lastRow, this.lastCol)
    return data
  }

  changeColor () {
    this.yellowColorRanges.forEach(range => {
      this.gasApp.changeCellBackGroundColor('#f1d553', range.row, range.col)
    })

    this.redColorRanges.forEach(range => {
      this.gasApp.changeCellBackGroundColor('#e14e30', range.row, range.col)
    })

    this.blueColorRanges.forEach(range => {
      this.gasApp.changeCellBackGroundColor('#5a86ea', range.row, range.col)
    })
  }

  doing () {
    /* 画面描写するセルをあらかじめ取得 */
    this.yellowColorRanges.push({
      row: 1,
      col: Head.COL_B
    })

    this.yellowColorRanges.push({
      row: 2,
      col: Head.COL_B
    })

    this.yellowColorRanges.push({
      row: 3,
      col: Head.COL_B
    })

    /* 画面描写は最後に */
    this.changeColor()
  }
}
