import { MY_ACCOUNT_ID } from '@/const/settings'

import { LineApp } from '@/app/LineApp'

const LineApplication = new LineApp()

global.doPost = (e) => {
  LineApplication.checkMessageAndPost(e)
}

global.doPostMessages = () => {
  LineApplication.post(MY_ACCOUNT_ID, [{
    type: 'text',
    text: 'LINE APP GASから返信 POST'
  }])
}
