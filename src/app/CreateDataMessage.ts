import { Log } from '@/app/common/Log'

import type { CalDataType } from '@/types/cal'
import type { MessagesType } from '@/types/lineApp'

export class CreateDataMessage {
  log: Log

  constructor () {
    this.log = new Log('CreateDataMessage')
  }

  detail (data: CalDataType): MessagesType {
    return {
      type: 'text',
      text: `${data.lifePay}`
    }
  }

  pay (data: CalDataType): MessagesType {
    return {
      type: 'text',
      text: `生活費: ${data.lifePay}\n支出: ${data.pay}\n発生: ${data.detail.other}`
    }
  }

  card (data: CalDataType): MessagesType {
    return {
      type: 'text',
      text: `楽天: ${data.detail.card.raluten}\nライフ: ${data.detail.card.life}\nアプラス: ${data.detail.card.aplus}\nau: ${data.detail.card.au}\n`
    }
  }

  debit (data: CalDataType): MessagesType {
    return {
      type: 'text',
      text: `町田UFJ: ${data.debit.machida}\n横浜UFJ ${data.debit.yokohama}\nゆうちょ: ${data.debit.yucho}\nSBI: ${data.debit.sbi}`
    }
  }
}
