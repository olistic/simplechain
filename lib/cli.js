#!/usr/bin/env node

/* eslint-disable no-console */

const readline = require('readline');

const chalk = require('chalk');
const ora = require('ora');

const Blockchain = require('./Blockchain');
const mineBlock = require('./mineBlock');
const parseArgs = require('./parseArgs');

const COMMANDS = ['ADDBLOCK', 'LISTBLOCKS'];

/**
 * Adds a block with the given data to the blockchain and prints it to screen.
 *
 * @param {Blockchain} blockchain The blockchain.
 * @param {string} data The data of the block.
 *
 * @returns {Promise} A promise that resolves when the block is added.
 */
function addBlock(blockchain, data) {
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
 *
 * @param {Blockchain} blockchain The blockchain.
 */
function listBlocks(blockchain) {
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
 * Starts the simplechain REPL.
 */
function run() {
  const { difficulty } = parseArgs(process.argv);

  const blockchain = new Blockchain(difficulty);

  const rl = readline.createInterface({
    completer,
    input: process.stdin,
    output: process.stdout,
    prompt: chalk.dim('SIMPLECHAIN> '),
  });

  rl.prompt();

  rl
    .on('line', line => {
      const [command, ...args] = line.split(' ');
      switch (command.toLowerCase()) {
        case 'addblock': {
          const data = args.join(' ');
          addBlock(blockchain, data).then(() => {
            rl.prompt();
          });
          break;
        }
        case 'listblocks':
          listBlocks(blockchain);
          rl.prompt();
          break;
        default:
          showUsage();
          rl.prompt();
          break;
      }
    })
    .on('close', () => {
      process.exit();
    });
}

run();
