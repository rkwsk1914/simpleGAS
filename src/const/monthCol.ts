import * as HEAD from '@/const/Header'

const stringRange = (index: number):string => {
  return `${HEAD.COL_LIST[index]}:${HEAD.COL_LIST[index + 2]}`
}

export const MONTH_COL: Record<number, string> = {
  4: stringRange(HEAD.ARRAY_COL_AG),
  5: stringRange(HEAD.ARRAY_COL_AJ),
  6: stringRange(HEAD.ARRAY_COL_C),
  7: stringRange(HEAD.ARRAY_COL_F),
  8: stringRange(HEAD.ARRAY_COL_I),
  9: stringRange(HEAD.ARRAY_COL_L),
  10: stringRange(HEAD.ARRAY_COL_O),
  11: stringRange(HEAD.ARRAY_COL_R),
  12: stringRange(HEAD.ARRAY_COL_U),
  1: stringRange(HEAD.ARRAY_COL_X),
  2: stringRange(HEAD.ARRAY_COL_AA),
  3: stringRange(HEAD.ARRAY_COL_AD)
}
