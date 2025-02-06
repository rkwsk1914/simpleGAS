import {
  isWithinInterval,
  addDays,
  isAfter,
  isToday,
  isEqual
} from 'date-fns'

import { MTGDataText } from '@/app/CreateDataMessage/MTGDataText'

import * as Header from '@/const/Header'
import * as LineMemberSheetCol from '@/const/lineMemberSheetCol'
import * as ScheduleSheetCol from '@/const/ScheduleSheetCol'
import * as LineGroupSheetCol from '@/const/lineGroupSheetCol'
import * as DeliverySheetCol from '@/const/deliverySheetCol'

import { formatStringDay, formatYyyyMmDd } from '@/utils/formatDay'

import { Log } from '@/app/common/Log'
import { SimpleGoogleSpreadsheet, CellType } from '@/app/common/SimpleGoogleSpreadsheet'

import type { GroupDataType, UserDataType } from '@/types/lineApp'
import { SelectMenu } from '@/types/selectMenu'
export class GASController {
  log: Log
  scheduleSgs: SimpleGoogleSpreadsheet
  scheduleTempSgs: SimpleGoogleSpreadsheet
  memberSgs: SimpleGoogleSpreadsheet
  lineGroupSgs: SimpleGoogleSpreadsheet
  lineMemberSgs: SimpleGoogleSpreadsheet
  deliverySgs: SimpleGoogleSpreadsheet

  constructor () {
    this.log = new Log('GASController')
    this.scheduleSgs = new SimpleGoogleSpreadsheet(Header.BOOK_URL, 'スケジュール')
    this.scheduleTempSgs = new SimpleGoogleSpreadsheet(Header.BOOK_URL, 'スケジュール のコピー')
    this.memberSgs = new SimpleGoogleSpreadsheet(Header.BOOK_URL, 'メンバー')
    this.lineGroupSgs = new SimpleGoogleSpreadsheet(Header.BOOK_URL, 'lineGroup')
    this.lineMemberSgs = new SimpleGoogleSpreadsheet(Header.BOOK_URL, 'lineMember')
    this.deliverySgs = new SimpleGoogleSpreadsheet(Header.BOOK_URL, '配信')
  }

  private __findUserData(userId: string): {
    userData: CellType
    row: number
  } | null {
    const lastRow = this.lineMemberSgs.doGetLastRow(2, LineMemberSheetCol.ID)
    if (!lastRow) return null

    const data: Array<CellType> = this.lineMemberSgs.doReadSS({
      row: 2,
      col: LineMemberSheetCol.ID,
      endRow: lastRow,
      endCol: LineMemberSheetCol.SETTING,
      hasBlank: true
    })

    const userData = data.find((item) => item[LineMemberSheetCol.ARRAY_ID] === userId)
    if (!userData) return null

    const index = data.findIndex((item) => item[LineMemberSheetCol.ARRAY_ID] === userId)
    const row = index + 2

    return {
      userData,
      row
    }
  }

  getStatus (userId: string): string | null {
    const data = this.__findUserData(userId)
    const status = data?.userData && data.userData[LineMemberSheetCol.ARRAY_STATUS] ?
      String(data.userData[LineMemberSheetCol.ARRAY_STATUS]) :
      null
    return status
  }

  setStatus (status: string, userId: string) {
    const data = this.__findUserData(userId)
    if (data) this.lineMemberSgs.doWriteSS(status, data?.row, LineMemberSheetCol.STATUS)
  }

  getSetting (userId: string): string {
    const data = this.__findUserData(userId)
    const setting = data?.userData && data.userData[LineMemberSheetCol.ARRAY_SETTING]
      ? String(data.userData[LineMemberSheetCol.ARRAY_SETTING]) :
      null

    const result = setting ? setting : SelectMenu.deadline
    if (setting === null) this.setSetting(SelectMenu.deadline, userId)
    return result
  }

  setSetting (setting: string, userId: string) {
    const data = this.__findUserData(userId)
    if (data) this.lineMemberSgs.doWriteSS(setting, data?.row, LineMemberSheetCol.SETTING)
  }

  getTodayDeadLineData (targetDay?: string): Array<CellType> {
    const data = this.scheduleSgs.doReadSS({
      row: 2,
      col: ScheduleSheetCol.SUBJECT,
      endRow: this.scheduleSgs.doGetLastRow(2,1) ?? 1000,
      endCol: ScheduleSheetCol.LAST_COL,
    })

    const deadLineDay = formatStringDay({ targetDay })
    if (!deadLineDay) return []

    const todayDeadLineData = data.filter((item: Array<string>) => {
      if (!item[ScheduleSheetCol.ARRAY_DEAD_LINE]) return
      if (!item[ScheduleSheetCol.ARRAY_END_DATE]) return

      const itemDay = formatYyyyMmDd({
        targetDay: item[ScheduleSheetCol.ARRAY_DEAD_LINE]
      })
      const startDay = formatYyyyMmDd({
        targetDay: item[ScheduleSheetCol.ARRAY_END_DATE]
      })

      if (itemDay && startDay && isEqual(itemDay, startDay)) return undefined
      if (itemDay && isEqual(itemDay, deadLineDay)) return item
    })
    return todayDeadLineData
  }

