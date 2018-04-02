const yargs = require('yargs');

/**
 * Parses the provided args.
 *
 * @param {string[]} args The args to parse.
 *
 * @returns {Object} The parsed args.
 */
function parseArgs(args) {
  return yargs
    .usage('Usage: $0 [options]')
    .options({
      d: {
        alias: 'difficulty',
        coerce: arg => {
          const parsed = Number.parseInt(arg, 10);
          if (Number.isNaN(parsed)) {
            throw new Error('Invalid argument: difficulty must be a number');
          }

          return parsed;
        },
        default: 5,
        describe: 'Difficulty of the blockchain',
        type: 'number',
      },
    })
    .strict()
    .parse(args);
}

module.exports = parseArgs;
