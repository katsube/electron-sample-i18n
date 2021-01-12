const { app, dialog } = require('electron');
const config = require('./config')
const i18n = require('./i18n')

//--------------------------------
// exports
//--------------------------------
module.exports = {
  reboot: function(win){
    const locale = config.get('locale');
    const _ = new i18n(locale, 'dialog')
    const dialogOpts = {
      type: 'info',
      buttons: [_.t('BUTTON-REBOOT'), _.t('BUTTON-LATER')],
      message: _.t('REBOOT_CONFIRM_TITLE'),
      detail: _.t('REBOOT_CONFIRM_DETAIL')
    }

    // ダイアログを表示しすぐに再起動するか確認
    dialog.showMessageBox(win, dialogOpts).then((returnValue) => {
      if (returnValue.response === 0){
        app.relaunch()
        app.exit(0)
      }
    })
  }
};