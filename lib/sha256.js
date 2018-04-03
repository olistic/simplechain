const crypto = require('crypto');

/**
 * Calculates the SHA-256 hash of the provided input.
 *
 * @param {string} input The input to hash.
 *
 * @returns {string} The hash in hex encoding.
 */
function sha256(input) {
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
}

module.exports = sha256;
