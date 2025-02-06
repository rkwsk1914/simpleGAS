import { CHANNEL_ACCESS_TOKEN } from '@/const/settings'

import { FetchFunction } from '@/app/common/fetch'
import { Log } from '@/app/common/Log'
import { CreateDataMessage } from '@/app/CreateDataMessage'

import type { MessagesType, UserDataType, GroupDataType } from '@/types/lineApp'

export class LineApp {
  urlData: Record<string, string>
  log: Log
  fetchFunction: FetchFunction
  createMessage :CreateDataMessage
  HEADERS: {
    'Content-Type': string
    Authorization: string
  }

  constructor () {
    this.urlData = {
      reply: 'https://api.line.me/v2/bot/message/reply',
      multicast: 'https://api.line.me/v2/bot/message/multicast',
      push: 'https://api.line.me/v2/bot/message/push',
      profile: 'https://api.line.me/v2/bot/profile/',
      group: 'https://api.line.me/v2/bot/group/'
    }

    this.log = new Log('LineApp')
    this.fetchFunction = new FetchFunction()
    this.createMessage = new CreateDataMessage()

    this.HEADERS = {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + CHANNEL_ACCESS_TOKEN
    }
  }

  private __checkMessagesUndefined (messages: Array<MessagesType>): boolean {
    for (let index = 0; index < messages.length; index++) {
      if (messages[index] === undefined) return true
    }
    return false
  }

  private async __getUserData (userId: string): Promise<UserDataType | undefined> {
    if (!userId) return undefined

    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'get',
      headers: this.HEADERS
    }
    const url = this.urlData.profile + '/' + userId
    const res = await this.fetchFunction.doGet({ url, options })

    if (!res.userId) return undefined

    return {
      userId: res.userId,
      name: res.displayName
    }
  }

  private async __getGroupData (groupId: string): Promise<GroupDataType | undefined> {
    if (!groupId) return undefined

    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'get',
      headers: this.HEADERS
    }
    const url = this.urlData.group + '/' + groupId + '/summary'
    const res = await this.fetchFunction.doGet({ url, options })

    if (!res.groupId) return undefined

    return {
      groupId: res.groupId,
      groupName: res.groupName
    }
  }

  public getMessage (e: GoogleAppsScript.Events.DoPost) {
    const data = JSON.parse(e.postData.contents)
    const event = data.events[0]

    if (event.message.type !== 'text') return
    if (!event.source.userId) return

    return event.message.text
  }

  public async getUserDataFromFollow (e: GoogleAppsScript.Events.DoPost): Promise<UserDataType | undefined> {
    const data = JSON.parse(e.postData.contents)
    const event = data.events[0]

    await this.log.push(['フォローされました', {
      data
    }])

    if (event.type !== 'follow') return

    const userId = event.source.userId
    if (!userId) return

    const userData = await this.__getUserData(userId)

    await this.log.push([{ userData }])

    return userData
  }

  public async getUserDataFromMessage (e: GoogleAppsScript.Events.DoPost): Promise<UserDataType | undefined> {
    const data = JSON.parse(e.postData.contents)
    const event = data.events[0]

    await this.log.push(['LINEからメッセージ', { data }, event])

    if (event.message.type !== 'text') return

    const userId = event.source.userId
    if (!userId) return

    // await this.log.push([{ userId }])

    const userData = await this.__getUserData(userId)

    // await this.log.push([{ userData }])

    return userData
  }

  public async getGroupData (e: GoogleAppsScript.Events.DoPost): Promise<GroupDataType | undefined> {
    const data = JSON.parse(e.postData.contents)
    const event = data.events[0]

    await this.log.push(['グループLINEに招待された', { data }])

    if (!event.source && event.source.type !== 'group') return

    const groupId = event.source.groupId
    if (!groupId) return

    await this.log.push([{ groupId }])

    const group = await this.__getGroupData(groupId)

    return group
  }

  public reply (e: GoogleAppsScript.Events.DoPost, messages: Array<MessagesType>) {
    if (this.__checkMessagesUndefined(messages)) return

    const data = JSON.parse(e.postData.contents)
    const event = data.events[0]

    const postData = {
      replyToken: event.replyToken,
      messages
    }
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'post',
      headers: this.HEADERS,
      payload: JSON.stringify(postData)
    }

    this.fetchFunction.doPost({ url: this.urlData.reply, options })
  }

  public post (toId: string, messages: Array<MessagesType>) {
    if (this.__checkMessagesUndefined(messages)) return

    const postData = {
      to: toId,
      messages
    }

    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'post',
      headers: this.HEADERS,
      payload: JSON.stringify(postData)
    }

    this.fetchFunction.doPost({ url: this.urlData.push, options })
  }

  public multicast (toIds: Array<string>, messages: Array<MessagesType>) {
    if (toIds.length === 0) return
    if (this.__checkMessagesUndefined(messages)) return

    const postData = {
      to: toIds,
      messages
    }

    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'post',
      headers: this.HEADERS,
      payload: JSON.stringify(postData)
    }

    this.fetchFunction.doPost({ url: this.urlData.multicast, options })
  }
}
