/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MY_ACCOUNT_ID } from '@/const/settings'

// import { GASController } from '@/app/GASController'
import { LineApp } from '@/app/LineApp'

const LineApplication = new LineApp()
// const gas = new GASController()

function doPost(e: GoogleAppsScript.Events.DoPost) {
  LineApplication.checkMessageAndPost(e)
}

function doPostMessages() {
  LineApplication.post(MY_ACCOUNT_ID ?? '', [{
    type: 'text',
    text: 'GASからLINEに送信'
  }])
}
