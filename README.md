# Electron Sample - i18n
言語設定を行うサンプルです。ボタンを押すと英語と日本語を切り替えることができます。（設定は次回起動時も引き継がれます）
## 解説ページ
* []()

## 準備
Gitでリポジトリを取得します。
```shellsession
$ git clone https://github.com/katsube/electron-sample-i18n.git
```

Node.jsがインストールされている環境で以下のコマンドを実行し、必要なライブラリを取得します。
```shellsession
$ cd electron-sample-i18n
$ npm install
```

## 実行方法
以下でプレビューを行います。
```shellsession
$ npm start
```

ビルドは以下の通り。各OS用のインストーラーが作成されます。
```shellsession
$ npm run build-win
$ npm run build-mac
```
