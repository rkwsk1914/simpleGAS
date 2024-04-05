import { LineApp } from './app/LineApp'
// import { Event } from './app/event.js'
import { GASController } from './app/GASController'

const LineApplication = new LineApp()

global.test = () => {
  const SCM = new GASController()
  LineApplication.post(process.env.MY_ACCOUNT_ID, [SCM.getGASSchedule()])
  LineApplication.post(process.env.MY_ACCOUNT_ID, [SCM.getGASEventList()])
  LineApplication.post(process.env.MY_ACCOUNT_ID, [SCM.getGASEventDetail('1')])
  LineApplication.post(process.env.MY_ACCOUNT_ID, [SCM.getGASEventDetail('(6)')])
  LineApplication.post(process.env.MY_ACCOUNT_ID, [SCM.getGASEventDetail('1, 2')])
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
