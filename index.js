const { app, BrowserWindow, ipcMain } = require('electron')
const menu = require('./src/menu')
const config = require('./src/config')
const dialog = require('./src/dialog')

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
  const locale = config.get('locale') || app.getLocale();

  // メニューを適用する
  menu.setTemplate(locale)

  createWindow()
})


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

ipcMain.handle('getConfig', async (event, data) => {
  return( config.get(data) )
});

ipcMain.handle('setLocale', async (event, data) => {
  config.set('locale', data)
  dialog.reboot(mainWin)
});
