import * as HEAD from '@/const/Header'

const stringRange = (index: number):string => {
  return `${HEAD.COL_LIST[index]}:${HEAD.COL_LIST[index + 1]}`
}

export const MONTH_COL: Record<number, string> = {
  4: stringRange(1),
  5: stringRange(3),
  6: stringRange(5),
  7: stringRange(7),
  8: stringRange(9),
  9: stringRange(11),
  10: stringRange(13),
  11: stringRange(15),
  12: stringRange(17),
  1: stringRange(19),
  2: stringRange(21),
  3: stringRange(23)
}
