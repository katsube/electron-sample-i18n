/**
 * ユーザー設定
 *
 */

//--------------------------------
// モジュール
//--------------------------------
const Store = require('electron-store')
const store = new Store({
  schema:{
    locale:{
      type: 'string',
      minLength: 2,
      maxLength: 6
    }
  }
})

//--------------------------------
// グローバル変数
//--------------------------------
const Config = {
  locale: store.get('locale')
}

/**
 * 設定情報を返却
 *
 * @param {string} key
 * @return {any|undefined}
 */
const get = (key) =>{
  if( key in Config ){
    return( Config[key] )
  }
  return(undefined)
}

/**
 * 設定情報を記録
 *
 * @param {string} key
 * @param {any} value
 * @return {boolean}
 */
const set = ((key, value)=>{
  if(typeof key !== 'string'){
    return(false)
  }

  try{
    store.set(key, value)
    Config[key] = value
    return(true)
  }
  catch(e){
    return(false)
  }
})

//--------------------------------
// exports
//--------------------------------
module.exports = {
  get: get,
  set: set
}
