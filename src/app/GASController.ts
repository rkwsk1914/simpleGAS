import {
  isWithinInterval,
  addDays,
  isAfter,
  isToday,
  isEqual
} from 'date-fns'

import * as Header from '@/const/Header'

import { formatStringDay, formatYyyyMmDd } from '@/utils/formatDay'

import { Log } from '@/app/common/Log'
import { SimpleGoogleSpreadsheet, CellType } from '@/app/common/SimpleGoogleSpreadsheet'

import type { UserDataType } from '@/types/lineApp'
export class GASController {
  log: Log
  scheduleSgs: SimpleGoogleSpreadsheet
  statusSgs: SimpleGoogleSpreadsheet
  memberSgs: SimpleGoogleSpreadsheet
  lineGroupSgs: SimpleGoogleSpreadsheet

  constructor () {
    this.log = new Log('GASController')
    this.scheduleSgs = new SimpleGoogleSpreadsheet(Header.BOOK_URL, 'スケジュール')
    this.statusSgs = new SimpleGoogleSpreadsheet(Header.BOOK_URL, 'status')
    this.memberSgs = new SimpleGoogleSpreadsheet(Header.BOOK_URL, 'メンバー')
    this.lineGroupSgs = new SimpleGoogleSpreadsheet(Header.BOOK_URL, 'lineGroup')
  }

  getStatus (): string {
    return this.statusSgs.doReadSS({
      row: 1,
      col: Header.COL_A
    })
  }

  setStatus (status: string) {
    this.statusSgs.doWriteSS(status, 1, Header.COL_A)
  }

  getTodayDeadLineData (targetDay?: string): Array<CellType> {
    const data = this.scheduleSgs.doReadSS({
      row: 2,
      col: Header.COL_A,
      endRow: this.scheduleSgs.doGetLastRow(2,1) ?? 1000,
      endCol: Header.COL_K,
    })

    const deadLineDay = formatStringDay({ targetDay })
    if (!deadLineDay) return []

    const todayDeadLineData = data.filter((item: Array<string>) => {
      if (!item[Header.ARRAY_COL_B]) return

      const itemDay = formatYyyyMmDd({
        targetDay: item[Header.ARRAY_COL_B]
      })

      if (itemDay && isEqual(itemDay, deadLineDay)) return item
    })

    this.log.push(todayDeadLineData)
    return todayDeadLineData
  }

  getCloseDeadLineData (interval: number = 3, targetDay?: string): Array<CellType> {
    const data = this.scheduleSgs.doReadSS({
      row: 2,
      col: Header.COL_A,
      endRow: this.scheduleSgs.doGetLastRow(2,1) ?? 1000,
      endCol: Header.COL_K,
    })

    const today = formatStringDay({ targetDay })
    if (!today) return []

    const deadLineDay = addDays(today, interval)

    const closeDeadLineData = data.filter((item: Array<string>) => {
      if (!item[Header.ARRAY_COL_B]) return

      const itemDay = formatYyyyMmDd({
        targetDay: item[Header.ARRAY_COL_B]
      })

      if (itemDay && isWithinInterval(itemDay, {
        start: today,
        end: deadLineDay,
      }) && !isEqual(itemDay, today)) return item
    })

    this.log.push(closeDeadLineData)
    return closeDeadLineData
  }

  getPossibleMTGData (targetDay?: string): Array<CellType> {
    const data = this.scheduleSgs.doReadSS({
      row: 2,
      col: Header.COL_A,
      endRow: this.scheduleSgs.doGetLastRow(2,1) ?? 1000,
      endCol: Header.COL_K,
    })

    const today = formatStringDay({ targetDay })

    const possibleMTGData = data.filter((item: Array<string>) => {
      if (!item[Header.ARRAY_COL_B]) return

      const itemDay = formatYyyyMmDd({
        targetDay: item[Header.ARRAY_COL_B]
      })

      if (itemDay && today) {
        if (isAfter(itemDay, today) || isToday(itemDay)) return item
      }
    })

    this.log.push(possibleMTGData)
    return possibleMTGData
  }

  getUndecidedMTGData (): Array<CellType> {
    const data = this.scheduleSgs.doReadSS({
      row: 2,
      col: Header.COL_A,
      endRow: this.scheduleSgs.doGetLastRow(2,1) ?? 1000,
      endCol: Header.COL_K,
    })

    const undecidedMTGData = data.filter((item: Array<string>) => {
      if (!item[Header.ARRAY_COL_B]) return item
    })

    this.log.push(undecidedMTGData)
    return undecidedMTGData
  }

  setNewMember(user?: UserDataType) {
    if (!user) return

    const lastRow = this.memberSgs.doGetLastRow(2, Header.COL_A)
    if (!lastRow) return

    const data = this.memberSgs.doReadSS({
      row: 2,
      col: Header.COL_A,
      endRow: lastRow,
      endCol: Header.COL_F,
    }) as Array<Array<string | number>>

    const findUserRow = data.find((item ) =>
      item[Header.ARRAY_COL_D] === user.userId
    )

    if (!findUserRow) {
      this.memberSgs.doWriteSS(user.userId, lastRow, Header.COL_D)
      this.memberSgs.doWriteSS(user.name, lastRow, Header.COL_E)
    }
  }

  setGroupData(groupId: string) {

    const lastRow = this.lineGroupSgs.doGetLastRow(2, Header.COL_A)
    if (!lastRow) return

    this.lineGroupSgs.doWriteSS(groupId, lastRow, Header.COL_A)
  }

  getGroupIds(): Array<string> | null {
    const lastRow = this.lineGroupSgs.doGetLastRow(2, Header.COL_A)
    if (!lastRow) return null

    const ids: Array<string> = []
    const data: Array<CellType> = this.lineGroupSgs.doReadSS({
      row: 2,
      col: Header.COL_A,
      endRow: lastRow,
      endCol: Header.COL_A
    })

    data.map((item) => {
      const id = item[0]
      if(id && id !== '') ids.push(String(id))
    })

    return ids
  }
}
