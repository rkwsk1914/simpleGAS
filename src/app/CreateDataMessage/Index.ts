import { Log } from '@/app/common/Log'
import { GASController } from '@/app/GASController'

import { CreateText } from './CreateText'

import type { MessagesType } from '@/types/lineApp'
import { SelectMenu } from '@/types/selectMenu'

export class CreateDataMessage {
  log: Log
  gas: GASController

  constructor () {
    this.log = new Log('CreateDataMessage')
    this.gas = new GASController()
  }

  private __createTodayDeadlineInfoMessage (targetDay?: string): Array<MessagesType> | null {
    const CT = new CreateText(targetDay)
    const data = this.gas.getTodayDeadLineData(targetDay)
    if (data.length > 0) {
      CT.textTodayDead = CT.textTodayDead + `⚠️${SelectMenu.getTodayDeadline}！\n\n`
      CT.addTodayDeadMessage(data)
      return [{
        type: 'text',
        text: CT.textTodayDead
      }]
    }

    return null
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
      CT.addSeparate({})
      CT.text = CT.text + '⭐️そろそろ〆切！'
      CT.addMTGMessage(data.closeDead)
    }

    if (data.possible.length > 0) {
      CT.addSeparate({})
      CT.text = CT.text + '🔴まだ申し込み受付中'
      CT.addMTGMessage(data.possible)
    }

    if (data.undecided.length > 0) {
      CT.addSeparate({})
      CT.text = CT.text + '🔷〆切未定'
      CT.addMTGMessage(data.undecided)
    }

    message.push({
      type: 'text',
      text: CT.text
    })

    const todayDeadMessage = this.__createTodayDeadlineInfoMessage(targetDay)
    if (todayDeadMessage) return [
      ...message,
      ...todayDeadMessage
    ]

    return message
  }

  public pushTodayDeadlineInfo (targetDay?: string): Array<MessagesType> | null {
    const todayDeadMessage = this.__createTodayDeadlineInfoMessage(targetDay)
    return todayDeadMessage
  }

  public pushSchedule (targetDay?: string): Array<MessagesType> {
    const message: Array<MessagesType> = []
    const data = this.gas.getAllMTGData()
    const CT = new CreateText(targetDay)
    CT.addScheduleMessage(data)
    message.push({
      type: 'text',
      text: CT.text
    })

    return message
  }
}
