const deepEqual = require('deep-equal');

const Block = require('./Block');

const DIFFICULTY = 5;

/** Class representing a blockchain. */
class Blockchain {
  /**
   * Creates a blockchain.
   *
   * The blockchain has a chain of blocks which starts with a Genesis block and
   * a difficulty. The difficulty is just a number that represents the amount
   * of zeros the hashes of the blocks belonging to the blockchain are required
   * to start with.
   */
  constructor() {
    this.chain = [Blockchain.createGenesisBlock()];
    this.difficulty = DIFFICULTY;
  }

  /**
   * Returns the last block in the chain.
   *
   * @returns {Block} The last block in the chain.
   */
  getLastBlock() {
    return this.chain.slice(-1)[0];
  }

  /**
   * Adds a block at the end of the chain, if it's valid.
   *
   * @param {Block} block The block to add.
   */
  addBlock(block) {
    if (block.isValid(this.getLastBlock())) {
      this.chain.push(block);
    }
  }

  /**
   * Checks if the blockchain is valid.
   *
   * A blockchain is valid if the following conditions are met:
   *
   *  - The first block is the Genesis block.
   *  - Each block in the chain is a valid block.
   *
   * @returns {boolean} Whether the blockchain is valid or not.
   */
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

  /**
   * Creates the Genesis block.
   *
   * @returns {Block} The Genesis block.
   */
  static createGenesisBlock() {
    return new Block(
      0,
      '',
      'Everything should be made as simple as possible, but not simpler',
      DIFFICULTY,
      1509926400000,
      900243,
    );
  }
}

module.exports = Blockchain;
