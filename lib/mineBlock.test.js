const Block = require('./Block');
const mineBlock = require('./mineBlock');

jest.mock('./Block', () =>
  jest.fn().mockImplementation(() => ({
    nonce: 0,
    calculateHash: () => 'blockHash',
    isValid: jest
      .fn()
      .mockImplementationOnce(() => false)
      .mockImplementationOnce(() => false)
      .mockImplementationOnce(() => true),
  })),
);

describe('mineBlock', () => {
  const lastBlock = {
    index: 0,
    timestamp: 123456789,
    hash: 'lastBlockHash',
  };
  const blockchain = {
    difficulty: 42,
    getLastBlock: () => lastBlock,
  };

  beforeEach(() => {
    Block.mockClear();
  });

  test('creates new block based on the last block of the blockchain', () => {
    const data = 'foo';
    const nextIndex = lastBlock.index + 1;
    const lastBlockHash = lastBlock.hash;
    const nextTimestamp = lastBlock.timestamp + 1;
    Date.now = jest.fn(() => nextTimestamp * 1000);
    const { difficulty } = blockchain;
    mineBlock(blockchain, data);
    expect(Block).toHaveBeenCalledWith(
      nextIndex,
      lastBlockHash,
      nextTimestamp,
      data,
      difficulty,
    );
  });

  test('keeps incrementing nonce until finding a valid block', () => {
    const block = mineBlock(blockchain, 'foo');
    expect(block.isValid).toHaveBeenCalledTimes(3);
    expect(block.nonce).toBe(2);
  });
});
