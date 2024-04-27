import { MY_ACCOUNT_ID } from '@/const/settings'

import { LineApp } from '@/app/LineApp'
// import { Event } from '.@/app/event.js'
// import { GASController } from '@/app/GASController'

const LineApplication = new LineApp()

global.test = () => {
}

global.doPost = (e) => {
  LineApplication.checkMessageAndPost(e)
}

global.doPostMessages = () => {
  LineApplication.post(MY_ACCOUNT_ID, [{
    type: 'text',
    text: 'LINE APP GASから返信 POST'
  }])
}
