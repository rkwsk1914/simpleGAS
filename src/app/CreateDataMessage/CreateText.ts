import { formatStringDay } from '@/utils/formatDay'

import { Log } from '@/app/common/Log'

import * as Header from '@/const/Header'

import { CellType } from '@/app/common/SimpleGoogleSpreadsheet'

export class CreateText {
  log: Log
  today: string | undefined
  todayYear: string | undefined
  text: string
  textTodayDead: string
  firstText: string

  constructor (targetDay?: string) {
    this.log = new Log('CreateText')
    this.text = ''
    this.textTodayDead = ''
    this.today = formatStringDay({ targetDay })
    this.todayYear = formatStringDay({
      targetDay: this.today,
      formatStr: 'yyyy'
    })
    this.firstText = `${this.today}時点\n近日中のMTG情報です！\n\n【開催日】内容`
  }

  public addLine () {
    if (this.text !== '') this.text = this.text + '\n\n\n'
  }

  public addSeparate () {
    if (this.text !== '') this.text = this.text +
      '\n\n--------------------------------\n'
  }

  public addMessage (array: Array<CellType>) {
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
    array.forEach((element, ) => {
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

      const mtgInfo = `【${day}】\n${title}`
      this.textTodayDead = this.textTodayDead + `\n\n${mtgInfo}`
    })
  }
}
