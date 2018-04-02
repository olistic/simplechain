const Block = require('./Block');

Date.now = jest.fn(() => 123456789);

describe('Block', () => {
  const previousBlock = new Block(null, 'foo', 0);
  let block;

  beforeEach(() => {
    block = new Block(previousBlock, 'bar', 0);
  });

  test('has an index', () => {
    expect(block).toHaveProperty('index');
  });

  test('has a reference to the previous block', () => {
    expect(block).toHaveProperty('previousBlock');
  });

  test('has data', () => {
    expect(block).toHaveProperty('data');
  });

  test('has a difficulty', () => {
    expect(block).toHaveProperty('difficulty');
  });

  test('has a timestamp', () => {
    expect(block).toHaveProperty('timestamp');
  });

  test('has a nonce', () => {
    expect(block).toHaveProperty('nonce');
  });

  test('has a hash', () => {
    expect(block).toHaveProperty('hash');
  });

  test('index is the previous block index plus one', () => {
    expect(block.index).toBe(previousBlock.index + 1);
  });

  test('timestamp defaults to Date.now', () => {
    expect(block.timestamp).toBe(123456789);
  });

  test('allows to specify timestamp', () => {
    block = new Block(previousBlock, 'bar', 0, 42);
    expect(block.timestamp).toBe(42);
  });

  test('nonce defaults to zero', () => {
    expect(block.nonce).toBe(0);
  });

  test('allows to specify nonce', () => {
    block = new Block(previousBlock, 'bar', 0, 123456789, 42);
    expect(block.nonce).toBe(42);
  });

  test('concatenates index, hash of the previous block, data, difficulty, timestamp and nonce to form header', () => {
    expect(block.getHeader()).toBe(
      '1-e7c0ae0e9c12a36b375b240f467f3331a03334f88501a3cb0cdc34a12ca9dff9-bar-0-123456789-0',
    );
  });

  test('calculates SHA-256 hash of the header', () => {
    expect(block.calculateHash()).toBe(
      '45d82dc9970ab2658d2491169ebd65346b1e06495920e20d5eb5b56ed5221342',
    );
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

  describe('with invalid hash', () => {
    test('is not valid', () => {
      block.hash = 'invalid';
      expect(block.isValid(previousBlock)).toBe(false);
    });
  });

  describe('with no proof of work', () => {
    test('is not valid', () => {
      block.difficulty = 1;
      block.hash = block.calculateHash();
      expect(block.isValid(previousBlock)).toBe(false);
    });
  });
});
