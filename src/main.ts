import { LineApp } from './app/LineApp'
// import { Event } from './app/event.js'
import { GASController } from './app/GASController'

const LineApplication = new LineApp()

global.test = () => {
  const SCM = new GASController()
  const doDO = (message) => {
    LineApplication.post(
      process.env.MY_ACCOUNT_ID,
      [
        SCM.setGASApplyEvent({
          name: 'kawawaski',
          userId: process.env.MY_ACCOUNT_ID,
          rowIndex: 7,
          state: 'apply'
        }, message)
      ]
    )
  }
  doDO('1, 2')
  // doDO('0')
  // doDO('1, 6')
  // doDO('a')
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
