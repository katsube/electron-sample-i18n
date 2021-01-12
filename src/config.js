const Store = require('electron-store')
const store = new Store()

const Config = {
  locale: store.get('locale')
};

//--------------------------------
// exports
//--------------------------------
module.exports = {
  get: (key)=>{
    if( key in Config ){
      return( Config[key] )
    }
    return(undefined)
  },
  set: (key, value)=>{
    Config[key] = value
    store.set(key, value)
  }
}
