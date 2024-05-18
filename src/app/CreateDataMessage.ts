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
      text: `
${data.month}

生活費: ${data.lifePay}
支出: ${data.pay}
収入: ${data.income}
貯蓄: ${data.savings}
残高: ${data.balance}
総資産: ${data.assets}

月末引き落とし
------------------------
町田UFJ: ${data.debit.machida}
横浜UFJ: ${data.debit.yokohama}
ゆうちょ: ${data.debit.yucho}
SBI: ${data.debit.sbi}
------------------------

クレジット
------------------------
楽天: ${data.detail.card.raluten}
ライフカード: ${data.detail.card.life}
アプラス: ${data.detail.card.aplus}
au: ${data.detail.card.au}
------------------------

MTG代 ${data.detail.mtg}
ローン: ${data.detail.loan}
家賃: ${data.detail.home}
税金: ${data.detail.tax}
ご飯会: ${data.detail.appointment}
発生: ${data.detail.other}
      `
    }
  }

  pay (data: CalDataType): MessagesType {
    return {
      type: 'text',
      text: `${data.month}\n\n残高: ${data.balance}\n\n生活費: ${data.lifePay}\n支出: ${data.pay}\n発生: ${data.detail.other}`
    }
  }

  card (data: CalDataType): MessagesType {
    return {
      type: 'text',
      text: `${data.month}\n\n楽天: ${data.detail.card.raluten}\nライフ: ${data.detail.card.life}\nアプラス: ${data.detail.card.aplus}\nau: ${data.detail.card.au}\n`
    }
  }

  debit (data: CalDataType): MessagesType {
    return {
      type: 'text',
      text: `${data.month}\n\n町田UFJ: ${data.debit.machida}\n横浜UFJ ${data.debit.yokohama}\nゆうちょ: ${data.debit.yucho}\nSBI: ${data.debit.sbi}`
    }
  }
}
