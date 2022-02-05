const Path = require('path')
const fs = require('fs')

class ProtocolResolver {
  /**
   * @returns Core
   */
  create(protocolId) {
    const protocol = require(Path.normalize(`${__dirname}/../lib`) + '/' + protocolId)
    return new protocol()
  }
}

module.exports = ProtocolResolver
