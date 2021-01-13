/**
 * 翻訳クラス
 *
 */

//--------------------------------
// モジュール
//--------------------------------
const p = require('../package.json')

//--------------------------------
// exports
//--------------------------------
/**
 * i18nクラス
 *
 * @example
 *   const i18n = require('./i18n')
 *   const _ = new i18n('ja', 'page1')
 *   console.log( _.t('foo') );
 */
module.exports = class i18n{
  // デフォルト言語
  static DEFAULT_LANG = 'ja'

  /**
   * コンストラクタ
   *
   * @param {string} lang 言語CD
   * @param {string} ns   ネームスペース
   * @param {string} dir  言語ファイルがあるディレクトリ
   */
  constructor(lang=null, ns='default', dir='./locales'){
    if( lang === null ){
      lang = this.DEFAULT_LANG
    }

    this._lang = lang   // 言語
    this._ns   = ns     // ネームスペース
    this._dir  = dir    // 言語ファイルのディレクトリ
    this._dic  = null   // 翻訳データ入れ

    this.load()
  }

  /**
   * 言語ファイルを読み込む
   *
   * @return {boolean}
   */
  load(){
    const dir  = this._dir
    const lang = this._lang
    const ns   = this._ns

    try{
      this._dic = require(`${dir}/${lang}/${ns}.json`)
      return(true)
    }
    catch(e){
      return(false)
    }
  }

  /**
   * 指定言語のテキストを返却
   *
   * @param {string} key
   * @return {string|undefined}
   */
  t(key){
    if( key in this._dic ){
      let value = this._dic[key]
                          .replace('{{name}}', p.name);
      return( value )
    }
    return(undefined)
  }
}