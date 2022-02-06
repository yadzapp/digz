// const Path = require('path')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

class Fallback {
  async getMods(state) {
    // const teste = 'hello'
    // return teste

    console.log('Fallback: checking for mods now...')
    // console.log('Fallback: checking for mods now...', 'state: ', state)

    // separate ip from port and adds up 10 to port
    const http = `http://${state.connect}`
    const serverIP = http.split('/')[2].split(':')[0]
    const serverPORTGAME = http.split('/')[2].split(':')[1]
    const serverPORTGAME10 = parseInt(serverPORTGAME) + 10

    // build URL
    const url = 'http://' + serverIP + ':' + serverPORTGAME10.toString()
    // console.log('url: ', url);

    // connection xhr request
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', xhrRequestListener)
    xhr.open('GET', url)
    xhr.send()

    // connection response
    function xhrRequestListener() {
      // response with name and ids
      // console.log('inside xhrRequestListener: ');
      const modsString = this.responseText
      // console.log('this: ', this);
      // console.log('mods: ', typeof (mods), mods);

      // console.log(typeof (this.responseText), typeof (this.response), this);
      // console.log(typeof (JSON.parse(this.response)), JSON.parse(this.response));

      const modsObject = JSON.parse(modsString)
      console.log('modsObject:', modsObject)
      return modsObject
      state.mods = modsObject
      // const modObjasArray = Object.entries(modObj)
      // console.log('modObjasArray: ', modObjasArray);

      // remove all text and leave only numbers
      //
      // BUG: has a bug, if name has a number
      //
      // const modsIds = mods.replace(/\D/g, ' ')
      // console.log('modsIds: ', modsIds);

      // transform into an array
      // let modsIdsArr = modsIds.split(' ')
      // console.log('modsIdsArr: ', modsIdsArr);

      // remove all white space
      // modsIdsArr = modsIdsArr.filter((el) => el)
      // console.log(`There are ${modsIdsArr.length} mods in this server.`)

      // check mod state with Steam
      // checkMods(modsIdsArr)
    }
  }
}

module.exports = Fallback
