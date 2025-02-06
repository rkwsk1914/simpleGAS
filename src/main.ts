// import { MY_ACCOUNT_ID } from '@/const/settings'

import { GASController } from '@/app/GASController'
import { LineApp } from '@/app/LineApp'
import { CreateDataMessage } from '@/app/CreateDataMessage'
import { SwitchPOSTMessage } from '@/app/SwitchPOSTMessage'
import { Log } from '@/app/common/Log'
import { Gemini } from '@/app/Gemini'
// import { formatStringDay } from '@/utils/formatDay'

import { SelectMenu } from '@/types/selectMenu'

declare const global: {
  doTest: () => Promise<void>;
  doTest2: () => Promise<void>;
  doPost: (_e: GoogleAppsScript.Events.DoPost) => Promise<void>;
  doPostTodayDeadLineInfo: () => void;
  doPostScheduleInfo: (_targetIds?: string) => void;
  doPostSomeInformation: () => void;
}

const LineApplication = new LineApp()
const gas = new GASController()
const CreateMessage = new CreateDataMessage()
const SwitchPOSTMessageApp = new SwitchPOSTMessage()
const log = new Log('MAIN')
const gemini = new Gemini()


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
        if (user) doPostScheduleInfo(user.userId)
      }
    }
  })

global.doTest = async () => {
  await gemini.doAsk('今年は何年？日本語で答えて。')
  const message = `
2/27 Dpro岡田豊さん
現地希望〆切 2/20
（希望者多いため、1週間前に締め切ります）
  `
  await gemini.doAskSchedule(message)

  const message2 = `
2月クレッセントMTG
〆切前日20時まで

2/7  21:00〜QA
2/13  20:00〜プロダクツ
2/28  20:00〜月初
`
  await gemini.doAskSchedule(message2)


  const message3 = `
増田浩一2月mtgスケジュール

2/6木 19:30  OM
2/14金   19:30  LSC
2/17月 19:00  東京LSC
2/18火 20:00  G.P.HM
2/27木 19:30  dpro 岡田豊さん
`
  await gemini.doAskSchedule(message3)
}

global.doTest2 = async () => {
  const a = { 'queryString':'','contentLength':813,'contextPath':'','parameter':{},'parameters':{},'postData':{ 'contents':'{"destination":"U26206c113a4f7e9ad7256af3bee7aef7","events":[{"type":"message","message":{"type":"text","id":"546974579881935203","quoteToken":"cOHj8S8VN-NDsEvMN--lkQfgROm4tL40C1LFR81SVpBN5VIAQ6-EU-idnjhq2EwVmsstSbjXNwfXtHZ7j4a4f7XDwvYNd9vIzNGvB6U3HSmrejfNS2-QmDraU32FDj56L83T0JKYBUEK_0OIoLjN9Q","text":"増田浩一2月mtgスケジュール\\n\\n2/6木　19:30  OM\\n2/14金   19:30  LSC\\n2/17月　19:00  東京LSC\\n2/18火　20:00  GPHM\\n2/27木　19:30  dpro 岡田豊さん\\n3/19木　19:30  dpro 岡田豊さん\\n3/20木　19:30  dpro 岡田豊さん"},"webhookEventId":"01JKDVZBGQEP4RJ6KH8Z9ZTMDN","deliveryContext":{"isRedelivery":false},"timestamp":1738853559412,"source":{"type":"group","groupId":"Cb6751db3e6cd4aec4f07adbf3b47fbbd","userId":"U89dd802fd5ef0ac87000b53d20344672"},"replyToken":"6196b7e7f3ea4402affc2d0a48cead66","mode":"active"}]}','length':813,'name':'postData','type':'application/json' } }
  // const e = JSON.parse(a) as GoogleAppsScript.Events.DoPost
  checkMessage(a as GoogleAppsScript.Events.DoPost)

}

global.doPost = async (e: GoogleAppsScript.Events.DoPost) => {
  await log.push([e])

  const res = await checkMessage(e)
  if (!res) return

  const { message, userId } = res
  if (!message || !userId) return
  await log.push(['doPost', res])
  LineApplication.post(userId, message)
}


/*
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

  log.push(['doPostDeadLineInfo', message, ids])
  if (!ids || ids?.length === 0) return

  LineApplication.multicast(ids, message)
}
*/

/**
 * 毎日、今日〆切を通知
 * @returns
 */
global.doPostTodayDeadLineInfo = async () => {
  const message = await CreateMessage.pushTodayDeadlineInfo(
    // formatStringDay({ targetDay: '2025/3/9' })
  )
  if (!message || message.length < 1) return

  const ids = await gas.getUserIds({
    // filterSetting: SelectMenu.todayDeadline
    filterSetting: SelectMenu.ABO
  })

  await log.push(['doPostTodayDeadLineInfo', message, ids])
  if (!ids || ids?.length === 0) return

  LineApplication.multicast(ids, message)
}

/**
 * スケジュールLINE通知
 * @returns
 */
const doPostScheduleInfo = async (targetIds?: string) => {
  const message = CreateMessage.pushSchedule()
  const ids = await gas.getUserIds({
    filterSetting: SelectMenu.ABO
  })

  log.push(['doPostScheduleInfo', message, ids])
  if (!ids || ids?.length === 0) return

  if (targetIds) {
    LineApplication.multicast(targetIds.split(','), message)
    return
  }

  LineApplication.multicast(ids, message)
}
global.doPostScheduleInfo = (targetIds?: string) => doPostScheduleInfo(targetIds)

global.doPostSomeInformation = async () => {
  const data = CreateMessage.pushDeliveryMessage()

  log.push(['doPostSomeInformation', data])

  if (data.message.length === 0) return
  if (data.target === '') return

  const ids = await gas.getUserIds({
    filterSetting: data.target
  })

  if (!ids || ids?.length === 0) return

  LineApplication.multicast(ids, data.message)
}

/*
global.doPostGroupLineMTGInfo = async () => {
  const ids = gas.getGroupIds()

  if (!ids || ids?.length === 0) return

  const message = CreateMessage.pushTodayDeadlineInfo()
  if (!message) return

  for (const groupId of ids) {
    try {
      LineApplication.post(groupId, message)
    } catch (error) {
      log.push(['送信失敗'])
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
      log.push(['送信失敗'])
    }
  }
}
*/