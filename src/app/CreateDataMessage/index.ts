import { Log } from '@/app/common/Log'
import { GASController } from '@/app/GASController'
import { resMTGData } from '@/app/Gemini'

import { CreateText } from './CreateText'
import { CreateTextAddMTG } from './CreateTextAddMTG'

import type { MessagesType } from '@/types/lineApp'
import { SelectMenu } from '@/types/selectMenu'

import { formatStringDay } from '@/utils/formatDay'

export class CreateDataMessage {
  log: Log
  gas: GASController

  constructor () {
    this.log = new Log('CreateDataMessage')
    this.gas = new GASController()
  }

  private async __createTodayDeadlineInfoMessage (targetDay?: string): Promise<Array<MessagesType>> {
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

    return []
  }

  private async __createTodayMTGlineInfoMessage (targetDay?: string): Promise<Array<MessagesType>> {
    const CT = new CreateText(targetDay)
    const data = this.gas.getTodayMTGLineData(targetDay)
    if (data.length > 0) {
      CT.textTodayMTG = CT.textTodayMTG + '🚩本日開催！\n\n'
      CT.addTodayMTGMessage(data)
      return [{
        type: 'text',
        text: CT.textTodayMTG
      }]
    }

    return []
  }

  // public pushMtgInfo (targetDay?: string): Array<MessagesType> {
  //   const CT = new CreateText(targetDay)
  //   const message: Array<MessagesType> = []

  //   const data = {
  //     todayDead: this.gas.getTodayDeadLineData(targetDay),
  //     closeDead: this.gas.getCloseDeadLineData(3, targetDay),
  //     possible: this.gas.getPossibleMTGData(targetDay),
  //     undecided: this.gas.getUndecidedMTGData()
  //   }

  //   if (
  //     data.todayDead.length === 0 &&
  //     data.closeDead.length === 0 &&
  //     data.possible.length === 0 &&
  //     data.undecided.length === 0
  //   ) {
  //     return [
  //       {
  //         type: 'text',
  //         text: '申し込み可能なMTGはありません'
  //       }
  //     ]
  //   }

  //   const firstMessage: MessagesType = {
  //     type: 'text',
  //     text: CT.firstText
  //   }
  //   message.push(firstMessage)

  //   if (data.closeDead.length > 0) {
  //     CT.addSeparate({})
  //     CT.text = CT.text + '⭐️そろそろ〆切！'
  //     CT.addMTGMessage(data.closeDead)
  //   }

  //   if (data.possible.length > 0) {
  //     CT.addSeparate({})
  //     CT.text = CT.text + '🔴まだ申し込み受付中'
  //     CT.addMTGMessage(data.possible)
  //   }

  //   if (data.undecided.length > 0) {
  //     CT.addSeparate({})
  //     CT.text = CT.text + '🔷〆切未定'
  //     CT.addMTGMessage(data.undecided)
  //   }

  //   message.push({
  //     type: 'text',
  //     text: CT.text
  //   })

  //   const todayDeadMessage = this.__createTodayDeadlineInfoMessage(targetDay)
  //   const todayMTGMessage = this.__createTodayMTGlineInfoMessage(targetDay)
  //   return [
  //     ...message,
  //     ...todayMTGMessage,
  //     ...todayDeadMessage
  //   ]
  // }

  public async pushTodayDeadlineInfo (targetDay?: string): Promise<Array<MessagesType> | null> {
    const todayDeadMessage = await this.__createTodayDeadlineInfoMessage(targetDay)
    const todayMTGMessage = await this.__createTodayMTGlineInfoMessage(targetDay)

    if (
      todayDeadMessage.length === 0 &&
      todayMTGMessage.length === 0
    ) return null

    return [
      ...todayMTGMessage,
      ...todayDeadMessage
    ]
  }

  public pushSchedule (targetDay?: string): Array<MessagesType> {
    const message: Array<MessagesType> = []
    const data = this.gas.getAllMTGData()
    const CT = new CreateText(targetDay)
    CT.addScheduleMessage(data)

    const today = formatStringDay({
      targetDay: new Date(),
    })

    if (!today) return []

    message.push({
      type: 'text',
      text: '\n⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️\n\n' + today + ' 最新情報\n\n⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️\n'
    })
    message.push({
      type: 'text',
      text: CT.text
    })

    return message
  }

  public pushDeliveryMessage (): {
    message: Array<MessagesType>,
    target: string
  } {
    const data = this.gas.getDeliveryMessage()

    if (!data) return {
      message: [],
      target: ''
    }

    return {
      message: [{
        type: 'text',
        text: data?.message
      }],
      target: data?.target
    }
  }

  public async pushCreateMTGData (data: resMTGData[]): Promise<Array<MessagesType> | undefined> {
    const message: Array<MessagesType> = []
    const CT = new CreateTextAddMTG()
    await CT.pushDuplicateMTGData(data)
    await CT.pushRegisteredMTGData(data)

    await this.log.push(['pushCreateMTGData',CT.textDuplicateData, CT.textRegisteredData])

    if (
      CT.textDuplicateData === '' &&
      CT.textRegisteredData === ''
    ) {
      return undefined
    }

    if (CT.textDuplicateData !== '') {
      message.push({
        type: 'text',
        text: CT.textDuplicateDataFirst
          + '\n' + CT.textDuplicateDataCount + '件\n'
          + '\n' + CT.separateLine + '\n'
          + CT.textDuplicateData
      })
    }


    if (CT.textRegisteredData !== '') {
      message.push({
        type: 'text',
        text: CT.textRegisteredDataFirst + CT.textRegisteredData
      })
    }


    return message
  }
}
