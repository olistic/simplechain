#!/usr/bin/env node

/* eslint-disable no-console */

const readline = require('readline');

const chalk = require('chalk');
const ora = require('ora');

const Blockchain = require('./Blockchain');
const mineBlock = require('./mineBlock');

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
      "I'm sorry, I don't recognize that command. Available commands: ADDBLOCK, LISTBLOCKS.",
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
 * Starts the simplechain REPL.
 */
function run() {
  const rl = readline.createInterface({
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
