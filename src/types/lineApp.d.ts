export type MessagesType = {
  type: 'text',
  text: string
}

export type UserStateType = 'apply' | '' | 'before apply detail' | 'schedule' | 'in schedule detail'

export type UserDataType = {
  userId: string
  name: string
  state: UserStateType
  rowIndex: number
}