  getTodayMTGLineData (targetDay?: string): Array<CellType> {
    const data = this.scheduleSgs.doReadSS({
      row: 2,
      col: ScheduleSheetCol.SUBJECT,
      endRow: this.scheduleSgs.doGetLastRow(2,1) ?? 1000,
      endCol: ScheduleSheetCol.LAST_COL,
    })

    const startDay = formatStringDay({ targetDay })
    if (!startDay) return []

    const todayMTGLineData = data.filter((item: Array<string>) => {
      if (!item[ScheduleSheetCol.ARRAY_START_DATE]) return

      const itemDay = formatYyyyMmDd({
        targetDay: item[ScheduleSheetCol.ARRAY_START_DATE]
      })

      if (itemDay && isEqual(itemDay, startDay)) return item
    })

    return todayMTGLineData
  }

  getCloseDeadLineData (interval: number = 3, targetDay?: string): Array<CellType> {
    const data = this.scheduleSgs.doReadSS({
      row: 2,
      col: ScheduleSheetCol.SUBJECT,
      endRow: this.scheduleSgs.doGetLastRow(2,1) ?? 1000,
      endCol: ScheduleSheetCol.LAST_COL,
    })

    const today = formatStringDay({ targetDay })
    if (!today) return []

    const deadLineDay = addDays(today, interval)

    const closeDeadLineData = data.filter((item: Array<string>) => {
      if (!item[ScheduleSheetCol.ARRAY_DEAD_LINE]) return

      const itemDay = formatYyyyMmDd({
        targetDay: item[ScheduleSheetCol.ARRAY_DEAD_LINE]
      })

      if (itemDay && isWithinInterval(itemDay, {
        start: today,
        end: deadLineDay,
      }) && !isEqual(itemDay, today)) return item
    })
    return closeDeadLineData
  }

  getPossibleMTGData (targetDay?: string): Array<CellType> {
    const data = this.scheduleSgs.doReadSS({
      row: 2,
      col: ScheduleSheetCol.SUBJECT,
      endRow: this.scheduleSgs.doGetLastRow(2,1) ?? 1000,
      endCol: ScheduleSheetCol.LAST_COL,
    })

    const today = formatStringDay({ targetDay })

    const possibleMTGData = data.filter((item: Array<string>) => {
      if (!item[ScheduleSheetCol.ARRAY_DEAD_LINE]) return

      const itemDay = formatYyyyMmDd({
        targetDay: item[ScheduleSheetCol.ARRAY_DEAD_LINE]
      })

      if (itemDay && today) {
        if (isAfter(itemDay, today) || isToday(itemDay)) return item
      }
    })
    return possibleMTGData
  }

  getUndecidedMTGData (): Array<CellType> {
    const data = this.scheduleSgs.doReadSS({
      row: 2,
      col: ScheduleSheetCol.SUBJECT,
      endRow: this.scheduleSgs.doGetLastRow(2,1) ?? 1000,
      endCol: ScheduleSheetCol.LAST_COL,
    })

    const undecidedMTGData = data.filter((item: Array<string>) => {
      if (!item[ScheduleSheetCol.ARRAY_DEAD_LINE]) return item
    })
    return undecidedMTGData
  }

  getAllMTGData (): Array<CellType> {
    const data = this.scheduleSgs.doReadSS({
      row: 2,
      col: ScheduleSheetCol.SUBJECT,
      endRow: this.scheduleSgs.doGetLastRow(2,ScheduleSheetCol.SUBJECT) ?? 1000,
      endCol: ScheduleSheetCol.LAST_COL,
    })
    return data
  }

  setNewMember(user?: UserDataType) {
    if (!user) return

    const lastRow = this.lineMemberSgs.doGetLastRow(2, LineMemberSheetCol.ID)
    if (!lastRow) return

    const data = this.lineMemberSgs.doReadSS({
      row: 2,
      col: LineMemberSheetCol.ID,
      endRow: lastRow,
      endCol: LineMemberSheetCol.SETTING,
    }) as Array<Array<string | number>>

    const findUserRow = data.find((item ) =>
      item[LineMemberSheetCol.ARRAY_ID] === user.userId
    )

    if (!findUserRow) {
      this.lineMemberSgs.doWriteSS(user.userId, lastRow, LineMemberSheetCol.ID)
      this.lineMemberSgs.doWriteSS(user.name, lastRow, LineMemberSheetCol.DISPLAY_NAME)
      this.lineMemberSgs.doWriteSS(SelectMenu.ABO, lastRow, LineMemberSheetCol.SETTING)
    }
  }

