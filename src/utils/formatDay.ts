import { format, isValid, parseISO } from 'date-fns'

const DEFAULT_FORMAT_STR = 'yyyy/M/d'

/**
 * 文字列の日付をフォーマットする
 * @param targetDay - ISO形式の文字列またはDateオブジェクト
 * @param formatStr - フォーマット文字列
 */
export const formatStringDay = ({
  targetDay,
  formatStr = DEFAULT_FORMAT_STR,
}: {
  targetDay?: string | Date;
  formatStr?: string;
}): string | undefined => {
  // targetDay が未定義の場合は現在の日付を使用
  if (!targetDay) return format(new Date(), formatStr)

  // targetDay が文字列の場合は ISO 形式として解析
  let parsedDate: Date
  if (typeof targetDay === 'string') {
    parsedDate = parseISO(targetDay) // ISO形式として解析
    if (!isValid(parsedDate)) {
      // ISO形式が無効ならスラッシュ形式でDateを生成
      parsedDate = new Date(targetDay)
    }
    if (!isValid(parsedDate)) return undefined // 無効な文字列ならundefinedを返す
  } else if (targetDay instanceof Date) {
    parsedDate = targetDay // すでにDateオブジェクトならそのまま使用
  } else {
    return undefined // その他の型は無効
  }

  return format(parsedDate, formatStr)
}

/**
 * 任意の日付をフォーマットする
 * @param targetDay - 文字列またはDateオブジェクト
 * @param formatStr - フォーマット文字列
 */
export const formatYyyyMmDd = ({
  targetDay,
  formatStr = DEFAULT_FORMAT_STR,
}: {
  targetDay?: string | Date;
  formatStr?: string;
}): string | undefined => {
  if (!targetDay) return undefined

  let dateToFormat: Date

  if (typeof targetDay === 'string') {
    dateToFormat = parseISO(targetDay) // 文字列をDateに変換
    if (!isValid(dateToFormat)) return undefined // 無効な日付の場合はundefined
  } else if (targetDay instanceof Date) {
    dateToFormat = targetDay
  } else {
    return undefined
  }

  return format(dateToFormat, formatStr)
}