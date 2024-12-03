import { MY_ACCOUNT_ID } from '@/const/settings'

import { GASController } from '@/app/GASController'
import { LineApp } from '@/app/LineApp'
import { CreateDataMessage } from '@/app/CreateDataMessage'
import { SwitchPOSTMessage } from '@/app/SwitchPOSTMessage'
import { Log } from '@/app/common/Log'

import { SelectMenu } from '@/types/selectMenu'

declare const global: any

const LineApplication = new LineApp()
const gas = new GASController()
const CreateMessage = new CreateDataMessage()
const SwitchPOSTMessageApp = new SwitchPOSTMessage()
const log = new Log('MAIN')

const checkMessage = async(e: GoogleAppsScript.Events.DoPost) =>
  await SwitchPOSTMessageApp.checkMessageAndPost({
    e,
    callBack: {
      message: async () => {
        const user = await LineApplication.getUserDataFromMessage(e)
        gas.setNewMember(user)
      },
      join: async() => {
        const group = await LineApplication.getGroupData(e)
        if (group?.groupId) gas.setGroupData(group)
      },
      follow: async () => {
        const user = await LineApplication.getUserDataFromFollow(e)
        gas.setNewMember(user)
      }
    }
  })


global.doTest = async () => {
  const message = CreateMessage.pushMtgInfo('2024/10/15')
  if (message) LineApplication.post(MY_ACCOUNT_ID ?? '', message)

  const message2 = CreateMessage.pushTodayDeadlineInfo('2024/10/15')
  if (message2) LineApplication.post(MY_ACCOUNT_ID ?? '', message2)

  const message3 = CreateMessage.pushTodayDeadlineInfo('2024/12/27')
  if (message3) LineApplication.post(MY_ACCOUNT_ID ?? '', message3)

  /*
  const e: GoogleAppsScript.Events.DoPost = {
    parameter: {},
    postData: {
      contents: JSON.stringify({
        destination: 'U26206c113a4f7e9ad7256af3bee7aef7',
        events: [
          {
            type: 'join',
            webhookEventId: '01JE3EFZXD5VQFYSYQ3QXFZV4V',
            deliveryContext: { isRedelivery: false },
            timestamp: 1733135171338,
            source: {
              type: 'group',
              groupId: 'C5ec2381586548149b1f400d7da2c2703',
            },
            replyToken: 'e62bac80a92f4f0e86d885591be41909',
            mode: 'active',
          },
        ],
      }),
      length: 327,
      name: 'postData',
      type: 'application/json',
    },
    contextPath: '',
    contentLength: 327,
    parameters: {},
    queryString: '',
    pathInfo: '', // 必須プロパティを追加
  }
  */

  /*
  const e2: GoogleAppsScript.Events.DoPost = {
    postData: {
      contents: JSON.stringify({
        destination: 'U26206c113a4f7e9ad7256af3bee7aef7',
        events: [
          {
            type: 'message',
            message: {
              type: 'text',
              id: '537430427288731857',
              quoteToken: 'V8kqdxZMVKv-nPP5rfH_w8cKHBtd8LGzg3a1n554mP2UtFD4-xRXEEqvD0PeblX4db1ovk8rA3XyHFh9VoNO7vjyXfEI8UzrVa2LuBAy9deUf3_3Qk0jdY0L6M8A2SU6u8FEfTzcumXDQLm3A54jEw',
              text: 'MTG情報', // '〆切'
            },
            webhookEventId: '01JE4AR7JK4A2B36V6QK2DY2QM',
            deliveryContext: {
              isRedelivery: false,
            },
            timestamp: 1733164801112,
            source: {
              type: 'user',
              userId: 'U89dd802fd5ef0ac87000b53d20344672',
            },
            replyToken: '594f5e8acbdf4d2899bc465d7adc5e29',
            mode: 'active',
          },
        ],
      }),
      length: 562,
      name: 'postData',
      type: 'application/json',
    },
    parameter: {},
    queryString: '',
    contentLength: 562,
    contextPath: '',
    parameters: {},
    pathInfo: '', // 必須プロパティを追加
  }
  */

  // const message = await checkMessage(e2)
  // log.push([message])
}

global.doPost = async (e: GoogleAppsScript.Events.DoPost) => {
  log.push([e])

  const res = await checkMessage(e)
  if (!res) return

  const { message, userId } = res
  if (!message || !userId) return
  log.push([res])
  LineApplication.post(userId, message)
}

global.doPostMessages = () => {
  LineApplication.post(MY_ACCOUNT_ID ?? '', [{
    type: 'text',
    text: 'GASからLINEに送信'
  }])
}

global.doPostDeadLineInfo = () => {
  const message = CreateMessage.pushMtgInfo()
  const ids = gas.getUserIds({
    filterSetting: SelectMenu.deadline
  })

  log.push([message, ids])
  if (!ids || ids?.length === 0) return

  LineApplication.multicast(ids, message)
}

global.doPostTodayDeadLineInfo = () => {
  const message = CreateMessage.pushTodayDeadlineInfo()
  if (!message) return

  const ids = gas.getUserIds({
    filterSetting: SelectMenu.todayDeadline
  })

  log.push([message, ids])
  if (!ids || ids?.length === 0) return

  LineApplication.multicast(ids, message)
}

global.doPostScheduleInfo = () => {
  const message = CreateMessage.pushSchedule()
  const ids = gas.getUserIds({
    filterSetting: SelectMenu.schedule
  })

  log.push([message, ids])
  if (!ids || ids?.length === 0) return

  LineApplication.multicast(ids, message)
}

global.doPostGroupLineMTGInfo = async () => {
  const ids = gas.getGroupIds()

  if (!ids || ids?.length === 0) return

  const message = CreateMessage.pushTodayDeadlineInfo()
  if (!message) return

  for (const groupId of ids) {
    try {
      LineApplication.post(groupId, message)
    } catch (error) {
      // LineApplication.log.push['送信失敗']
    }
  }
}

global.doPostGroupLineScheduleInfo = async () => {
  const ids = gas.getGroupIds()

  if (!ids || ids?.length === 0) return

  const message = CreateMessage.pushSchedule()
  if (!message) return

  for (const groupId of ids) {
    try {
      LineApplication.post(groupId, message)
    } catch (error) {
      // LineApplication.log.push['送信失敗']
    }
  }
}
