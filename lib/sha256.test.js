const sha256 = require('./sha256');

describe('sha256', () => {
  test('calculates the SHA-256 of the input', () => {
    expect(sha256('foo')).toEqual(
      '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae',
    );
  });
});
