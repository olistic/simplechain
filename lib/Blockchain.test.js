const Block = require('./Block');
const Blockchain = require('./Blockchain');

describe('Blockchain', () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  test('has a difficulty', () => {
    expect(blockchain).toHaveProperty('difficulty');
  });

  test('has a reference to the last block', () => {
    expect(blockchain).toHaveProperty('lastBlock');
  });

  test('difficulty defaults to five', () => {
    expect(blockchain.difficulty).toBe(5);
  });

  test('allows to specify difficulty', () => {
    blockchain = new Blockchain(42);
    expect(blockchain.difficulty).toBe(42);
  });

  test('starts with the genesis block', () => {
    expect(blockchain.lastBlock).toBe(Blockchain.GENESIS_BLOCK);
  });

  test('allows adding a valid block to the chain', () => {
    const block = new Block(blockchain.lastBlock, 'foo', 0);
    blockchain.addBlock(block);
    expect(blockchain.lastBlock).toBe(block);
  });

  test('rejects invalid blocks', () => {
    const { lastBlock } = blockchain;
    const invalidBlock = new Block(null, 'foo', 0);
    blockchain.addBlock(invalidBlock);
    expect(blockchain.lastBlock).toBe(lastBlock);
    expect(lastBlock).not.toBe(invalidBlock);
  });

  test('is valid', () => {
    expect(blockchain.isValid()).toBe(true);
  });

  describe('with more blocks', () => {
    beforeEach(() => {
      const block = new Block(blockchain.lastBlock, 'foo', 0);
      blockchain.addBlock(block);
    });

    test('is valid', () => {
      expect(blockchain.isValid()).toBe(true);
    });

    describe('and one invalid block', () => {
      beforeEach(() => {
        const invalidBlock = new Block(blockchain.lastBlock, 'bar', 1);
        blockchain.lastBlock = invalidBlock;
      });

      test('is not valid', () => {
        expect(blockchain.isValid()).toBe(false);
      });
    });
  });

  describe('with no blocks', () => {
    beforeEach(() => {
      blockchain.lastBlock = null;
    });

    test('is not valid', () => {
      expect(blockchain.isValid()).toBe(false);
    });
  });

  describe('with first block different than genesis block', () => {
    beforeEach(() => {
      const block = new Block(null, 'foo', 0);
      blockchain.lastBlock = block;
    });

    test('is not valid', () => {
      expect(blockchain.isValid()).toBe(false);
    });
  });
});
