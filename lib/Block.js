const crypto = require('crypto');

/** Class representing a block. */
class Block {
  /**
   * Creates a block.
   *
   * @param {number} index The index in the blockchain.
   * @param {string} previousBlockHash The hash of the previous block.
   * @param {number} timestamp The timestamp of the block.
   * @param {string} data The data of the block.
   * @param {number} difficulty The difficulty used when mining this block.
   * @param {number} nonce The nonce.
   */
  constructor(
    index,
    previousBlockHash,
    timestamp,
    data,
    difficulty,
    nonce = 0,
  ) {
    this.index = index;
    this.previousBlockHash = previousBlockHash;
    this.timestamp = timestamp;
    this.data = data;
    this.difficulty = difficulty;
    this.nonce = nonce;
    this.hash = this.calculateHash();
  }

  /**
   * Returns the header of the block.
   *
   * The header is used to calculate the hash of the block, and includes the
   * following fields:
   *
   *  - index
   *  - hash of the previous block
   *  - timestamp
   *  - data
   *  - difficulty
   *  - nonce
   *
   * That means that any change on the above fields will produce a different
   * header, and thus a different hash.
   *
   * @returns {string} The header of the block.
   */
  getHeader() {
    return (
      `${this.index}-${this.previousBlockHash}-` +
      `${this.timestamp}-${this.data}-` +
      `${this.difficulty}-${this.nonce}`
    );
  }

  /**
   * Calculates the hash of the block.
   *
   * The hash is calculated as a SHA-256 digest of the header.
   *
   * @returns {string} The hash of the block.
   */
  calculateHash() {
    const hash = crypto.createHash('sha256');
    hash.update(this.getHeader());
    return hash.digest('hex');
  }

  /**
   * Checks if the block is a valid block.
   *
   * A block is valid if the following conditions are met:
   *
   *  - The block is the successor to the provided previous block.
   *  - The previous block hash recorded in the block matches the hash recorded
   *    in the provided previous block.
   *  - The hash recorded in the block matches the calculated hash of the
   *    block.
   *  - The block meets the difficulty required by the blockchain at the time
   *    it was mined.
   *
   * @param {Block} previousBlock The previous block in the blockchain.
   *
   * @returns {boolean} Whether the block is valid or not.
   */
  isValid(previousBlock) {
    if (this.index !== previousBlock.index + 1) {
      return false;
    }

    if (this.previousBlockHash !== previousBlock.hash) {
      return false;
    }

    if (this.hash !== this.calculateHash()) {
      return false;
    }

    if (!this.hash.startsWith('0'.repeat(this.difficulty))) {
      return false;
    }

    return true;
  }
}

module.exports = Block;
