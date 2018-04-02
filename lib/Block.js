const crypto = require('crypto');

/** Class representing a block. */
class Block {
  /**
   * Creates a block.
   *
   * @param {string} previousBlock The previous block in the blockchain.
   * @param {string} data The data of the block.
   * @param {number} difficulty The difficulty to mine the block.
   * @param {number} timestamp The timestamp of the block.
   * @param {number} nonce The nonce.
   */
  constructor(
    previousBlock,
    data,
    difficulty,
    timestamp = Date.now(),
    nonce = 0,
  ) {
    this.index = previousBlock ? previousBlock.index + 1 : 0;
    this.previousBlock = previousBlock;
    this.data = data;
    this.difficulty = difficulty;
    this.timestamp = timestamp;
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
   *  - data
   *  - difficulty
   *  - timestamp
   *  - nonce
   *
   * That means that any change on the above fields will produce a different
   * header, and thus a different hash.
   *
   * @returns {string} The header of the block.
   */
  getHeader() {
    const previousBlockHash = this.previousBlock ? this.previousBlock.hash : '';
    return (
      `${this.index}-${previousBlockHash}-${this.data}-${this.difficulty}-` +
      `${this.timestamp}-${this.nonce}`
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
   *  - The hash stored in the block matches the calculated hash of the block.
   *  - The block complies with its difficulty requirements.
   *
   * @returns {boolean} Whether the block is valid or not.
   */
  isValid() {
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
