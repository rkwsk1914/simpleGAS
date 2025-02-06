import { Log } from '@/app/common/Log'
import { GASController } from '@/app/GASController'
import { LineApp } from '@/app/LineApp'

import type { MessagesType } from '@/types/lineApp'
import { SelectMenu } from '@/types/selectMenu'
import { StatusType } from '@/types/status'

export class Setting {
  log: Log
  LineApplication: LineApp

  constructor () {
    this.log = new Log('SwitchPOSTMessage')
    this.LineApplication = new LineApp()
  }

  private __showSettingMenu (): Array<MessagesType> {
    const text2 = '好きな通知設定（数字）を選んでね！\n\n' +
    `1. ${SelectMenu.deadline}` + '\n' +
    `2. ${SelectMenu.todayDeadline}` + '\n' +
    `3. ${SelectMenu.schedule}` + '\n' +
    `4. ${SelectMenu.offInfo}` + '\n' +
    `5. ${SelectMenu.cancel}`
  return [{
    type: 'text',
    text: text2
  }]
  }

  public async suggestionSetting(userId: string): Promise<Array<MessagesType>> {
    const gas = new GASController()
    gas.setStatus(StatusType.suggestionSetting, userId)
    const setting = gas.getSetting(userId)
    const text1 = '現在の通知設定です。\n\n' + setting
    const text2 = '設定を変更しますか？\n\n1. はい\n2. いいえ'

    return [{
      type: 'text',
      text: text1
    },{
      type: 'text',
      text: text2
    }]
  }

  public async settingStart ({
    text,
    userId,
  }: {
    text: string
    userId: string,
  }): Promise<Array<MessagesType> | null> {
    const gas = new GASController()
    switch (text) {
      case '1':
      case '１':
      case SelectMenu.yes: {
        gas.setStatus(StatusType.processSetting, userId)
        return this.__showSettingMenu()
      }
      case '2':
      case '２':
      case SelectMenu.no: {
        gas.setStatus(StatusType.default, userId)
        const setting = gas.getSetting(userId)
        return [{
          type: 'text',
          text: 'キャンセルしました'
        }, {
          type: 'text',
          text:  '現在の通知設定です。\n\n' + setting
        }]
      }
      default: {
        const suggestion = await this.suggestionSetting(userId)
        return [{
          type: 'text',
          text: 'って、ちょいまち！\n通知設定変更する？しない？\nどっちなんだい❗'
        }, ...suggestion]
      }
    }
  }

  public async switchSetting ({
    text,
    userId,
  }: {
    text: string
    userId: string,
  }): Promise<Array<MessagesType>> {
    const gas = new GASController()
    const setting = gas.getSetting(userId)
    switch (text) {
      case '1':
      case '１':
      case SelectMenu.deadline: {
        gas.setSetting(SelectMenu.deadline, userId)
        break
      }
      case '2':
      case '２':
      case SelectMenu.todayDeadline: {
        gas.setSetting(SelectMenu.todayDeadline, userId)
        break
      }
      case '3':
      case '３':
      case SelectMenu.schedule: {
        gas.setSetting(SelectMenu.schedule, userId)
        break
      }
      case '4':
      case '４':
      case SelectMenu.offInfo: {
        gas.setSetting(SelectMenu.offInfo, userId)
        break
      }
      case '5':
      case '５':
      case SelectMenu.cancel:
      case 'キャンセル': {
        gas.setStatus(StatusType.default, userId)
        return [{
          type: 'text',
          text: 'キャンセルしました'
        }, {
          type: 'text',
          text:  '現在の通知設定です。\n\n' + setting
        }]
      }
      case SelectMenu.getDeadline:
      case SelectMenu.getTodayDeadline:
      case SelectMenu.getSchedule:
      case SelectMenu.setting: {
        const missSelectMessage: Array<MessagesType> = []
        missSelectMessage.push({
          type: 'text',
          text: 'ちょいまち！\n先に通知設定を完了してね!'
        })
        const settingMessage = await this.__showSettingMenu()
        // await this.log.push(['__switchSetting', settingMessage])
        return [...missSelectMessage, ...settingMessage]
      }
      default: {
        const missSelectMessage: Array<MessagesType> = []
        missSelectMessage.push({
          type: 'text',
          text: '無効な入力です。1~4の数字で選択してください。'
        })
        const settingMessage = await this.__showSettingMenu()
        // await this.log.push(['__switchSetting', settingMessage])
        return [...missSelectMessage, ...settingMessage]
      }
    }

    gas.setStatus(StatusType.default, userId)
    const newSetting = gas.getSetting(userId)
    return [{
      type: 'text',
      text: '通知設定を変更しました！'
    }, {
      type: 'text',
      text:  '現在の通知設定です。\n\n' + newSetting
    }]
  }
}
