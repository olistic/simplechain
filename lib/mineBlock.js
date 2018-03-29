const Block = require('./Block');

/**
 * Mines a block.
 *
 * Finds a special number (called nonce) which, combined with the rest of the
 * fields of the block, produces a hash that complies with the blockchain's
 * difficulty requirements.
 *
 * @param {Blockchain} blockchain The blockchain for which to mine the block.
 * @param {string} data The data to include in the block.
 *
 * @returns {Promise} A promise for the mined block.
 */
function mineBlock(blockchain, data) {
  const lastBlock = blockchain.getLastBlock();

  const index = lastBlock.index + 1;
  const timestamp = Math.floor(Date.now() / 1000);
  const lastBlockHash = lastBlock.hash;
  const { difficulty } = blockchain;

  const block = new Block(index, lastBlockHash, timestamp, data, difficulty);

  return new Promise(resolve => {
    (function loop() {
      if (block.isValid(lastBlock)) {
        resolve(block);
      } else {
        block.nonce += 1;
        block.hash = block.calculateHash();
        // Give Node.js the chance to clear the stack.
        setImmediate(loop);
      }
    })();
  });
}

module.exports = mineBlock;
