import { MY_ACCOUNT_ID } from '@/const/settings'

// import { GASController } from '@/app/GASController'
import { LineApp } from '@/app/LineApp'

declare const global: any

const LineApplication = new LineApp()
// const gas = new GASController()

global.doPost = (e: GoogleAppsScript.Events.DoPost) => {
  LineApplication.checkMessageAndPost(e)
}

global.doPostMessages = () => {
  LineApplication.post(MY_ACCOUNT_ID ?? '', [{
    type: 'text',
    text: 'GASからLINEに送信'
  }])
}
