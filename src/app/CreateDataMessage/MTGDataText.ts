import { isBefore, format, startOfDay } from 'date-fns'
import { ja } from 'date-fns/locale'

import { formatStringDay } from '@/utils/formatDay'

import { Log } from '@/app/common/Log'

import * as Col from '@/const/ScheduleSheetCol'

import { CellType } from '@/app/common/SimpleGoogleSpreadsheet'

type InputElement = CellType

export class MTGDataText {
  log: Log

  concealment: {
    time: string | undefined
    separateDate: string
    displayDate: string
    date: string | undefined
    ee: string | undefined
    isDisplay: boolean
    cellData: CellType
  }

  title: string
  location: string
  deadline: string
  startDate: string | undefined
  endDate: string | undefined
  startTime: string | undefined
  endTime: string | undefined
  allDayEvent: string
  description: string
  isCreateNode: string
  fee: string
  id: string

  constructor ({
    item,
    targetDay,
    beforeDate
  }: {
    item: InputElement
    targetDay?: string
    beforeDate?: string
  }) {
    this.log = new Log('MTGDataText')

    const separateDate = this.__getSeparateDate(item, targetDay)
    const date = formatStringDay({
      targetDay: item[Col.ARRAY_START_DATE] as string,
    })

    this.concealment = {
      time: this.__getStartTimeData(item),
      separateDate,
      displayDate: this.__createDisplayDate(item, separateDate, beforeDate),
      date,
      ee: date ? format(date, 'EEE', { locale: ja }) : '',
      isDisplay: this.__checkDisplayItem(item, targetDay),
      cellData: [
        item[Col.ARRAY_SUBJECT] as string,
        formatStringDay({
          targetDay: item[Col.ARRAY_DEAD_LINE] as string,
        }) ?? '',
        formatStringDay({
          targetDay: item[Col.ARRAY_START_DATE] as string,
        }) ?? '',
        formatStringDay({
          targetDay: item[Col.ARRAY_END_DATE] as string,
        }) ?? '',
        formatStringDay({
          targetDay: item[Col.ARRAY_START_TIME] as string,
          formatStr: 'HH:mm'
        }) ?? '',
        formatStringDay({
          targetDay: item[Col.ARRAY_END_TIME] as string,
          formatStr: 'HH:mm'
        }) ?? '',
        item[Col.ARRAY_ALL_DAY_EVENT] as string,
        item[Col.ARRAY_LOCATION] as string,
        item[Col.ARRAY_DESCRIPTION] as string,
        item[Col.ARRAY_IS_CREATE_NOTE] as string,
        item[Col.ARRAY_PRICE_LOCAL] as string,
        item[Col.ARRAY_PRICE_ZOOM] as string,
        item[Col.ARRAY_ID] as string
      ]
    }

    this.title = item[Col.ARRAY_SUBJECT] as string
    this.location = this.__getLocation(item)
    this.deadline = this.__getDeadLine(item)
    this.startDate = formatStringDay({
      targetDay: item[Col.ARRAY_START_DATE] as string,
    })
    this.endDate = formatStringDay({
      targetDay: item[Col.ARRAY_END_DATE] as string,
    })
    this.startTime = formatStringDay({
      targetDay: item[Col.ARRAY_START_TIME] as string,
      formatStr: 'HH:mm'
    })
    this.endTime = formatStringDay({
      targetDay: item[Col.ARRAY_END_TIME] as string,
      formatStr: 'HH:mm'
    })
    this.allDayEvent = item[Col.ARRAY_ALL_DAY_EVENT] as string
    this.description = item[Col.ARRAY_DESCRIPTION] as string
    this.isCreateNode = this.__getIsCreateNote(item)
    this.fee = this.__getFee(item)
    this.id = item[Col.ARRAY_ID] as string
  }

  private __getDeadLine (item: InputElement): string {
    const itemValue = item[Col.ARRAY_DEAD_LINE] as string
    const deadLine = itemValue === '' ? undefined : formatStringDay({
      targetDay: itemValue
    })
    const startDate = formatStringDay({
      targetDay: item[Col.ARRAY_START_DATE] as string,
    })

    if (deadLine === startDate) return ''

    if (deadLine) return '⚠️' + formatStringDay({
      targetDay: item[Col.ARRAY_DEAD_LINE] as string,
      formatStr: 'M/d' + ' 〆切'
    })

    return '🔺〆切未定'
  }

