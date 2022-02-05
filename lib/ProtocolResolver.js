const Path = require('path')
const fs = require('fs')
    // Core = require('../protocols/core');

class ProtocolResolver {
    // constructor() {
        // this.protocolDir = Path.normalize(__dirname+'/../protocols');
    // }

    /**
     * @returns Core
     */
    create(protocolId) {
        // protocolId = Path.basename(protocolId);
        // const path = this.protocolDir + '/' + Path.basename(protocolId);
        // console.log(path);
        // if(!fs.existsSync(path+'.js')) throw Error('Protocol definition file missing: '+type);
        // const protocol = require(Path.normalize(__dirname + '/../lib') + '/' + Path.basename(protocolId));
        // const protocol = require(Path.normalize(__dirname + '/../lib') + '/valve.js');
        // const protocol = require('./valve.js')
        
      // const protocol = require(Path.normalize(__dirname + '/../protocols') + '/valve');
      // const protocol = require(Path.normalize(__dirname + '/../protocols') + '/' + protocolId);
      const protocol = require(Path.normalize(`${__dirname}/../lib`) + '/' + protocolId);
      // console.log('protocol: ', protocol);
      // console.log('new protocol: ', new protocol());
      return new protocol();
    }
}

module.exports = ProtocolResolver;
