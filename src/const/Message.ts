import type { MessagesType } from '@/types/lineApp'

export const MESSAGE: Record<string, MessagesType> = {
  successAddPay: {
    type: 'text',
    text: '支出に追加しました。'
  },
  failedAddPay: {
    type: 'text',
    text: '支出の追加に失敗しました。\n数字で入力ください。'
  }
}
