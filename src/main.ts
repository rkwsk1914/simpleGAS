import { MY_ACCOUNT_ID } from '@/const/settings'

import { LineApp } from '@/app/LineApp'
import { Log } from '@/app/common/Log'

declare const global: {
  doTest: () => Promise<void>;
  doPost: (_e: GoogleAppsScript.Events.DoPost) => Promise<void>;
}

const LineApplication = new LineApp()
const log = new Log('MAIN')

global.doTest = async () => {
  log.push(['process.env.NODE_ENV',process.env.NODE_ENV])
}

global.doPost = async (e: GoogleAppsScript.Events.DoPost) => {
  log.push([e])

  if (!MY_ACCOUNT_ID) return

  LineApplication.post(MY_ACCOUNT_ID, [{  type: 'text', text: 'Hello' }])
}
