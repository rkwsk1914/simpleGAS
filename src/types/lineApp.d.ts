export type MessagesType = {
  type: 'text',
  text: string
}

export type UserStateType = 'apply'
  | ''
  | 'before apply detail'
  | 'schedule'
  | 'my schedule'
  | 'my Pay'

export type UserDataType = {
  userId: string
  name: string
  state: UserStateType
  rowIndex: number
}
