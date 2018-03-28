const Block = require('./Block');

describe('Block', () => {
  const previousBlock = new Block(0, null, 0, 'foo', 0);
  let block;

  beforeEach(() => {
    block = new Block(1, previousBlock.hash, 0, 'bar', 0);
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

  test('has a difficulty', () => {
    expect(block).toHaveProperty('difficulty');
  });

  test('has a nonce', () => {
    expect(block).toHaveProperty('nonce');
  });

  test('has a hash', () => {
    expect(block).toHaveProperty('hash');
  });

  test('nonce defaults to zero', () => {
    expect(block.nonce).toBe(0);
  });

  test('allows to specify nonce', () => {
    block = new Block(1, previousBlock.hash, 0, 'bar', 1, 42);
    expect(block.nonce).toBe(42);
  });

  test('concatenates index, hash of the previous block, timestamp, data, difficulty and nonce to form header', () => {
    expect(block.getHeader()).toBe(
      '1-5aba2477446f17a1ffa3da379d0aaa0c4ef5b0666a6ccaafee4c2b345bc003d1-0-bar-0-0',
    );
  });

  test('calculates SHA-256 hash of the header', () => {
    expect(block.calculateHash()).toBe(
      'de56bcb6ab03acf8493e2c57ccfffe7c6c29c9c57127e378cd4cb0761de44a5c',
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

  describe('with no proof of work', () => {
    test('is not valid', () => {
      block.difficulty = 1;
      block.hash = block.calculateHash();
      expect(block.isValid(previousBlock)).toBe(false);
    });
  });
});
