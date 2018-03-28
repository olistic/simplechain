#!/usr/bin/env node

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
          process.stdout.write(`Mining block with data: '${data}'...\n`);
          const time = Date.now();
          const block = mineBlock(blockchain, data);
          blockchain.addBlock(block);
          const duration = (Date.now() - time) / 1000;
          const blockStr = JSON.stringify(block, null, 2);
          process.stdout.write(
            `Block found and added to the chain (${duration}s):\n${blockStr}\n`,
          );
          break;
        }
        case 'listblocks': {
          const blocksStr = JSON.stringify(blockchain.chain, null, 2);
          process.stdout.write(`${blocksStr}\n`);
          break;
        }
        default:
          process.stdout.write(
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
