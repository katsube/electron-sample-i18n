/**
 * 言語設定を行うサンプル
 *
 */

//------------------------------------
// モジュール
//------------------------------------
const { app, BrowserWindow, ipcMain } = require('electron')
const menu = require('./src/menu')
const config = require('./src/config')
const dialog = require('./src/dialog')

//------------------------------------
// グローバル変数
//------------------------------------
// ウィンドウ管理用
let mainWin;

/**
 * ウィンドウを作成する
 */
function createWindow () {
  // ウィンドウを新たに開く
  mainWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // ファイルを開く
  mainWin.loadFile('public/index.html')
}

// 初期化が終了したらウィンドウを新規に作成する
app.whenReady().then(()=>{
  // 言語設定を取得する
  const locale = config.get('locale') || app.getLocale();

  // メニューを適用する
  menu.setTemplate(locale)

// ウィンドウを開く
  createWindow()
})


//------------------------------------
// [app] イベント処理
//------------------------------------
// すべてのウィンドウが閉じられたときの処理
app.on('window-all-closed', () => {
  // macOS以外はアプリを終了する
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// アプリがアクティブになった時の処理
// (macOSはDocのアイコンがクリックされたとき）
app.on('activate', () => {
  // ウィンドウがすべて閉じられている場合は新しく開く
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

//----------------------------------------
// IPC通信
//----------------------------------------
// 設定情報を取得
ipcMain.handle('getConfig', async (event, data) => {
  return( config.get(data) )
});

// 言語設定を保存
ipcMain.handle('setLocale', async (event, data) => {
  config.set('locale', data)
  dialog.reboot(mainWin)      // 再起動する？
});
