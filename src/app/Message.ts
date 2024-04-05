import type { MessagesType } from './../types/lineApp'

export const ERROR_MESSAGE: Record<string, MessagesType> = {
  notFindEventId: {
    type: 'text',
    text: 'notFindEventId: \nイベント番号が見つかりません'
  },
  undefinedEventId: {
    type: 'text',
    text: 'undefinedEventId: \nイベント番号が確認できません。'
  },
  pleaseOne: {
    type: 'text',
    text: 'pleaseOne: \n確認できるイベントは一つだけです。'
  },
  notFindUserId: {
    type: 'text',
    text: 'notFindUserId: \n申し込み失敗\nユーザーIDエラー'
  },
  missApplyMessage: {
    type: 'text',
    text: 'missApplyMessage: \n申し込み失敗\nメッセージが不正です。'
  },
  notFindSchedule: {
    type: 'text',
    text: 'notFindSchedule: \n予定はありません'
  }
}

export const WARN_MESSAGE: Record<string, MessagesType> = {
  notFindSchedule: {
    type: 'text',
    text: '予定はありません'
  },
  notYet: {
    type: 'text',
    text: 'アップデートをお待ちを。'
  },
  alreadyPay: {
    type: 'text',
    text: '参加費'
  }
}

export const MENU = {
  a: '参加申込',
  b: '支払い状況',
  c: 'スケジュール',
  d: 'もどる'
}

const menu = `
以下のメッセージか、アルファベットを送ると分かるよ！

a.参加申込
b.支払い状況
c.参加状況
d.スケジュール
e.もどる
f.キャンセル
`

export const INFO_MESSAGE: Record<string, MessagesType> = {
  default: {
    type: 'text',
    text: menu
  },
  telMeApplyEventId: {
    type: 'text',
    text: '参加したいイベントの番号を教えて！'
  },
  doYouWannaDetail: {
    type: 'text',
    text: '詳細が知りたければ「詳細」ってメッセージして！'
  },
  telMeDetailEventId: {
    type: 'text',
    text: '詳細が知りたいイベントの番号を教えて！'
  },
  doYouWannaBack: {
    type: 'text',
    text: '最初に戻りたければ「もどる」ってメッセージして'
  },
  doYouWannaSchedule: {
    type: 'text',
    text: 'もう一度スケジュールが知りたければ「スケジュール」or「リスト」ってメッセージして！'
  },
  backTop: {
    type: 'text',
    text: '最初にもどります。'
  }
}
