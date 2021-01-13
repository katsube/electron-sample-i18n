/**
 * ダイアログ関連
 *
 */

//--------------------------------
// モジュール
//--------------------------------
const { app, dialog } = require('electron')
const config = require('./config')
const i18n = require('./i18n')

//--------------------------------
// グローバル変数
//--------------------------------
const locale = config.get('locale')       // 「言語」の設定情報を取得
const _ = new i18n(locale, 'dialog')      // ダイアログ用のテキスト情報をロード

/**
 * 「今すぐ再起動しますか」ダイアログ
 *
 * @param {object} win
 */
const reboot = function(win){
  const dialogOpts = {
    type: 'info',
    buttons: [_.t('BUTTON-REBOOT'), _.t('BUTTON-LATER')],
    message: _.t('REBOOT_CONFIRM_TITLE'),
    detail: _.t('REBOOT_CONFIRM_DETAIL')
  }

  // すぐに再起動するか確認
  dialog.showMessageBox(win, dialogOpts).then((returnValue) => {
    if (returnValue.response === 0){
      app.relaunch()    // 再起動の準備
      app.exit(0)       // アプリ終了
    }
  })
}

//--------------------------------
// exports
//--------------------------------
module.exports = {
  reboot: reboot
}