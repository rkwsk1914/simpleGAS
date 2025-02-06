import { GEMINI_API_KEY } from '@/const/settings'
import { FetchFunction } from '@/app/common/fetch'
import { Log } from '@/app/common/Log'
import { GetSchedulePrompt } from './const/prompt'

export type resMTGData = {
  title: string
  location: string
  deadline: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  allDayEvent: string
  description: string
  isCreateNode: string
  locationFee: string
  zoomFee: string
}

export class Gemini {
  private urlData: Record<string, string>
  private log: Log
  private fetchFunction: FetchFunction
  private HEADERS: {
    'Content-Type': string
  }

  constructor () {
    this.urlData = {
      pro: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      flash15: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      flash20: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`
    }

    this.log = new Log('Gemini')
    this.fetchFunction = new FetchFunction()

    this.HEADERS = {
      'Content-Type': 'application/json;',
    }
  }

  public async doAsk(text: string) {
    const payload = JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text }],
        },
      ],
    })

    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'post',
      contentType: 'application/json',
      headers: this.HEADERS,
      payload,
      muteHttpExceptions: true,
    }

    this.fetchFunction.doPost({ url: this.urlData.flash20, options })
  }

  public async doAskSchedule(message: string): Promise<Array<resMTGData> | undefined> {
    const currentYear = new Date().getFullYear()
    const text =
      `今年は${currentYear}年です。\n` +
      message +
      '\n\n' +
      GetSchedulePrompt

    const payload = JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text }],
        },
      ],
    })

    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'post',
      contentType: 'application/json',
      headers: this.HEADERS,
      payload,
      muteHttpExceptions: true,
    }

    const res = await this.fetchFunction.doPost({ url: this.urlData.flash20, options })
    if (!res) return []
    const data = res.candidates[0].content.parts[0].text
    // コードブロック (```json ... ```) を削除
    const cleanedText = data.replace(/```json\n|\n```/g, '')

    try {
      const mtgData = JSON.parse(cleanedText) as resMTGData[]
      return mtgData
    } catch (e) {
      // await this.log.push(['' ,'error', JSON.stringify(e)])
    }
  }
}
