// const Logger = require('./Logger')

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


    // fetch teste
    // fetch(url)
      // .then(function(response){console.log(response);})
      // .then()
    console.log('fetch: ', fetch(url));


    // connection xhr request
    const xhr = new XMLHttpRequest()
    // xhr.addEventListener('load', xhrRequestListener)
    // xhr.addEventListener('loadend', xhrRequestListenerEnd)
    xhr.open('GET', url)
    xhr.send()
    // console.log('teste');

    // connection response
    function xhrRequestListener() {
      // console.log('teste');
      // response with name and ids
      // console.log('inside xhrRequestListener: ');
      const modsString = this.responseText
      // console.log('this: ', this);
      // console.log('mods: ', typeof (mods), mods);
      // console.log(typeof (this.responseText), typeof (this.response), this);
      // console.log(typeof (JSON.parse(this.response)), JSON.parse(this.response));
      const modsObject = JSON.parse(modsString)
      // console.log('teste');
      // console.log('modsObject:', modsObject)
      state.mods = modsObject
      // console.log('state: ', state)
      // console.log('teste');
      // return state
      // state.mods = modsObject
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

    function xhrRequestListenerEnd() {
      console.log('teste', state);
      return state
    }
  }
}

module.exports = Fallback
