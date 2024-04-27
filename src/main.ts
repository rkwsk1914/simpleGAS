import { MY_ACCOUNT_ID } from '@/const/settings'

import { GASController } from '@/app/GASController'
import { LineApp } from '@/app/LineApp'

const LineApplication = new LineApp()
const gas = new GASController()

global.test = () => {
  gas.getThisMonthData()
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
