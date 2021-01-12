const { app, Menu } = require('electron');
const i18n = require('./i18n')

// 実行環境がmacOSならtrue
const isMac = (process.platform === 'darwin');  // 'darwin' === macOS

/**
 * メニュー用テンプレートを返却
 *
 * @param {string} lang 言語コード
 * @return {object} Menu
 */
const setTemplate = (lang='ja') => {
  const _ = new i18n(lang, 'menu');
  const template = Menu.buildFromTemplate([
    ...(isMac ? [{
        label: app.name,
        submenu: [
          {role:'about',      label: _.t('ABOUT') },
          {type:'separator'},
          {role:'services',   label: _.t('SERVICE')},
          {type:'separator'},
          {role:'hide',       label: _.t('HIDE')},
          {role:'hideothers', label: _.t('HIDEOTHERS')},
          {role:'unhide',     label: _.t('UNHIDE')},
          {type:'separator'},
          {role:'quit',       label: _.t('QUIT-MAC')}
        ]
      }] : []),
    {
      label: _.t('FILE'),
      submenu: [
        isMac ? {role:'close', label:_.t('CLOSE')} : {role:'quit', label:_.t('QUIT')}
      ]
    },
    {
      label: _.t('EDIT'),
      submenu: [
        {role:'undo',  label:_.t('UNDO')},
        {role:'redo',  label:_.t('REDO')},
        {type:'separator'},
        {role:'cut',   label:_.t('CUT')},
        {role:'copy',  label:_.t('COPY')},
        {role:'paste', label:_.t('PASTE')},
        ...(isMac ? [
            {role:'pasteAndMatchStyle', label:_.t('PASTEANDMATCHSTYLE')},
            {role:'delete',    label:_.t('DELETE')},
            {role:'selectAll', label:_.t('SELECTALL')},
            {type:'separator'},
            {
              label:_.t('SPEECH'),
              submenu: [
                {role:'startSpeaking', label:_.t('STARTSPEAKING')},
                {role:'stopSpeaking',  label:_.t('STOPSPEAKING')}
              ]
            }
          ] : [
            {role:'delete',    label:_.t('DELETE')},
            {type:'separator'},
            {role:'selectAll', label:_t('SELECTALL')}
          ])
       ]
    },
    {
      label: _.t('VIEW'),
      submenu: [
        {role:'reload',         label:_.t('RELOAD')},
        {role:'forceReload',    label:_.t('FORCERELOAD')},
        {role:'toggleDevTools', label:_.t('TOGGLEDEVTOOLS')},
        {type:'separator'},
        {role:'resetZoom',      label:_.t('RESETZOOM')},
        {role:'zoomIn',         label:_.t('ZOOMIN')},
        {role:'zoomOut',        label:_.t('ZOOMOUT')},
        {type:'separator'},
        {role:'togglefullscreen', label:_.t('TOGGLEFULLSCREEN')}
      ]
    },
    {
      label: _.t('WINDOW'),
      submenu: [
        {role:'minimize', label:_.t('MINIMIZE')},
        {role:'zoom',     label:_.t('ZOOM')},
        ...(isMac ? [
             {type:'separator'} ,
             {role:'front',  label:_.t('FRONT')},
             {type:'separator'},
             {role:'window', label:_.t('WINDOW')}
           ] : [
             {role:'close',  label:_.t('CLOSE')}
           ])
      ]
    },
    {
      label: _.t('HELP'),
      submenu: [
        {label: _.t('APPHELP')},    // ToDo
        ...(isMac ? [ ] : [
          {type:'separator'} ,
          {role:'about',  label: _.t('ABOUT') }
        ])
      ]
    }
  ]);

  Menu.setApplicationMenu(template);
}

//--------------------------------
// exports
//--------------------------------
module.exports = {
  setTemplate: setTemplate
};