  private __getFee(element: CellType): string {
    const localFee = element[Col.ARRAY_PRICE_LOCAL]
    const zoomFee = element[Col.ARRAY_PRICE_ZOOM]

    if (localFee === '' && zoomFee === '') return '💰参加費 未定'

    const fee = (localFee === zoomFee) ?
      localFee :
      null

    if (fee === 0) return '💰🆓無料'

    let result = ''
    if (localFee !== '') {
      result = result + `💰現地: ${localFee}円`
    }

    if (zoomFee !== '') {
      result = result === '' ?
        result + `💰zoom: ${zoomFee}円` :
        result + `\n💰zoom: ${zoomFee}円`
    }

    return result
  }

  private __getIsCreateNote (element: CellType): string {
    if (element[Col.ARRAY_IS_CREATE_NOTE] === 'あり') return '📝MTG情報LINEにノートあります'
    if (element[Col.ARRAY_IS_CREATE_NOTE] === '不要') return ''
    return 'ノート未作成'
  }

  private __getLocation (element: CellType): string {
    return element[Col.ARRAY_LOCATION] ?
    '📍' + element[Col.ARRAY_LOCATION] :
    ''
  }

  private __getStartTimeData (element: CellType): string {
    const timeData = element[Col.ARRAY_START_TIME] as string
    if (timeData === '') return ''

    const time = formatStringDay({
        targetDay: timeData,
        formatStr: 'HH:mm'
      })
    return time ?? ''
  }

  private __checkDisplayItem (item: CellType, targetDay?: string): boolean {
    const today = formatStringDay({ targetDay })
    const date = formatStringDay({
      targetDay: item[Col.ARRAY_START_DATE] as string,
    })

    if (!date || isBefore(date, startOfDay(today ?? new Date()))) return false
    return true
  }

  private __getSeparateDate (element: CellType, targetDay?: string): string {
    const today = formatStringDay({ targetDay })
    const elementDate = element[Col.ARRAY_START_DATE] as string
    const date = formatStringDay({
      targetDay: elementDate
    })
    const todayYear = formatStringDay({
      targetDay: today,
      formatStr: 'yyyy'
    })
    const itemYear = formatStringDay({
      targetDay: elementDate,
      formatStr: 'yyyy'
    })
    const itemMothDay = formatStringDay({
      targetDay: elementDate,
      formatStr: 'M/d'
    })

    const displayDay = todayYear === itemYear ? itemMothDay : date
    const ee = date ? format(date, 'EEE', { locale: ja }) : ''
    return `${displayDay} (${ee})`

  }

  private __createDisplayDate(element: CellType, displayDate: string, beforeDate?: string): string {
    const startTime = this.__getStartTimeData(element)
    const time = startTime === '' ? '' : '🕥' + startTime + '~'
    const displayDateWithTime = displayDate + '\n\n' + time

    const date = formatStringDay({
      targetDay: element[Col.ARRAY_START_DATE] as string,
    })

    if (beforeDate === date) return time ?? ''
    return time ? displayDateWithTime : displayDate
  }

  private __formatNewLine(result: string, content: string, isLast?: boolean): string {
    return content === '' || isLast ?
      result + content :
      result + content + '\n'
  }

  public content ({
    isSeparateDate,
    hasTitle = true,
    hasLocation = true,
    hasDeadline = true,
    // startDate = true,
    // endDate = true,
    // startTime = true,
    // endTime = true,
    // allDayEvent = true,
    hasIsCreateNode = true,
    hasFee = true,
    hasTime = true
  }:{
    isSeparateDate: boolean
    hasTitle?: boolean
    hasLocation?: boolean
    hasDeadline?: boolean
    // startDate?: boolean
    // endDate?: boolean
    // startTime?: boolean
    // endTime?: boolean
    // allDayEvent?: boolean
    hasIsCreateNode?: boolean
    hasFee?: boolean
    hasTime?: boolean
  }): string {
    const { time, displayDate, isDisplay } = this.concealment
    if (!isDisplay) return ''

    let result = ''

    const titleLine = time || !isSeparateDate?
      displayDate + '\n' + this.title :
      displayDate + '\n\n' + this.title

    if (!isSeparateDate) result = result + '\n\n'

    if (hasTitle) result = this.__formatNewLine(result, hasTime ? titleLine : this.title)
    if (hasLocation) result = this.__formatNewLine(result, this.location)
    if (hasDeadline) result = this.__formatNewLine(result, this.deadline)
    // if (startDate) result = this.__formatNewLine(result, this.startDate)
    // if (endDate) result = this.__formatNewLine(result, this.endDate)
    // if (startTime) result = this.__formatNewLine(result, this.startTime)
    // if (endTime) result = this.__formatNewLine(result, this.endTime)
    // if (allDayEvent) result = this.__formatNewLine(result, this.allDayEvent)
    if (hasIsCreateNode) result = this.__formatNewLine(result, this.isCreateNode)
    if (hasFee) result = this.__formatNewLine(result, this.fee, true)

    return result
  }
}
