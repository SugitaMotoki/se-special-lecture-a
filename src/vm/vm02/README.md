# 第2回

2023/06/09

## 共通仕様

### 領域

- stack
  - スタック領域
  - number
- global
  - グローバル変数領域
  - Map<変数名, number>
- label
  - ラベル領域
  - Map<ラベル名, number>

### 命令

- `debug_show_stack`
  - スタックの内容を表示する
- `push <value>`
  - スタックに値を積む
- `pop`
  - スタックから値を取り出す
- `add`
  - スタックから2つの値を取り出し、それらを加算した結果をスタックに積む
- `sub`
  - スタックから2つの値を取り出し、それらを減算した結果をスタックに積む
- `mul`
  - スタックから2つの値を取り出し、それらを乗算した結果をスタックに積む
- `div`
  - スタックから2つの値を取り出し、それらを除算した結果をスタックに積む
- `mod`
  - スタックから2つの値を取り出し、それらを除算した余りをスタックに積む
- `equal`
  - スタックから2つの値を取り出し、それらが等しければ**1**を、そうでなければ**0**をスタックに積む
- `set_global <value>`
  - スタックから値を取り出し、`<value>`という名前のグローバル変数に代入する
- `get_global <value>`
  - `<value>`という名前のグローバル変数の値をスタックに積む
- `label <label>`
  - `<label>`という名前のラベルを定義する
- `jump <label>`
  - `<label>`という名前のラベルにジャンプする
- `jump_if <label>`
  - スタックから値を取り出し、それが**0**でなければ`<label>`という名前のラベルにジャンプする
- `jump_if_zero <label>`
  - スタックから値を取り出し、それが**0**なら`<label>`という名前のラベルにジャンプする
- `print`
  - スタックから値を取り出し、それを表示する
  - console.logではなく、VMからの戻り値として返す
- `//`
  - 行末までコメントとして扱う