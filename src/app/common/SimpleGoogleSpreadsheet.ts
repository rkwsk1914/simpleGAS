import * as HEAD from '@/const/Header'

import Spreadsheet = GoogleAppsScript.Spreadsheet

/**
 * Google スプレッドシートAPI
 */
export class SimpleGoogleSpreadsheet {
  book: Spreadsheet.Spreadsheet
  sheetName: string
  sheet: any

  constructor (bookUrl: string, sheetName: string) {
    this.book = SpreadsheetApp.openByUrl(bookUrl)
    this.sheetName = sheetName
    this.sheet = this.book.getSheetByName(sheetName)
  }

  private _isBlankRow (rowData: Array<any>): boolean {
    let result = true
    rowData.forEach((col) => {
      if (col !== '') result = false
    })
    return result
  }

  private _blankRowDel (data: Array<Array<any>> | null | undefined): Array<Array<any>> {
    if (!data) return null
    return data.filter((row) => !this._isBlankRow(row))
  }

  private _blankColDel (rowData: Array<any>): Array<any> {
    if (!rowData) return null
    return rowData.filter((col) => col !== '')
  }

  /**
   * 最終行の取得
   * @param {*} firstRow 開始行
   * @param {*} col 対象列
   * @returns row
   */
  doGetLastRow (firstRow: number, col: number) {
    if (firstRow < 1 && col < 1) return undefined

    const colName = HEAD.COL_LIST[col - 1]
    const data = this.doReadSSVerString(`${colName}${firstRow}:${colName}1000`)
    if (data.length < 2) return firstRow + 1

    const sheet = this.sheet
    const row = sheet.getRange(firstRow, col).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow() + 1
    return row
  }

  /**
   * 最終列の取得
   * @param {*} row 対象行
   * @param {*} firstCol 開始列
   * @returns col
   */
  doGetLastCol (row: number, firstCol: number) {
    if (row < 1 && firstCol < 1) return undefined

    const firstColName = HEAD.COL_LIST[firstCol - 1]
    const lastColName = HEAD.COL_LIST[HEAD.COL_LIST.length - 1]
    const data = this.doReadSSVerString(`${firstColName}${row}:${lastColName}${row}`)
    if (this._blankColDel(data[0]).length < 2) return firstCol + 1

    const sheet = this.sheet
    const col = sheet.getRange(row, firstCol).getNextDataCell(SpreadsheetApp.Direction.NEXT).getColumn() + 1
    return col
  }

