import { LineApp } from './app/LineApp'
// import { Event } from './app/event.js'

const LineApplication = new LineApp()

global.doPost = (e) => {
  LineApplication.reply(e, [{
    type: 'text',
    text: 'LINE APP GASから返信'
  }])
}

global.doPostMessages = () => {
  LineApplication.post('Ua20dc44c3f92c4475da1e28de064512a', [{
    type: 'text',
    text: 'LINE APP GASから返信 POST'
  }])
}
