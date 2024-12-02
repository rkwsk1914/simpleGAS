import { MESSAGE } from '@/const/Message'
import { Log } from '@/app/common/Log'

import type { MessagesType, MessageReplyCallBackType } from '@/types/lineApp'

export class SwitchPOSTMessage {
  log: Log

  constructor () {
    this.log = new Log('LineApp')
  }

  private __switchMessage ({
    text,
    callBack,
  }: {
    text: string,
    callBack?: MessageReplyCallBackType
  }): Array<MessagesType> {

    switch (text) {
      case 'メニュー': {
        if (callBack && callBack.menu) callBack.menu()
        return [{
          type: 'text',
          text: '以下のメッセージをしてください。\nメニュー1\nメニュー2\nメニュー3'
        }]
      }

      default: {
        if (callBack && callBack.default) callBack.default()
        const array = text.split('\n')
        const number = Number(array[0])

        if (!isNaN(number)) {
          return [MESSAGE.successAddPay]
        }

        return [MESSAGE.failedAddPay]
      }
    }
  }

  public async checkMessageAndPost ({
    e,
    callBack
  } : {
    e: GoogleAppsScript.Events.DoPost,
    callBack?: {
      message?: () => Promise<void>,
      join?: () => Promise<void>,
      leave?: () => Promise<void>,
    }
  }) {
    const data = JSON.parse(e.postData.contents)
    const event = data.events[0]

    this.log.push([event])

    switch (event.type) {
      case 'message':
        this.__switchMessage({
          text: event.message.text,
          callBack: {
            menu: null,
            default: callBack?.message ?? null
          }
        })
        return
      case 'join':
        if(callBack?.join) callBack.join()
        return
      default:
        return
    }
  }
}
