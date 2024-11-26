import { formatStringDay } from '@/utils/formatDay'

import { Log } from '@/app/common/Log'
import { GASController } from '@/app/GASController'

import * as Header from '@/const/Header'

import type { MessagesType } from '@/types/lineApp'
import { CellType } from '@/app/common/SimpleGoogleSpreadsheet'

export class CreateDataMessage {
  log: Log
  gas: GASController

  constructor () {
    this.log = new Log('CreateDataMessage')
    this.gas = new GASController()
  }

  public pushMtgInfo (targetDay?: string): Array<MessagesType> {
    const today = formatStringDay({ targetDay })

    const data = {
      todayDead: this.gas.getTodayDeadLineData(targetDay),
      closeDead: this.gas.getCloseDeadLineData(3, targetDay),
      possible: this.gas.getPossibleMTGData(targetDay),
      undecided: this.gas.getUndecidedMTGData()
    }

    let text = ''
    const addMessage = (array: Array<CellType>) =>
      array.forEach((element, ) => {
        const title = element[Header.ARRAY_COL_A]

        const date = formatStringDay({
          targetDay: element[Header.ARRAY_COL_C] as string,
          formatStr: 'yyyy/MM/dd'
        })

        const timeData = element[Header.ARRAY_COL_E] as string
        const time = timeData === '' ? undefined : formatStringDay({
          targetDay: timeData,
          formatStr: 'HH:mm'
        })
        const day = time ? `${date} ${time}` : date

        const mtgInfo = `【${day}】${title}`
        text = text + `\n${mtgInfo}`
      }
    )

    if (data.todayDead.length > 0) {
      text = text + '⚠️今日〆切！'
      addMessage(data.todayDead)
    }

    if (data.closeDead.length > 0) {
      if (text !== '') text = text + '\n\n'
      text = text + '⭐️そろそろ〆切！'
      addMessage(data.closeDead)
    }

    if (data.possible.length > 0) {
      if (text !== '') text = text + '\n\n'
      text = text + '🔴まだ申し込み受付中'
      addMessage(data.possible)
    }

    if (data.undecided.length > 0) {
      if (text !== '') text = text + '\n\n'
      text = text + '🔷未定'
      addMessage(data.undecided)
    }

    const firstMessage: MessagesType = {
      type: 'text',
      text: `${today}時点\n近日中のMTG情報です！\n\n【開催日】内容`
    }

    const message: MessagesType = {
      type: 'text',
      text
    }

    if (
      data.todayDead.length === 0 &&
      data.closeDead.length === 0 &&
      data.possible.length === 0 &&
      data.undecided.length === 0
    ) {
      return [
        {
          type: 'text',
          text: '申し込み可能なMTGはありません'
        }
      ]
    }

    return [
      firstMessage,
      message
    ]
  }
}