  setNewMTG(element: MTGDataText) {
    const lastRow = this.scheduleSgs.doGetLastRow(2, ScheduleSheetCol.SUBJECT)
    if (!lastRow) return

    const data = element.concealment.cellData

    this.log.push([data])

    this.scheduleSgs.doWriteSS(data[0] as string, lastRow, ScheduleSheetCol.SUBJECT)
    this.scheduleSgs.doWriteSS(data[1] as string, lastRow, ScheduleSheetCol.DEAD_LINE)
    this.scheduleSgs.doWriteSS(data[2] as string, lastRow, ScheduleSheetCol.START_DATE)
    this.scheduleSgs.doWriteSS(data[3] as string, lastRow, ScheduleSheetCol.END_DATE)
    this.scheduleSgs.doWriteSS(data[4] as string, lastRow, ScheduleSheetCol.START_TIME)
    this.scheduleSgs.doWriteSS(data[5] as string, lastRow, ScheduleSheetCol.END_TIME)
    this.scheduleSgs.doWriteSS(data[6] as string, lastRow, ScheduleSheetCol.ALL_DAY_EVENT)
    this.scheduleSgs.doWriteSS(data[7] as string, lastRow, ScheduleSheetCol.LOCATION)
    this.scheduleSgs.doWriteSS(data[8] as string, lastRow, ScheduleSheetCol.DESCRIPTION)
    this.scheduleSgs.doWriteSS(data[9] as string, lastRow, ScheduleSheetCol.IS_CREATE_NOTE)
    this.scheduleSgs.doWriteSS(data[10] as string, lastRow, ScheduleSheetCol.PRICE_LOCAL)
    this.scheduleSgs.doWriteSS(data[11] as string, lastRow, ScheduleSheetCol.PRICE_ZOOM)
    this.scheduleSgs.doWriteSS(data[12] as string, lastRow, ScheduleSheetCol.ID)
  }

  setGroupData(group?: GroupDataType) {
    if (!group) return

    const lastRow = this.lineGroupSgs.doGetLastRow(2, LineGroupSheetCol.ID)
    if (!lastRow) return

    this.lineGroupSgs.doWriteSS(group.groupName, lastRow, LineGroupSheetCol.DISPLAY_NAME)
    this.lineGroupSgs.doWriteSS(group.groupId, lastRow, LineGroupSheetCol.ID)
  }

  getGroupIds(): Array<string> | null {
    const lastRow = this.lineGroupSgs.doGetLastRow(2, LineGroupSheetCol.ID)
    if (!lastRow) return null

    const ids: Array<string> = []
    const data: Array<CellType> = this.lineGroupSgs.doReadSS({
      row: 2,
      col: LineGroupSheetCol.ID,
      endRow: lastRow,
      endCol: LineGroupSheetCol.ID
    })

    data.map((item) => {
      const id = item[LineGroupSheetCol.ARRAY_ID]
      if(id && id !== '') ids.push(String(id))
    })

    return ids
  }

  async getUserIds ({
    filterSetting
  }: {
    filterSetting?: string
  }): Promise<Array<string> | null> {
    const lastRow = this.lineMemberSgs.doGetLastRow(2, LineGroupSheetCol.ID)
    if (!lastRow) return null

    const ids: Array<string> = []
    const data: Array<CellType> = this.lineMemberSgs.doReadSS({
      row: 2,
      col: LineMemberSheetCol.ID,
      endRow: lastRow,
      endCol: LineMemberSheetCol.SETTING
    })

    data.map((item) => {
      const id = item[LineMemberSheetCol.ARRAY_ID]
      const status = item[LineMemberSheetCol.ARRAY_STATUS]

      if(id && id !== '' && status === '') {
        if (filterSetting) {
          const setting = item[LineMemberSheetCol.ARRAY_SETTING]
          if (setting === filterSetting) ids.push(String(id))
          return
        }

        ids.push(String(id))
        return
      }
    })

    return ids
  }

  getDeliveryMessage(): {
    message: string
    target: string
  } | null {
    const data: Array<CellType> = this.deliverySgs.doReadSS({
      row: 2,
      col: DeliverySheetCol.MESSAGE,
      endRow: 2,
      endCol: DeliverySheetCol.TARGET
    })

    if (!data) return null

    const message = data[0][DeliverySheetCol.ARRAY_MESSAGE] as string
    const target = data[0][DeliverySheetCol.ARRAY_TARGET] as string

    if (!message || !target) return null

    return {
      message,
      target
    }
  }
}
