export type MessagesType = {
  type: 'text',
  text: string
}

export type UserDataType = {
  userId: string
  name: string
}

type callBackType = (() => void) | (() => Promise<void>)
export type MessageReplyCallBackType = {
  default: callBackType | null;
  menu: callBackType | null;
} | Record<string, callBackType>;