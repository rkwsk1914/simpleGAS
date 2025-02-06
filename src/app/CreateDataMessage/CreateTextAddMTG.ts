import { Log } from '@/app/common/Log'

import { resMTGData } from '@/app/Gemini'

import { GASController } from '@/app/GASController'

import { MTGDataText } from './MTGDataText'

export class CreateTextAddMTG {
  log: Log
  separateLine: string
  gasController: GASController
  textDuplicateData: string
  textRegisteredData: string
  textDuplicateDataFirst: string
  textRegisteredDataFirst: string
  textDuplicateDataCount: number

  constructor () {
    this.gasController = new GASController()
    this.log = new Log('CreateTextAddMTG')
    this.separateLine = '--------------------------------'
    this.textDuplicateData = ''
    this.textRegisteredData = ''
    this.textDuplicateDataFirst = '⚠️⚠️重複しています。⚠️⚠️\n開催日と開催時刻が同じものは登録をキャンセルしています。\n'
    this.textDuplicateDataCount = 0
    this.textRegisteredDataFirst = '🎉🎉登録しました。🎉🎉\n\n'
  }

  public addLine (text: string): string {
    if (text !== '') return text + '\n\n\n'
    return text
  }

  public addSeparate ({
    text,
    isUnnecessaryEndNewLine = false
  } : {
    text: string
    isUnnecessaryEndNewLine?: boolean
  }): string {
    if (text !== '') {
      if (isUnnecessaryEndNewLine) {
        return text + `\n\n${this.separateLine}`
      }

      return text + `\n\n${this.separateLine}\n`
    }

    return text
  }

  public async pushDuplicateMTGData (data: resMTGData[]) {
    const dataList = await Promise.all(data.map(async (item) => {
      return [
        item.title,
        item.deadline,
        item.startDate,
        item.endDate,
        item.startDate + ' ' + item.startTime,
        item.endDate + ' ' + item.endTime,
        item.allDayEvent,
        item.location,
        item.description,
        item.isCreateNode,
        item.locationFee,
        item.zoomFee,
        Utilities.getUuid(),
      ]
    }))

    const allData = this.gasController.getAllMTGData()
    const mtgAllData = allData.map(item => {
      return new MTGDataText({
        item
      })
    })

    const duplicateData: Array<{
      newMTG: MTGDataText
      existItems: MTGDataText[]
    } | null> = await Promise.all(dataList.map(async (dataItem) => {
      const newMTG = new MTGDataText({ item: dataItem })
      const existItems = mtgAllData.filter(existMtgData => existMtgData.startDate === newMTG.startDate)

      if (existItems.length > 0) return {
        newMTG,
        existItems
      }

      return null
    }))

    const filteredData = duplicateData.filter((item): item is {
      newMTG: MTGDataText
      existItems: MTGDataText[]
    } => item !== null)

    let separateDate = ''
    let isSeparateDate = true

    this.textDuplicateDataCount = filteredData.length

    filteredData.forEach(async (element) => {
      if (!element) return
      const { newMTG, existItems } = element

      const findSameTime = existItems.find(item => {
        return item.startDate === newMTG.startDate &&
        item.startTime === newMTG.startTime
      })

      if (!findSameTime) {
        this.gasController.setNewMTG(newMTG)
      }

      const date = newMTG.concealment.date

      const startTime = newMTG.startTime
      const time = startTime === '' ? '' : '🕥' + startTime + '~' + '\n'

      if (separateDate === date) {
        isSeparateDate = false
      } else {
        this.textDuplicateData = this.addSeparate({
          text: this.textDuplicateData,
          isUnnecessaryEndNewLine: false
        })
        isSeparateDate = true

        const displayDateWithTime = date + '\n\n' + time

        this.textDuplicateData = this.textDuplicateData +
          (time ? displayDateWithTime : separateDate)
      }

      let existText = ''
      existItems.forEach((item) => {
        const content = item.content({ isSeparateDate, hasTime: false, hasTitle: false })
        const title = '【✅重複かも】' + item.title
        const existTime = item.startTime === '' ? '' : '🕥' + item.startTime + '~\n'
        const existSections = existTime + title + content

        existText = existText + '\n\n' + existSections
      })

      const icon = findSameTime ?  '【🛑登録キャンセル】' : '【🆕登録しました】'
      const newMTGSection = icon +
        newMTG.title + '\n' +
        newMTG.content({ isSeparateDate, hasTime: false, hasTitle: false })

      this.textDuplicateData =
        this.textDuplicateData +
        newMTGSection + existText

      separateDate = date ?? ''
    })
  }

  public async pushRegisteredMTGData (data: resMTGData[]) {
    const dataList = await Promise.all(data.map(async (item) => {
      return [
        item.title,
        item.deadline,
        item.startDate,
        item.endDate,
        item.startDate + ' ' + item.startTime,
        item.endDate + ' ' + item.endTime,
        item.allDayEvent,
        item.location,
        item.description,
        item.isCreateNode,
        item.locationFee,
        item.zoomFee,
        Utilities.getUuid(),
      ]
    }))

    const allData = this.gasController.getAllMTGData()
    const mtgAllData = allData.map(item => {
      return new MTGDataText({
        item
      })
    })

    const registeredData = await Promise.all(dataList.map(async (dataItem) => {
      const newMTG = new MTGDataText({ item: dataItem })

      const findData = mtgAllData.find(existMtgData => existMtgData.startDate === newMTG.startDate)

      if (!findData) {
        this.gasController.setNewMTG(newMTG)
        return newMTG
      }

      return null
    }))

    const filteredData = registeredData.filter((item): item is MTGDataText => item !== null)

    let separateDate = ''
    let isSeparateDate = true

    filteredData.forEach(async(element) => {
      if (!element) return
      const date = element.concealment.date

      if (separateDate === date) {
        isSeparateDate = false
      } else {
        this.textRegisteredData = this.addSeparate({
          text: this.textRegisteredData,
          isUnnecessaryEndNewLine: false
        })
        isSeparateDate = true
      }

      this.textRegisteredData = this.textRegisteredData + element.content({ isSeparateDate })
      separateDate = date ?? ''
    })
  }
}
