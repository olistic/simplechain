const Block = require('../lib/Block');

describe('Block', () => {
  const previousBlock = new Block(0, null, 0, 'foo');
  let block;

  beforeEach(() => {
    block = new Block(1, previousBlock.hash, 0, 'bar');
  });

  test('has an index', () => {
    expect(block).toHaveProperty('index');
  });

  test('has the hash of the previous block', () => {
    expect(block).toHaveProperty('previousBlockHash');
  });

  test('has a timestamp', () => {
    expect(block).toHaveProperty('timestamp');
  });

  test('has data', () => {
    expect(block).toHaveProperty('data');
  });

  test('has a hash', () => {
    expect(block).toHaveProperty('hash');
  });

  test('concatenates index, hash of the previous block, timestamp and data to form header', () => {
    expect(block.getHeader()).toBe('1-a351f534347ffdaceb9d7ce104ca0650648e7fa857cb5d5d960fa2d1f2c7d3a7-0-bar');
  });

  test('calculates SHA-256 hash of the header', () => {
    expect(block.calculateHash()).toBe('2039ce4859adaf6055b0a0597f2ab27786be07a14d3dae8d885d368d466aede0');
  });

  test('is valid', () => {
    expect(block.isValid(previousBlock)).toBe(true);
  });

  describe('with invalid index', () => {
    test('is not valid', () => {
      block.index = 0;
      expect(block.isValid(previousBlock)).toBe(false);
    });
  });

  describe('with invalid hash of previous block', () => {
    test('is not valid', () => {
      block.previousBlockHash = 'invalid';
      expect(block.isValid(previousBlock)).toBe(false);
    });
  });

  describe('with invalid hash', () => {
    test('is not valid', () => {
      block.hash = 'invalid';
      expect(block.isValid(previousBlock)).toBe(false);
    });
  });
});
