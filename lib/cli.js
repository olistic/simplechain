#!/usr/bin/env node

/* eslint-disable no-console */

const readline = require('readline');

const chalk = require('chalk');
const ora = require('ora');
const yargs = require('yargs');

const Blockchain = require('./Blockchain');
const mineBlock = require('./mineBlock');

const COMMANDS = ['ADDBLOCK', 'LISTBLOCKS'];

const blockchain = new Blockchain();

/**
 * Adds a block with the given data to the blockchain and prints it to screen.
 *
 * @param {string} data The data from which to create the block.
 *
 * @returns {Promise} A promise that resolves when the block is added.
 */
function addBlock(data) {
  console.log(chalk.yellow(`Mining block with data: '${data}'`));
  const spinner = ora({ spinner: 'star', color: 'yellow' });
  spinner.start();
  const time = Date.now();
  return mineBlock(blockchain, data).then(block => {
    blockchain.addBlock(block);
    const duration = (Date.now() - time) / 1000;
    spinner.succeed(
      chalk.green(`Block found and added to the chain! (${duration}s)`),
    );
    console.log(JSON.stringify(block, null, 2));
  });
}

/**
 * Prints the list of blocks in the blockchain to screen.
 */
function listBlocks() {
  const blocks = blockchain.chain;
  console.log(JSON.stringify(blocks, null, 2));
}

/**
 * Shows the available commands.
 */
function showUsage() {
  console.log(
    chalk.bold.red(
      `I'm sorry, I don't recognize that command. Available commands: ${COMMANDS.join(
        ', ',
      )}.`,
    ),
  );
}

/**
 * Parses a line.
 *
 * @param {string} line The line to parse.
 *
 * @returns {Promise} A promise that resolves when the line is parsed.
 */
function parseLine(line) {
  return new Promise(resolve => {
    const [command, ...args] = line.split(' ');
    switch (command.toLowerCase()) {
      case 'addblock': {
        const data = args.join(' ');
        addBlock(data).then(resolve);
        break;
      }
      case 'listblocks':
        listBlocks();
        resolve();
        break;
      default:
        showUsage();
        resolve();
        break;
    }
  });
}

/**
 * Return possible commands for completion based on current line.
 *
 * @param {string} line The current line.
 *
 * @returns {Array} An array that includes matching entries for the completion.
 */
function completer(line) {
  if (!line) {
    return [COMMANDS, line];
  }

  const hits = COMMANDS.filter(command => command.startsWith(line));
  return [hits, line];
}

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

/**
 * Starts the simplechain REPL.
 */
function run() {
  const { difficulty } = parseArgs(process.argv);

  blockchain.difficulty = difficulty;

  const rl = readline.createInterface({
    completer,
    input: process.stdin,
    output: process.stdout,
    prompt: chalk.dim('SIMPLECHAIN> '),
  });

  rl.prompt();

  rl
    .on('line', line => {
      parseLine(line).then(() => {
        rl.prompt();
      });
    })
    .on('close', () => {
      process.exit();
    });
}

run();
