#!/usr/bin/env node

/* eslint-disable no-console */

const readline = require('readline');

const chalk = require('chalk');
const ora = require('ora');

const Blockchain = require('./Blockchain');
const mineBlock = require('./mineBlock');

/**
 * Starts the blockchain REPL.
 */
function run() {
  const blockchain = new Blockchain();

  const rl = readline.createInterface({
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
          console.log(chalk.yellow(`Mining block with data: '${data}'`));
          const spinner = ora({ spinner: 'star', color: 'yellow' });
          spinner.start();
          const time = Date.now();
          mineBlock(blockchain, data).then(block => {
            blockchain.addBlock(block);
            const duration = (Date.now() - time) / 1000;
            spinner.succeed(
              chalk.green(`Block found and added to the chain! (${duration}s)`),
            );
            console.log(JSON.stringify(block, null, 2));
            rl.prompt();
          });
          break;
        }
        case 'listblocks': {
          const blocks = blockchain.chain;
          console.log(JSON.stringify(blocks, null, 2));
          rl.prompt();
          break;
        }
        default:
          console.log(
            chalk.bold.red(
              "I'm sorry, I don't recognize that command. Available commands: ADDBLOCK, LISTBLOCKS.",
            ),
          );
          rl.prompt();
          break;
      }
    })
    .on('close', () => {
      process.exit(0);
    });
}

run();
