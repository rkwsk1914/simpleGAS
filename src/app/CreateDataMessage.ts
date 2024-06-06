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

収入: ${data.income}
支出: ${data.pay}
貯蓄: ${data.savings}
------------------------
利益: ${data.profit}
残高: ${data.balance}

貯蓄
------------------------
SBI貯蓄: ${data.savingDetail.savings}
ウィーン: ${data.savingDetail.savingsVienna}

月末引き落とし
------------------------
町田UFJ: ${data.debit.machida}
横浜UFJ: ${data.debit.yokohama}
ゆうちょ: ${data.debit.yucho}
SBI: ${data.debit.sbi}
------------------------

クレジット
------------------------
楽天: ${data.card.raluten}
ライフカード: ${data.card.life}
アプラス: ${data.card.aplus}
au: ${data.card.au}
------------------------

詳細
------------------------
${data.detail.map(item => `${item.name}: ${item.value}`).join('\n')}
------------------------
`
    }
  }

  pay (data: CalDataType): MessagesType {
    return {
      type: 'text',
      text: `${data.month}

残高: ${data.balance}

収入: ${data.income}
支出: ${data.pay}
貯蓄: ${data.savings}
------------------------
利益: ${data.profit}

貯蓄
------------------------
SBI貯蓄: ${data.savingDetail.savings}
ウィーン: ${data.savingDetail.savingsVienna}
`
    }
  }

  card (data: CalDataType): MessagesType {
    return {
      type: 'text',
      text: `${data.month}\n\n楽天: ${data.card.raluten}\nライフ: ${data.card.life}\nアプラス: ${data.card.aplus}\nau: ${data.card.au}\n`
    }
  }

  debit (data: CalDataType): MessagesType {
    return {
      type: 'text',
      text: `${data.month}\n\n町田UFJ: ${data.debit.machida}\n横浜UFJ ${data.debit.yokohama}\nゆうちょ: ${data.debit.yucho}\nSBI: ${data.debit.sbi}`
    }
  }
}
