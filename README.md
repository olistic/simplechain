<h1 align="center">✨🔗 Simplechain 🔗✨</h1>

<p align="center">
  <a href="https://circleci.com/gh/olistic/simplechain"><img alt="CircleCI Status" src="https://img.shields.io/circleci/project/github/olistic/simplechain.svg?style=flat-square"></a>
  <a href="https://codeclimate.com/github/olistic/simplechain"><img alt="Coverage Status" src="https://img.shields.io/codeclimate/coverage/olistic/simplechain.svg?style=flat-square"></a>
</p>

<p align="center">
  Interactive blockchain built with Node.js.
</p>

<p align="center">
  <img alt="demo" src="https://i.imgur.com/paQ2gpz.gif" height="500">
</p>

## Intro

The blockchain is a fascinating technology, but it can also be intimidating. At the time I wrote this code, I had consumed a lot of material regarding the blockchain and cryptocurrencies, but I hadn't satisfied my hunger for knowledge (and still haven't). I wanted to create my own blockchain for some of that knowledge to sink in, and I wanted it to be simple. Simplechain is the result of that, and I hope you find it as helpful as it was for me when I created it.

## Usage

First, clone the repo:

```sh
$ git clone https://github.com/olistic/simplechain.git
$ cd simplechain
```

Then, install the dependencies:

```sh
$ npm install
```

And finally, launch the REPL:

```sh
$ npm start
```

_Voilà!_ If you see the `SIMPLECHAIN>` prompt, it means you're inside the REPL.

Go ahead and try the following commands:

* `ADDBLOCK <data>`: Mines a block with the provided data and adds it to the chain.
* `LISTBLOCKS`: Lists all the blocks in the chain.

Well done! If you want to learn more, please don't forget to [look at the code](https://github.com/olistic/simplechain/tree/master/lib).

## Advanced Usage

### Adjust Difficulty

If you want to tweak the blockchain's difficulty, you can do so via the CLI:

```sh
$ npm start -- --difficulty <number>
```

This number represents the amount of zeros the hashes of the blocks in the blockchain need to begin with. A greater number makes it more difficult (more computationally expensive) to mine a block.

## Next Steps

* Implement P2P network of nodes where:
  * Miner nodes broadcast mined blocks
  * User nodes broadcast data to be included in blocks by miners
* Implement peer discovery protocol so nodes can find each other

## Resources

* [_Ever wonder how Bitcoin (and other cryptocurrencies) actually work?_](https://youtu.be/bBC-nXj3Ng4)

## License

MIT