  /**
   * セルに書き込み
   * @param {*} value 値
   * @param {*} row 行
   * @param {*} col 列
   * @returns
   */
  doWriteSS (value: string, row: number, col: number) {
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
  doReadSSVerString (
    cellString: string,
    hasBlank: boolean = false
  ) {
    // console.info(`[SimpleGoogleSpreadsheet] doReadSSVerString [param] sheetName: ${this.sheetName}, cellString: ${cellString}`)
    let result = null

    if (!cellString) {
      return result
    }
    const sheet = this.sheet
    result = sheet.getRange(cellString).getValues()
    return hasBlank ? result : this._blankRowDel(result)
  }

  /**
   * 読み込み
   * @param {*} row 開始行
   * @param {*} col 開始列
   * @param {*} endRow 終了行（任意）
   * @param {*} endCol 終了列（任意）
   * @returns
   */
  doReadSS ({
    row, col, endRow, endCol, hasBlank = false
  }: {
    row: number, col: number, endRow?: number, endCol?: number, hasBlank?: boolean
  }) {
    // console.info(`[SimpleGoogleSpreadsheet] doReadSS [param] sheetName: ${this.sheetName}, row: ${row}, col: ${col}, endRow: ${endRow}, endCol: ${endCol}`)
    let result = null
    const addition = this.getAdditionRange({ row, col, endRow, endCol })
    const sheet = this.sheet

    if (!row || !col) {
      console.error(`[SimpleGoogleSpreadsheet] doReadSS"Not Found Cell." [param] sheetName: ${this.sheetName} row:${row}, col:${col}, endRow:${endRow}, endCol:${endCol}`)
      return result
    }

    if (!endRow && !endCol) {
      result = sheet.getRange(row, col, addition.rows, addition.colums).getValues()
      return result[0][0]
    }

    // console.info(`[SimpleGoogleSpreadsheet]row${row}, col${col}, addition.rows${addition.rows}, addition.colums${addition.colums}`)
    result = sheet.getRange(row, col, addition.rows, addition.colums).getValues()
    return hasBlank ? result : this._blankRowDel(result)
  }

  /**
   * 範囲を取得
   * @param {*} row 開始行
   * @param {*} col 開始列
   * @param {*} endRow 終了行（任意）
   * @param {*} endCol 終了列（任意）
   */
  getAdditionRange ({
    row, col, endRow, endCol
  }: {
    row: number, col: number, endRow?: number, endCol?: number
  }) {
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
  copySheet (newSheetName: string) {
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
  setPullDown ({
    row, col, valueArray, initValue
  }: {
    row: number, col: number, valueArray: Array<string>, initValue: string
  }) {
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
  delRow ({
    row, col, endRow, endCol
  }: {
    row: number, col: number, endRow?: number, endCol?: number
  }) {
    // console.info(`[SimpleGoogleSpreadsheet] delRow [param] sheetName: ${this.sheetName}, row: ${row}, col: ${col}, endRow: ${endRow}, endCol: ${endCol}`)
    const addition = this.getAdditionRange({ row, col, endRow, endCol })
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
  changeCellBackGroundColor ({
    color, row, col, endRow, endCol
  }: {
    color: string, row: number, col: number, endRow?: number, endCol?: number
  }) {
    // console.info(`[SimpleGoogleSpreadsheet] changeCellBackGroundColor [param] sheetName: ${this.sheetName}, color: ${color}, row: ${row}, col: ${col}, endRow: ${endRow}, endCol: ${endCol}`)
    const addition = this.getAdditionRange({ row, col, endRow, endCol })
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
  changeCellBackGroundColorVerString (color: string, cellString: string) {
    // console.info(`[SimpleGoogleSpreadsheet] changeCellBackGroundColorVerString [param] sheetName: ${this.sheetName}, color: ${color}, cellString: ${cellString}`)
    const reslut = null

    if (!cellString) {
      return reslut
    }
    const sheet = this.sheet
    const range = sheet.getRange(cellString)
    range.setBackground(color)
  }

  /**
   * データの追加
   * @param {*} data Array
   */
  addData (data: Array<string>) {
    const sheet = this.sheet
    sheet.appendRow(data)
  }

  removeDuplicates ({
    row, col, endRow, endCol
  }: {
    row: number, col: number, endRow?: number, endCol?: number
  }) {
    const addition = this.getAdditionRange({ row, col, endRow, endCol })
    const sheet = this.sheet

    if (!row || !col) {
      console.error(`[SimpleGoogleSpreadsheet] doReadSS"Not Found Cell." [param] sheetName: ${this.sheetName} row:${row}, col:${col}, endRow:${endRow}, endCol:${endCol}`)
      return
    }

    if (!endRow && !endCol) {
      const range = sheet.getRange(row, col, addition.rows, addition.colums)
      range.removeDuplicates()
      return
    }

    // console.info(`[SimpleGoogleSpreadsheet]row${row}, col${col}, addition.rows${addition.rows}, addition.colums${addition.colums}`)
    const range = sheet.getRange(row, col, addition.rows, addition.colums)
    range.removeDuplicates()
  }

  removeDuplicatesVerString (
    cellString: string
  ) {
    if (!cellString) {
      return
    }
    const sheet = this.sheet
    const range = sheet.getRange(cellString)
    range.removeDuplicates()
  }
}
