# 情報科学特別講義A

## デプロイ先

- https://sugitamotoki.github.io/se-special-lecture-a/

## システム

### ディレクトリ構成

```
src
├── index.html
├── main.ts
├── test_vm.ts # ブラウザを経由せずVMの動作確認をするファイル
└── vm/
    ├── index.ts
    ├── vm01/ # 第1回（2023/05/26）
    │   ├── index.ts
    │   └── postfix_calculator.ts # 後置式電卓
    └── vm02/ # 第2回（2023/06/09）
        ├── README.md
        ├── for.ts # ループをfor命令で実装したVM
        ├── index.ts
        ├── jump.ts # ループをjump命令で実装したVM
        └── loop_virtual_machine.ts # ループを実行するVMの抽象クラス
```

### READMEへのリンク

- [第1回](./src/vm/vm01/README.md)
- [第2回](./src/vm/vm02/README.md)

## 更新

### 5/26

- 仕様
  - 後置式（逆ポーランド記法）を入力すると計算結果が表示される
  - エンターを押すと、入力した式が履歴に追加される
