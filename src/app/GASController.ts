// import { SimpleGoogleSpreadsheet } from './common/SimpleGoogleSpreadsheet'
// import type { MessagesType, UserDataType, UserStateType } from './../types/lineApp'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale/ja'
import formatNumber from 'format-number'

import * as HEAD from './Header'
import { Log } from './Log'
// import { ERROR_MESSAGE, WARN_MESSAGE, INFO_MESSAGE } from './Message'

export class GASController {
  console: Log
  border: string

  constructor () {
    this.console = new Log()

    this.border = '------------------------------'
  }

  private __getData (rowData: Array<any>, index: number): Record<string, string | boolean> | undefined {
    const notFix = rowData[HEAD.ARRAY_COL_J] === true

    const startDay = format(new Date(rowData[HEAD.ARRAY_COL_B]), 'M/d(E)', { locale: ja })
    const startTime = format(new Date(rowData[HEAD.ARRAY_COL_D]), 'H:mm')

    const endDay = format(new Date(rowData[HEAD.ARRAY_COL_C]), 'M/d(E)', { locale: ja })
    const endTime = format(new Date(rowData[HEAD.ARRAY_COL_E]), 'H:mm')

    const isOneDay = startDay === endDay
    const whenDay = isOneDay ? `${startDay} ` : ''
    const whenTime = isOneDay
      ? `${startTime} ~ ${endTime}`
      : `${startDay} ${startTime} ~ ${endDay} ${endTime}`

    const when = whenDay + whenTime
    const what = rowData[HEAD.ARRAY_COL_A]
    const where = rowData[HEAD.ARRAY_COL_G]

    const priceValue = rowData[HEAD.ARRAY_COL_I]
    const price = formatNumber({
      round: 0
    })(rowData[HEAD.ARRAY_COL_I])
    const title = notFix
      ? `(${index}) ${what} (未確定)`
      : `(${index}) ${what}`

    const subText = rowData[HEAD.ARRAY_COL_K]
    const description = rowData[HEAD.ARRAY_COL_H]

    return {
      title,
      when,
      what,
      where,
      price,
      priceValue,
      subText,
      description,
      isOneDay
    }
  }

  private __extractNumbers (input): Array<number> {
    const fixHalf = input.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
    })
    // 正規表現を使用して数字を抽出
    const numbers = fixHalf.match(/\d+/g)
    // 数字が見つかった場合、それらをNumber型に変換して配列に格納
    if (numbers) {
      return numbers.map(num => Number(num))
    } else {
      return []
    }
  }

  private _setScheduleText (detail: Record<string, string | boolean>) {
    let message = ''
    message = message + `${detail.title}`
    message = message + (detail.isOneDay ? `\n🗓️ ${detail.when}` : `\n🗓️\n${detail.when}`)
    message = message + (detail.price === '0' ? `\n💰 なし` : `\n💰 ${detail.price}円`)
    if (detail.where) message = message + `\n🚩 ${detail.where}`
    if (detail.subText) message = message + `\n\n${detail.subText}`
    message = message + `\n\n${this.border}\n\n`
    return message
  }
}
