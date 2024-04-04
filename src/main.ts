import { LineApp } from './app/LineApp'
// import { Event } from './app/event.js'
import { ScanMessage } from './app/ScanMessage'

const LineApplication = new LineApp()

global.test = () => {
  const SCM = new ScanMessage()
  LineApplication.post(process.env.MY_ACCOUNT_ID, [SCM.showSchedule()])
  LineApplication.post(process.env.MY_ACCOUNT_ID, [SCM.showList()])
  // LineApplication.post(process.env.MY_ACCOUNT_ID, SCM.showDetail(1))
  // LineApplication.post(process.env.MY_ACCOUNT_ID, SCM.showDetail(6))
  // SCM.addUerList(LineApplication.getUserData(process.env.MY_ACCOUNT_ID))
}

global.doPost = (e) => {
  LineApplication.checkMessageAndPost(e)
}

global.doPostMessages = () => {
  LineApplication.post(process.env.MY_ACCOUNT_ID, [{
    type: 'text',
    text: 'LINE APP GASから返信 POST'
  }])
}
