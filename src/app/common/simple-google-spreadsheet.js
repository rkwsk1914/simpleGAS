/**
 * Google スプレッドシートAPI
 */
export class SimpleGoogleSpreadsheet {
  constructor (bookUrl, sheetName) {
    this.book = SpreadsheetApp.openByUrl(bookUrl)
    this.sheetName = sheetName
    this.sheet = this.book.getSheetByName(sheetName)
  }

  /**
   * 最終行の取得
   * @param {*} firstRow 開始行
   * @param {*} col 対象列
   * @returns row
   */
  doGetLastRow (firstRow, col) {
    // console.info(`[SimpleGoogleSpreadsheet] doGetLastRow [param] sheetName: ${this.sheetName}, firstRow: ${firstRow}, col: ${col}`)
    if (!firstRow && !col) {
      console.error(`[SimpleGoogleSpreadsheet] doGetLastRow "Not Found Cell." [param] sheetName: ${this.sheetName} firstRow:${firstRow}, col:${col}`)
      return
    }

    const sheet = this.sheet
    const row = sheet.getRange(firstRow, col).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow()
    return row
  }

  /**
   * 最終列の取得
   * @param {*} row 対象行
   * @param {*} firstCol 開始列
   * @returns col
   */
  doGetLastCol (row, firstCol) {
    // console.info(`[SimpleGoogleSpreadsheet] doGetLastCol [param] sheetName: ${this.sheetName}, row: ${row}, firstCol: ${firstCol}`)
    if (!row || !firstCol) {
      console.error(`[SimpleGoogleSpreadsheet] doGetLastCol "Not Found Cell." [param] sheetName: ${this.sheetName} row:${row}, firstCol:${firstCol}`)
      return
    }
    const sheet = this.sheet
    const col = sheet.getRange(row, firstCol).getNextDataCell(SpreadsheetApp.Direction.NEXT).getColumn()
    return col
  }

  /**
   * セルに書き込み
   * @param {*} value 値
   * @param {*} row 行
   * @param {*} col 列
   * @returns
   */
  doWriteSS (value, row, col) {
    // console.info(`[SimpleGoogleSpreadsheet] doWriteSS [param] sheetName: ${this.sheetName}, value: ${value}, row: ${row}, col: ${col}`)
    if (!row || !col) {
      console.error(`[SimpleGoogleSpreadsheet] doWriteSS "Not Found Cell." [param] sheetName: ${this.sheetName} row:${row}, col:${col}, value:${value}`)
      return
    }

    if (!value) {
      value = ''
    }

    const sheet = this.sheet
    // console.info(`[SimpleGoogleSpreadsheet] doWriteSS [param] row: ${row}, col: ${col}, value: ${value}`)
    sheet.getRange(row, col).setValue(value)
  }

  /**
   * 読み込み
   * セル文字列で指定
   * @param {*} cellString セル指定の文字列
   * @returns
   */
  doReadSSVerString (cellString) {
    // console.info(`[SimpleGoogleSpreadsheet] doReadSSVerString [param] sheetName: ${this.sheetName}, cellString: ${cellString}`)
    let reslut = null

    if (!cellString) {
      return reslut
    }
    const sheet = this.sheet
    reslut = sheet.getRange(cellString).getValues()
    return reslut
  }

  /**
   * 読み込み
   * @param {*} row 開始行
   * @param {*} col 開始列
   * @param {*} endRow 終了行（任意）
   * @param {*} endCol 終了列（任意）
   * @returns
   */
  doReadSS (row, col, endRow, endCol) {
    // console.info(`[SimpleGoogleSpreadsheet] doReadSS [param] sheetName: ${this.sheetName}, row: ${row}, col: ${col}, endRow: ${endRow}, endCol: ${endCol}`)
    let reslut = null
    const addition = this.getAdditionRange(row, col, endRow, endCol)
    const sheet = this.sheet

    if (!row || !col) {
      console.error(`[SimpleGoogleSpreadsheet] doReadSS"Not Found Cell." [param] sheetName: ${this.sheetName} row:${row}, col:${col}, endRow:${endRow}, endCol:${endCol}`)
      return reslut
    }

    if (!endRow && !endCol) {
      reslut = sheet.getRange(row, col, addition.rows, addition.colums).getValues()
      return reslut[0][0]
    }

    // console.info(`[SimpleGoogleSpreadsheet]row${row}, col${col}, addition.rows${addition.rows}, addition.colums${addition.colums}`)
    reslut = sheet.getRange(row, col, addition.rows, addition.colums).getValues()
    return reslut
  }

