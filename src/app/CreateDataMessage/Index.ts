import { Log } from '@/app/common/Log'
import { GASController } from '@/app/GASController'

import { CreateText } from './CreateText'

import type { MessagesType } from '@/types/lineApp'

export class CreateDataMessage {
  log: Log
  gas: GASController

  constructor () {
    this.log = new Log('CreateDataMessage')
    this.gas = new GASController()
  }

  public pushMtgInfo (targetDay?: string): Array<MessagesType> {
    const CT = new CreateText(targetDay)
    const message: Array<MessagesType> = []

    const data = {
      todayDead: this.gas.getTodayDeadLineData(targetDay),
      closeDead: this.gas.getCloseDeadLineData(3, targetDay),
      possible: this.gas.getPossibleMTGData(targetDay),
      undecided: this.gas.getUndecidedMTGData()
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

    const firstMessage: MessagesType = {
      type: 'text',
      text: CT.firstText
    }
    message.push(firstMessage)

    if (data.closeDead.length > 0) {
      CT.addSeparate()
      CT.text = CT.text + '⭐️そろそろ〆切！'
      CT.addMessage(data.closeDead)
    }

    if (data.possible.length > 0) {
      CT.addSeparate()
      CT.text = CT.text + '🔴まだ申し込み受付中'
      CT.addMessage(data.possible)
    }

    if (data.undecided.length > 0) {
      CT.addSeparate()
      CT.text = CT.text + '🔷〆切未定'
      CT.addMessage(data.undecided)
    }

    message.push({
      type: 'text',
      text: CT.text
    })

    if (data.todayDead.length > 0) {
      CT.textTodayDead = CT.textTodayDead + '⚠️今日〆切！'
      CT.addTodayDeadMessage(data.todayDead)
      message.push({
        type: 'text',
        text: CT.textTodayDead
      })
    }

    return message
  }
}
