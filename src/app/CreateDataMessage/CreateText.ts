import { isBefore, format, startOfDay } from 'date-fns'
import { ja } from 'date-fns/locale'

import { formatStringDay } from '@/utils/formatDay'

import { Log } from '@/app/common/Log'

import * as Header from '@/const/Header'

import { CellType } from '@/app/common/SimpleGoogleSpreadsheet'

export class CreateText {
  log: Log
  today: string | undefined
  todayYear: string | undefined
  text: string
  separateLine: string
  textTodayDead: string
  firstText: string

  constructor (targetDay?: string) {
    this.log = new Log('CreateText')
    this.separateLine = '--------------------------------'
    this.text = ''
    this.textTodayDead = ''
    this.today = formatStringDay({ targetDay })
    this.todayYear = formatStringDay({
      targetDay: this.today,
      formatStr: 'yyyy'
    })
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

  public addMTGMessage (array: Array<CellType>) {
    array.forEach((element, ) => {
      const title = element[Header.ARRAY_COL_A]
      const deadLineDate = element[Header.ARRAY_COL_B] ? '\n' + formatStringDay({
        targetDay: element[Header.ARRAY_COL_B] as string,
        formatStr: 'M/d' + ' 〆切'
      }) : ''

      const date = formatStringDay({
        targetDay: element[Header.ARRAY_COL_C] as string,
      })
      const itemYear = formatStringDay({
        targetDay: date,
        formatStr: 'yyyy'
      })
      const itemMothDay = formatStringDay({
        targetDay: date,
        formatStr: 'M/d'
      })

      const timeData = element[Header.ARRAY_COL_E] as string
      const time = timeData === '' ? undefined : formatStringDay({
        targetDay: timeData,
        formatStr: 'HH:mm'
      })
      const displayDate = this.todayYear === itemYear ? itemMothDay : date
      const day = time ? `${displayDate} ${time}` : displayDate

      const mtgInfo = `【${day}】\n${title}${deadLineDate}`
      this.text = this.text + `\n\n${mtgInfo}`
    })
  }

  public addTodayDeadMessage (array: Array<CellType>) {
    array.forEach((element, index) => {
      const title = element[Header.ARRAY_COL_A]

      const date = formatStringDay({
        targetDay: element[Header.ARRAY_COL_C] as string,
      })
      const itemYear = formatStringDay({
        targetDay: date,
        formatStr: 'yyyy'
      })
      const itemMothDay = formatStringDay({
        targetDay: date,
        formatStr: 'M/d'
      })

      const timeData = element[Header.ARRAY_COL_E] as string
      const time = timeData === '' ? undefined : formatStringDay({
        targetDay: timeData,
        formatStr: 'HH:mm'
      })
      const displayDate = this.todayYear === itemYear ? itemMothDay : date
      const day = time ? `${displayDate} ${time}` : displayDate

      const newLine = index === 0 ? '' : '\n\n'
      const mtgInfo = `【${day}】\n${title}`
      this.textTodayDead = this.textTodayDead + newLine + `${mtgInfo}`
    })
  }

  private __getFee(element: CellType): string {
    const localFee = element[Header.ARRAY_COL_J]
    const zoomFee = element[Header.ARRAY_COL_K]

    if (localFee === '' && zoomFee === '') return ''

    const fee = (localFee === zoomFee) ?
      localFee :
      null

    if (fee === 0) return '無料'

    let result = ''
    if (localFee !== '') {
      result = result + `現地: ${localFee}円`
    }

    if (zoomFee !== '') {
      result = result === '' ?
        result + `zoom: ${zoomFee}円` :
        result + `\nzoom: ${zoomFee}円`
    }

    return result
  }

  public addScheduleMessage (array: Array<CellType>) {
    array.sort((a, b) => {
      const aDay = formatStringDay({
        targetDay: a[Header.ARRAY_COL_C] as string,
      })

      const bDay = formatStringDay({
        targetDay: b[Header.ARRAY_COL_C] as string,
      })

      if (!aDay || !bDay) return 0

      if (isBefore(aDay, bDay)) return -1
      if (isBefore(bDay, aDay)) return 1
      return 0
    })

    // this.log.push(array)

    let separateDate = ''
    let isSeparateDate = true
    array.forEach((element) => {
      const title = element[Header.ARRAY_COL_A]
      const deadLineDate = element[Header.ARRAY_COL_B] ? '\n' + formatStringDay({
        targetDay: element[Header.ARRAY_COL_B] as string,
        formatStr: 'M/d' + ' 〆切'
      }) : ''

      const date = formatStringDay({
        targetDay: element[Header.ARRAY_COL_C] as string,
      })

      if (!date || isBefore(date, startOfDay(this.today ?? new Date()))) return

      const itemYear = formatStringDay({
        targetDay: date,
        formatStr: 'yyyy'
      })
      const itemMothDay = formatStringDay({
        targetDay: date,
        formatStr: 'M/d'
      })

      const timeData = element[Header.ARRAY_COL_E] as string
      const time = timeData === '' ? undefined : formatStringDay({
        targetDay: timeData,
        formatStr: 'HH:mm'
      })
      const displayDate = this.todayYear === itemYear ? itemMothDay : date
      const ee = date ? format(date, 'EEE', { locale: ja }) : ''

      let firstLine = `${displayDate} (${ee})\n\n`
      if (separateDate === date) {
        firstLine = ''
        isSeparateDate = false
      } else {
        this.addSeparate({
          isUnnecessaryEndNewLine: false
        })
        isSeparateDate = true
      }

      const secondLine = time ? firstLine + '●' + time + '~' : firstLine
      const thirdLine = !isSeparateDate ?
        secondLine + '\n' + title + '\n' :
        time ?
        secondLine + '\n' + title + '\n' :
        secondLine + title + '\n'

      const feeLine = this.__getFee(element)
      const forthLine = thirdLine + feeLine + deadLineDate
      this.text = !isSeparateDate ?
        this.text + `\n\n${forthLine}` :
        this.text + `${forthLine}`

      separateDate = date
    })
  }
}
