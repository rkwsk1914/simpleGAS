export type CalDataType = {
  month: string
  // 生活費
  lifePay: string
  // 支出
  pay: string
  // 収入
  income: string
  // 残高
  balance: string
  // 総資産
  assets: string
  // 月末引き落とし
  debit: {
    // 町田UFJ
    machida: string,
    // 横浜UFJ
    yokohama: string,
    // ゆうちょ
    yucho: string,
    // SBI
    sbi: string,
  }
  // 詳細
  detail: {
    card: {
      // 楽天
      raluten: string,
      // ライフ
      life: string,
      // アプラス
      aplus: string,
      // au
      au: string,
    }
    // MTG
    mtg: string,
    // ローン
    loan: string,
    // 家賃
    home: string,
    // 税金
    tax: string,
    // 発生
    other: string,
  }
}
