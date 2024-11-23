import { Log } from '@/app/common/Log'

// import type { MessagesType } from '@/types/lineApp'

export class CreateDataMessage {
  log: Log

  constructor () {
    this.log = new Log('CreateDataMessage')
  }
}
