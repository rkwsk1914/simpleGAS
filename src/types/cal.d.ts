export type CalDataType = {
  month: string
  // 収入
  income: string
  // 支出
  pay: string
  // 今月の貯蓄
  savings: string
  // 残高
  balance: string
  // 利益
  profit: string
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
  // 貯蓄
  savingDetail: {
    // 今月の貯蓄
    savings: string
    // ウィーン
    savingsVienna: string
  }
  // クレジットカード
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
  // 詳細
  detail?: Array<{
    name: string,
    value: string
  }>,
}
