const Block = require('./Block');

const DIFFICULTY = 5;

/** Class representing a blockchain. */
class Blockchain {
  /**
   * Creates a blockchain.
   *
   * A blockchain is a chain of blocks where each block points to the previous
   * block. It has also a difficulty, which is a number that represents the
   * amount of zeros the hashes of the blocks that belong to the blockchain are
   * required to start with.
   *
   * A blockchain starts with a known block called the Genesis block.
   *
   * @param {number} difficulty The difficulty of the blockchain.
   */
  constructor(difficulty = DIFFICULTY) {
    this.difficulty = difficulty;
    this.lastBlock = Blockchain.GENESIS_BLOCK;
  }

  /**
   * Adds a block at the end of the chain.
   *
   * To add a block, its previous block needs to be the last block in the chain
   * and it has to be valid.
   *
   * @param {Block} block The block to add.
   */
  addBlock(block) {
    if (block.previousBlock === this.lastBlock && block.isValid()) {
      this.lastBlock = block;
    }
  }

  /**
   * Checks if the blockchain is valid.
   *
   * A blockchain is valid if the following conditions are met:
   *
   *  - Each block in the chain is a valid block.
   *  - The first block in the chain is the Genesis block.
   *
   * @returns {boolean} Whether the blockchain is valid or not.
   */
  isValid() {
    if (!this.lastBlock) {
      return false;
    }

    let block = this.lastBlock;
    while (block.previousBlock) {
      if (!block.isValid()) {
        return false;
      }

      block = block.previousBlock;
    }

    if (block !== Blockchain.GENESIS_BLOCK) {
      return false;
    }

    return true;
  }
}

Blockchain.GENESIS_BLOCK = new Block(
  null,
  'Everything should be made as simple as possible, but not simpler',
  DIFFICULTY,
  1509926400000,
  900243,
);

module.exports = Blockchain;
