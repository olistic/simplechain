const Block = require('../lib/Block');
const Blockchain = require('../lib/Blockchain');

describe('Blockchain', () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  test('has a chain of blocks which is an Array', () => {
    expect(Array.isArray(blockchain.chain)).toBe(true);
  });

  test('starts with the genesis block', () => {
    expect(blockchain.chain[0]).toEqual(Blockchain.createGenesisBlock());
  });

  test('knows what the last block is', () => {
    const block = new Block(0, null, 0, 'foo', 0);
    blockchain.chain.push(block);
    expect(blockchain.getLastBlock()).toEqual(block);
  });

  test('difficulty defaults to five', () => {
    expect(blockchain.getDifficulty()).toBe(5);
  });

  test('allows adding a valid block to the chain', () => {
    const lastBlock = blockchain.getLastBlock();
    const index = lastBlock.index + 1;
    const timestamp = Date.now() / 1000;
    const lastBlockHash = lastBlock.hash;
    const block = new Block(index, lastBlockHash, timestamp, 'foo', 0);
    blockchain.addBlock(block);
    expect(blockchain.getLastBlock()).toEqual(block);
  });

  test('rejects invalid blocks', () => {
    const lastBlock = blockchain.getLastBlock();
    const invalidBlock = new Block(0, null, 0, 'foo', 0);
    blockchain.addBlock(invalidBlock);
    expect(blockchain.getLastBlock()).toEqual(lastBlock);
    expect(lastBlock).not.toEqual(invalidBlock);
  });

  test('is valid', () => {
    expect(blockchain.isValid()).toBe(true);
  });

  describe('with no blocks', () => {
    test('is not valid', () => {
      blockchain.chain = [];
      expect(blockchain.isValid()).toBe(false);
    });
  });

  describe('with first block different than genesis block', () => {
    test('is not valid', () => {
      blockchain.chain = [new Block(0, null, 0, 'foo', 0)];
      expect(blockchain.isValid()).toBe(false);
    });
  });

  describe('with invalid block', () => {
    test('is not valid', () => {
      blockchain.chain.push(new Block(0, null, 0, 'foo', 0));
      expect(blockchain.isValid()).toBe(false);
    });
  });
});
