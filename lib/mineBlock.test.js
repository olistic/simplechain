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
  test('keeps incrementing nonce until finding a valid block', () => {
    const block = new Block(null, 'foo', 0);
    return mineBlock(block).then(minedBlock => {
      expect(minedBlock.isValid).toHaveBeenCalledTimes(3);
      expect(minedBlock.nonce).toBe(2);
    });
  });
});
