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

import type { GroupDataType, UserDataType } from '@/types/lineApp'
import { SelectMenu } from '@/types/selectMenu'
export class GASController {
  log: Log
  scheduleSgs: SimpleGoogleSpreadsheet
  memberSgs: SimpleGoogleSpreadsheet
  lineGroupSgs: SimpleGoogleSpreadsheet
  lineMemberSgs: SimpleGoogleSpreadsheet

  constructor () {
    this.log = new Log('GASController')
    this.scheduleSgs = new SimpleGoogleSpreadsheet(Header.BOOK_URL, 'スケジュール')
    this.memberSgs = new SimpleGoogleSpreadsheet(Header.BOOK_URL, 'メンバー')
    this.lineGroupSgs = new SimpleGoogleSpreadsheet(Header.BOOK_URL, 'lineGroup')
    this.lineMemberSgs = new SimpleGoogleSpreadsheet(Header.BOOK_URL, 'lineMember')
  }

  private __findUserData(userId: string): {
    userData: CellType
    row: number
  } | null {
    const lastRow = this.lineMemberSgs.doGetLastRow(2, Header.COL_A)
    if (!lastRow) return null

    const data: Array<CellType> = this.lineMemberSgs.doReadSS({
      row: 2,
      col: Header.COL_A,
      endRow: lastRow,
      endCol: Header.COL_G,
      hasBlank: true
    })

    const userData = data.find((item) => item[Header.ARRAY_COL_A] === userId)
    if (!userData) return null

    const index = data.findIndex((item) => item[Header.ARRAY_COL_A] === userId)
    const row = index + 2

    return {
      userData,
      row
    }
  }

  getStatus (userId: string): string | null {
    const data = this.__findUserData(userId)
    const status = data?.userData && data.userData[Header.ARRAY_COL_C] ?
      String(data.userData[Header.ARRAY_COL_C]) :
      null
    return status
  }

  setStatus (status: string, userId: string) {
    const data = this.__findUserData(userId)
    if (data) this.lineMemberSgs.doWriteSS(status, data?.row, Header.COL_C)
  }

  getSetting (userId: string): string {
    const data = this.__findUserData(userId)
    const setting = data?.userData && data.userData[Header.ARRAY_COL_D]
      ? String(data.userData[Header.ARRAY_COL_D]) :
      null

    const result = setting ? setting : SelectMenu.deadline
    if (setting === null) this.setSetting(SelectMenu.deadline, userId)

    // this.log.push(['現在の通知設定', result])
    return result
  }

  setSetting (setting: string, userId: string) {
    const data = this.__findUserData(userId)
    if (data) this.lineMemberSgs.doWriteSS(setting, data?.row, Header.COL_D)
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

    // this.log.push(todayDeadLineData)
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

     // this.log.push(closeDeadLineData)
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

    // this.log.push(possibleMTGData)
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

    // this.log.push(undecidedMTGData)
    return undecidedMTGData
  }

  getAllMTGData (): Array<CellType> {
    const data = this.scheduleSgs.doReadSS({
      row: 2,
      col: Header.COL_A,
      endRow: this.scheduleSgs.doGetLastRow(2,1) ?? 1000,
      endCol: Header.COL_K,
    })
    return data
  }

  setNewMember(user?: UserDataType) {
    if (!user) return

    const lastRow = this.lineMemberSgs.doGetLastRow(2, Header.COL_A)
    if (!lastRow) return

    const data = this.lineMemberSgs.doReadSS({
      row: 2,
      col: Header.COL_A,
      endRow: lastRow,
      endCol: Header.COL_F,
    }) as Array<Array<string | number>>

    const findUserRow = data.find((item ) =>
      item[Header.ARRAY_COL_A] === user.userId
    )

    if (!findUserRow) {
      this.lineMemberSgs.doWriteSS(user.userId, lastRow, Header.COL_A)
      this.lineMemberSgs.doWriteSS(user.name, lastRow, Header.COL_B)
      this.lineMemberSgs.doWriteSS(SelectMenu.todayDeadline, lastRow, Header.COL_D)
    }
  }

  setGroupData(group?: GroupDataType) {
    if (!group) return

    const lastRow = this.lineGroupSgs.doGetLastRow(2, Header.COL_A)
    if (!lastRow) return

    this.lineGroupSgs.doWriteSS(group.groupName, lastRow, Header.COL_B)
    this.lineGroupSgs.doWriteSS(group.groupId, lastRow, Header.COL_A)
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
      const id = item[Header.ARRAY_COL_A]
      if(id && id !== '') ids.push(String(id))
    })

    return ids
  }

  getUserIds({
    filterSetting
  }: {
    filterSetting?: string
  }): Array<string> | null {
    const lastRow = this.lineMemberSgs.doGetLastRow(2, Header.COL_A)
    if (!lastRow) return null

    const ids: Array<string> = []
    const data: Array<CellType> = this.lineMemberSgs.doReadSS({
      row: 2,
      col: Header.COL_A,
      endRow: lastRow,
      endCol: Header.COL_G
    })

    data.map((item) => {
      const id = item[Header.ARRAY_COL_A]
      const status = item[Header.ARRAY_COL_C]

      if(id && id !== '' && status === '') {
        if (filterSetting) {
          const setting = item[Header.ARRAY_COL_D]
          if (setting === filterSetting) ids.push(String(id))
          return
        }

        ids.push(String(id))
        return
      }
    })

    return ids
  }
}
