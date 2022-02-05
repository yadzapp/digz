const Path = require('path')
// const GameResolver = require('./GameResolver')
const ProtocolResolver = require('./ProtocolResolver')
const GlobalUdpSocket = require('./GlobalUdpSocket')

const defaultOptions = {
    socketTimeout: 2000,
    attemptTimeout: 10000,
    maxAttempts: 1
}

class QueryRunner {
    constructor(runnerOpts = {}) {
        this.udpSocket = new GlobalUdpSocket({
            port: runnerOpts.listenUdpPort
        });
        // this.gameResolver = new GameResolver();
        // console.log('this.gameResolver: ', this.gameResolver);
        // console.log('this.gameResolver: ', this.gameResolver.lookup('dayz'));
        this.protocolResolver = new ProtocolResolver();
    }
    async run(userOptions) {
        for (const key of Object.keys(userOptions)) {
            const value = userOptions[key];
            if (['port'].includes(key)) {
                userOptions[key] = parseInt(value);
            }
        }

        const {
            port_query: gameQueryPort,
            port_query_offset: gameQueryPortOffset,
            ...gameOptions
        // } = this.gameResolver.lookup(userOptions.type);
        } = {
          port: 2302,
          port_query_offset: 24714,
          protocol: 'valve' 
        }
        const attempts = [];

        if (userOptions.port) {
            if (gameQueryPortOffset && !userOptions.givenPortOnly) {
                attempts.push({
                    ...defaultOptions,
                    ...gameOptions,
                    ...userOptions,
                    port: userOptions.port + gameQueryPortOffset
                });
            }
            if (userOptions.port === gameOptions.port && gameQueryPort && !userOptions.givenPortOnly) {
                attempts.push({
                    ...defaultOptions,
                    ...gameOptions,
                    ...userOptions,
                    port: gameQueryPort
                });
            }
            attempts.push({
                ...defaultOptions,
                ...gameOptions,
                ...userOptions
            });
        } else if (gameQueryPort) {
            attempts.push({
                ...defaultOptions,
                ...gameOptions,
                ...userOptions,
                port: gameQueryPort
            });
        } else if (gameOptions.port) {
            attempts.push({
                ...defaultOptions,
                ...gameOptions,
                ...userOptions,
                port: gameOptions.port + (gameQueryPortOffset || 0)
            });
        } else {
            // Hopefully the request doesn't need a port. If it does, it'll fail when making the request.
            attempts.push({
                ...defaultOptions,
                ...gameOptions,
                ...userOptions
            });
        }

        const numRetries = userOptions.maxAttempts || gameOptions.maxAttempts || defaultOptions.maxAttempts;

        let attemptNum = 0;
        const errors = [];
        for (const attempt of attempts) {
            for (let retry = 0; retry < numRetries; retry++) {
                attemptNum++;
                try {
                    return await this._attempt(attempt);
                } catch (e) {
                    e.stack = 'Attempt #' + attemptNum + ' - Port=' + attempt.port + ' Retry=' + (retry) + ':\n' + e.stack;
                    errors.push(e);
                }
            }
        }

        const err = new Error('Failed all ' + errors.length + ' attempts');
        for (const e of errors) {
            err.stack += '\n' + e.stack;
        }
        throw err;
    }

    async _attempt(options) {
        const core = this.protocolResolver.create(options.protocol);
        // const core = ''
        // const core = this.protocolResolver.create('valve');
        // const core = require(Path.normalize(__dirname + '/../protocols') + '/valve');
        // new core();
        // console.log('core1: ', core1);
        // console.log('core2: ', core2);

      // const core = require(Path.normalize(__dirname + '/../protocols') + '/valve');
      // new core()
      // console.log('new core: ', new core());

        core.options = options;
        // console.log('core.options: ', core.options);
        core.udpSocket = this.udpSocket;
      // console.log('core.udpSocket: ', core.udpSocket);
        return await core.runOnceSafe();
    }
}

module.exports = QueryRunner;
