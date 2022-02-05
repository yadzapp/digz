const QueryRunner = require('./QueryRunner');

let singleton = null;

class Digz {
  constructor(runnerOpts) {
    this.queryRunner = new QueryRunner(runnerOpts);
  }

  async query(userOptions) {
    return await this.queryRunner.run(userOptions);
  }

  static getInstance() {
    if (!singleton) singleton = new Digz();
      return singleton;
  }
  static async query(...args) {
    return await Digz.getInstance().query(...args);
  }
}

module.exports = Digz;
