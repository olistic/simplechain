const Block = require('./Block');

function mineBlock(blockchain, data) {
  const lastBlock = blockchain.getLastBlock();

  const index = lastBlock.index + 1;
  const timestamp = Math.floor(Date.now() / 1000);
  const lastBlockHash = lastBlock.hash;
  const { difficulty } = blockchain;

  const block = new Block(index, lastBlockHash, timestamp, data, difficulty);

  while (!block.isValid(lastBlock)) {
    block.nonce += 1;
    block.hash = block.calculateHash();
  }

  return block;
}

module.exports = mineBlock;
