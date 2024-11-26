import { MY_ACCOUNT_ID } from '@/const/settings'

import { GASController } from '@/app/GASController'
import { LineApp } from '@/app/LineApp'
import { CreateDataMessage } from '@/app/CreateDataMessage'

declare const global: any

const LineApplication = new LineApp()
const gas = new GASController()
const CreateMessage = new CreateDataMessage()

global.doTest = () => {
  const message2 = CreateMessage.pushMtgInfo('2024/11/28')
  LineApplication.post(MY_ACCOUNT_ID ?? '', message2)
}

global.doPost = async (e: GoogleAppsScript.Events.DoPost) => {
  LineApplication.getMessage(e)
  const user = await LineApplication.getUserDataFromMessage(e)
  gas.setNewMember(user)
}

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
