#!/usr/bin/env node

/* eslint-disable no-console */

const readline = require('readline');

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
    prompt: 'SIMPLECHAIN> ',
  });

  rl
    .on('line', line => {
      const [command, ...args] = line.split(' ');
      switch (command.toLowerCase()) {
        case 'addblock': {
          const data = args.join(' ');
          console.log(`Mining block with data: '${data}'...`);
          const time = Date.now();
          const block = mineBlock(blockchain, data);
          blockchain.addBlock(block);
          const duration = (Date.now() - time) / 1000;
          console.log(`Block found and added to the chain (${duration}s)!`);
          console.log(JSON.stringify(block, null, 2));
          break;
        }
        case 'listblocks': {
          console.log(JSON.stringify(blockchain.chain, null, 2));
          break;
        }
        default:
          console.log(
            "I'm sorry, I don't recognize that command. Available commands: ADDBLOCK, LISTBLOCKS",
          );
          break;
      }

      rl.prompt();
    })
    .on('close', () => {
      process.exit(0);
    });

  rl.prompt();
}

run();
