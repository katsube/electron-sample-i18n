const p = require('../package.json');

module.exports = class i18n{
  constructor(lang='ja', ns='default', dir='./locales'){
    this._dir  = dir    // 言語ファイルのディレクトリ
    this._lang = lang   // 言語
    this._ns   = ns     // ネームスペース
    this._dic  = null   // 翻訳データ入れ

    this.load()
  }

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

  t(key){
    if( key in this._dic ){
      let value = this._dic[key]
                          .replace('{{name}}', p.name);
      return( value )
    }
    return(undefined)
  }
}