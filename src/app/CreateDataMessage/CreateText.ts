import { isBefore, startOfDay } from 'date-fns'

import { formatStringDay } from '@/utils/formatDay'

import { Log } from '@/app/common/Log'

import * as Col from '@/const/ScheduleSheetCol'

import { CellType } from '@/app/common/SimpleGoogleSpreadsheet'
import { MTGDataText } from './MTGDataText'
export class CreateText {
  targetDay?: string
  log: Log
  today: string | undefined
  todayYear: string | undefined
  text: string
  separateLine: string
  textTodayDead: string
  textTodayMTG: string
  firstText: string

  constructor (targetDay?: string) {
    this.targetDay = targetDay
    this.today = formatStringDay({
      targetDay: targetDay,
      formatStr: 'yyyy/M/d'
    })
    this.log = new Log('CreateText')
    this.separateLine = '--------------------------------'
    this.text = ''
    this.textTodayDead = ''
    this.textTodayMTG = ''

    this.firstText = `${this.today}時点\n近日中のMTG情報です！\n\n【開催日時】内容\n\n詳細はMTG情報LINEのノートをご確認ください。`
  }

  public addLine () {
    if (this.text !== '') this.text = this.text + '\n\n\n'
  }

  public addSeparate ({
    isUnnecessaryEndNewLine = false
  } : {
    isUnnecessaryEndNewLine?: boolean
  }) {
    if (this.text !== '') {
      if (isUnnecessaryEndNewLine) {
        this.text = this.text + `\n\n${this.separateLine}`
      }

      this.text = this.text + `\n\n${this.separateLine}\n`
      return
    }
  }

  public addTodayDeadMessage (array: Array<CellType>) {
    array.forEach((element, index) => {
      const data = new MTGDataText({
        item: element,
        targetDay: this.targetDay,
      })

      const { title, concealment } = data
      const { time, date, ee } = concealment

      const newLine = index === 0 ? '' : '\n\n'
      const timeText = time ? ' ' + time + '~' : ''
      const mtgInfo = `【${date}(${ee})${timeText}】\n${title}`
      this.textTodayDead = this.textTodayDead + newLine + `${mtgInfo}`
    })
  }

  public addTodayMTGMessage (array: Array<CellType>) {
    let separateDate = ''
    let isSeparateDate = true
    array.forEach((element) => {
      const data = new MTGDataText({
        item: element,
        targetDay: this.targetDay,
        beforeDate: separateDate
      })
      const date = data.concealment.date

      if (!date || isBefore(date, startOfDay(this.today ?? new Date()))) return

      if (separateDate === date) {
        isSeparateDate = false
      } else {
        this.addSeparate({
          isUnnecessaryEndNewLine: false
        })
        isSeparateDate = true
      }

      this.textTodayMTG = this.textTodayMTG + data.content({ isSeparateDate })
      separateDate = date ?? ''
    })
  }

  public addScheduleMessage (array: Array<CellType>) {
    array.sort((a, b) => {
      const aDay = formatStringDay({
        targetDay: a[Col.ARRAY_START_DATE] as string + ' ' + a[Col.ARRAY_START_TIME] as string,
      })

      const bDay = formatStringDay({
        targetDay: b[Col.ARRAY_START_DATE] as string + ' ' + b[Col.ARRAY_START_TIME] as string as string,
      })

      if (!aDay || !bDay) return 0

      if (isBefore(aDay, bDay)) return -1
      if (isBefore(bDay, aDay)) return 1
      return 0
    })

    let separateDate = ''
    let isSeparateDate = true
    array.forEach((element) => {
      const data = new MTGDataText({
        item: element,
        targetDay: this.targetDay,
        beforeDate: separateDate
      })
      const date = data.concealment.date

      if (separateDate === date) {
        isSeparateDate = false
      } else {
        this.addSeparate({
          isUnnecessaryEndNewLine: false
        })
        isSeparateDate = true
      }

      this.text = this.text + data.content({ isSeparateDate })
      separateDate = date ?? ''
    })
  }
}
