const deepEqual = require('deep-equal');

const Block = require('./Block');

class Blockchain {
  constructor() {
    this.chain = [Blockchain.createGenesisBlock()];
  }

  getLastBlock() {
    return this.chain.slice(-1)[0];
  }

  addBlock(block) {
    if (block.isValid(this.getLastBlock())) {
      this.chain.push(block);
    }
  }

  isValid() {
    if (!deepEqual(this.chain[0], Blockchain.createGenesisBlock())) {
      return false;
    }

    for (let i = 1; i < this.chain.length; i += 1) {
      const previousBlock = this.chain[i - 1];
      const block = this.chain[i];
      if (!block.isValid(previousBlock)) {
        return false;
      }
    }

    return true;
  }

  static createGenesisBlock() {
    return new Block(0, null, 1509926400, 'Hello, world!');
  }
}

module.exports = Blockchain;