  /**
   * 範囲を取得
   * @param {*} row 開始行
   * @param {*} col 開始列
   * @param {*} endRow 終了行（任意）
   * @param {*} endCol 終了列（任意）
   */
  getAdditionRange (row, col, endRow, endCol) {
    // console.info(`[SimpleGoogleSpreadsheet] getAdditionRange [param] sheetName: ${this.sheetName}, row: ${row}, col: ${col}, endRow: ${endRow}, endCol: ${endCol}`)
    const result = {
      rows: 1,
      colums: 1
    }

    if (endRow) {
      result.rows = (endRow - row) + 1
    }

    if (endCol) {
      result.colums = (endCol - col) + 1
    }

    return result
  }

  /**
   * シート複製
   * @param {*} newSheetName 新規作成のシート名
   * @returns
   */
  copySheet (newSheetName) {
    if (!newSheetName) {
      console.error(`[SimpleGoogleSpreadsheet] copySheet "Not Found new sheet name. " [param] sheetName: ${this.sheetName}newSheetName:${newSheetName}`)
      return
    }
    const book = this.book
    const sheet = this.sheet
    const newSheet = sheet.copyTo(book)
    newSheet.setName(newSheetName)
    // console.info(`[SimpleGoogleSpreadsheet] copySheet "create New Sheet: ${newSheetName}"`)
  }

  /**
   * プルダウンメニューを設置
   * @param {*} row 開始行
   * @param {*} col 開始列
   * @param {*} valueArray プルダウンメニュー
   * @param {*} initValue 初期値（任意）
   */
  setPullDown (row, col, valueArray, initValue) {
    // console.info(`[SimpleGoogleSpreadsheet] setPullDown [param] sheetName: ${this.sheetName}, row: ${row}, col: ${col}, initValue: ${initValue}, valueArray`, valueArray)
    const sheet = this.sheet
    const range = sheet.getRange(row, col)

    /* 入力規則を作成 */
    const rulePhase = SpreadsheetApp.newDataValidation().requireValueInList(valueArray).build()

    /* 入了規則設定 */
    range.setDataValidation(rulePhase)

    /* 初期値を設定 */
    if (initValue) {
      const found = valueArray.find(element => element === initValue)
      if (found) {
        range.setValue(initValue)
      }
    }
  }

  /**
   * 行削除
   * @param {*} row 開始行
   * @param {*} col 開始列
   * @param {*} endRow 終了行（任意）
   * @param {*} endCol 終了列（任意）
   */
  delRow (row, col, endRow, endCol) {
    // console.info(`[SimpleGoogleSpreadsheet] delRow [param] sheetName: ${this.sheetName}, row: ${row}, col: ${col}, endRow: ${endRow}, endCol: ${endCol}`)
    const addition = this.getAdditionRange(row, col, endRow, endCol)
    const sheet = this.sheet
    const range = sheet.getRange(row, col, addition.rows, addition.colums)
    range.deleteCells(SpreadsheetApp.Dimension.ROWS)
  }

  /**
   * セルの背景色の変更
   * @param {*} color カラー
   * @param {*} row 開始行
   * @param {*} col 開始列
   * @param {*} endRow 終了行（任意）
   * @param {*} endCol 終了列（任意）
   */
  changeCellBackGroundColor (color, row, col, endRow, endCol) {
    // console.info(`[SimpleGoogleSpreadsheet] changeCellBackGroundColor [param] sheetName: ${this.sheetName}, color: ${color}, row: ${row}, col: ${col}, endRow: ${endRow}, endCol: ${endCol}`)
    const addition = this.getAdditionRange(row, col, endRow, endCol)
    const sheet = this.sheet
    const range = sheet.getRange(row, col, addition.rows, addition.colums)
    range.setBackground(color)
  }

  /**
   * セルの背景色の変更
   * セル文字列で指定
   * @param {*} color カラー
   * @param {*} cellString セル指定の文字列
   * @returns
   */
  changeCellBackGroundColorVerString (color, cellString) {
    // console.info(`[SimpleGoogleSpreadsheet] changeCellBackGroundColorVerString [param] sheetName: ${this.sheetName}, color: ${color}, cellString: ${cellString}`)
    const reslut = null

    if (!cellString) {
      return reslut
    }
    const sheet = this.sheet
    const range = sheet.getRange(cellString)
    range.setBackground(color)
  }
}
