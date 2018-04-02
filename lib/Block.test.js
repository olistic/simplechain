const Block = require('./Block');

Date.now = jest.fn(() => 42);

describe('Block', () => {
  const previousBlock = new Block(0, null, 'foo', 0);
  let block;

  beforeEach(() => {
    block = new Block(1, previousBlock.hash, 'bar', 0);
  });

  test('has an index', () => {
    expect(block).toHaveProperty('index');
  });

  test('has the hash of the previous block', () => {
    expect(block).toHaveProperty('previousBlockHash');
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

  test('timestamp defaults to seconds since Unix Epoch', () => {
    expect(block.timestamp).toBe(42);
  });

  test('allows to specify timestamp', () => {
    block = new Block(1, previousBlock.hash, 'bar', 0, 123456789);
    expect(block.timestamp).toBe(123456789);
  });

  test('nonce defaults to zero', () => {
    expect(block.nonce).toBe(0);
  });

  test('allows to specify nonce', () => {
    block = new Block(1, previousBlock.hash, 'bar', 0, 123456789, 42);
    expect(block.nonce).toBe(42);
  });

  test('concatenates index, hash of the previous block, data, difficulty, timestamp and nonce to form header', () => {
    expect(block.getHeader()).toBe(
      '1-fa4bedf2a0448e3dd41d157468a7fa9c4200e5f3e38fd3f082ed70626b413eb8-bar-0-42-0',
    );
  });

  test('calculates SHA-256 hash of the header', () => {
    expect(block.calculateHash()).toBe(
      'e9e9bb597eccf4d527370219e63b217bfda0a9cc089169b2dbc9746234e41b3a',
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
