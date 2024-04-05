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
  }
}

export const INFO_MESSAGE: Record<string, MessagesType> = {
  default: {
    type: 'text',
    text: '参加するなら「参加申込」ってメッセージして！'
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
  }
}
