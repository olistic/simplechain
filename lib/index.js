const readline = require('readline');

const Block = require('./Block');
const Blockchain = require('./Blockchain');

const blockchain = new Blockchain();

const mineBlock = (data) => {
  const lastBlock = blockchain.getLastBlock();

  const index = lastBlock.index + 1;
  const timestamp = Math.floor(Date.now() / 1000);
  const lastBlockHash = lastBlock.hash;
  const difficulty = blockchain.getDifficulty();

  const block = new Block(index, lastBlockHash, timestamp, data, difficulty);

  while (!block.isValid(lastBlock)) {
    block.nonce += 1;
    block.hash = block.calculateHash();
  }

  return block;
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'BLOCKCHAIN> ',
});

rl.prompt();

rl
  .on('line', (line) => {
    const [command, ...args] = line.split(' ');
    switch (command.toLowerCase()) {
      case 'addblock': {
        const data = args.join(' ');
        console.log(`Mining block with data: '${data}'...`);
        const block = mineBlock(data);
        console.log(`Block found:\n${JSON.stringify(block, null, 2)}`);
        blockchain.addBlock(block);
        console.log('and added to the chain!');
        break;
      }
      case 'listblocks':
        console.log(JSON.stringify(blockchain.chain, null, 2));
        break;
      default:
        console.log("I'm sorry, I don't recognize that command. Available commands: ADDBLOCK, LISTBLOCKS");
        break;
    }

    rl.prompt();
  })
  .on('close', () => {
    process.exit(0);
  });
