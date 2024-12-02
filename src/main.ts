import { MY_ACCOUNT_ID } from '@/const/settings'

import { GASController } from '@/app/GASController'
import { LineApp } from '@/app/LineApp'
import { CreateDataMessage } from '@/app/CreateDataMessage'

declare const global: any

const LineApplication = new LineApp()
const gas = new GASController()
const CreateMessage = new CreateDataMessage()

global.doTest = async () => {
  // const message2 = CreateMessage.pushMtgInfo('2024/11/28')
  // LineApplication.post(MY_ACCOUNT_ID ?? '', message2)


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

  await LineApplication.checkMessageAndPost({
    e,
    callBack: {
      message: async () => {
        console.log('IN message', e)
        LineApplication.getMessage(e)
        const user = await LineApplication.getUserDataFromMessage(e)
        gas.setNewMember(user)
      },
      join: async() => {
        console.log('IN join', e)
        const groupId = await LineApplication.getGroupDataFromMessage(e)
        console.log(groupId)
        if (groupId) gas.setGroupData(groupId)
      }
    }
  })
}

// global.doPost = async (e: GoogleAppsScript.Events.DoPost) => {}

global.doPostMessages = () => {
  LineApplication.post(MY_ACCOUNT_ID ?? '', [{
    type: 'text',
    text: 'GASからLINEに送信'
  }])
}

global.doPostMTGInfo = () => {
  const message = CreateMessage.pushMtgInfo()
  LineApplication.post(MY_ACCOUNT_ID ?? '', message)
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
