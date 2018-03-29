<h1 align="center">✨🔗 Simplechain 🔗✨</h1>

<p align="center">
  <a href="https://circleci.com/gh/olistic/simplechain"><img alt="CircleCI Status" src="https://img.shields.io/circleci/project/github/olistic/simplechain.svg?label=circle&maxAge=43200&style=flat-square"></a>
  <a href="https://codeclimate.com/github/olistic/simplechain"><img alt="Coverage Status" src="https://img.shields.io/codeclimate/coverage/olistic/simplechain.svg?maxAge=43200&style=flat-square"></a>
</p>

<p align="center">
  Interactive blockchain built with Node.js.
</p>

<p align="center">
  <img alt="demo" src="https://i.imgur.com/tk1gaxe.gif" height="433">
</p>

## Intro

The blockchain is a fascinating technology, but it could also be intimidating. At the time I wrote this code, I had consumed a lot of material regarding the blockchain and cryptocurrencies, but I hadn't satisfied my hunger for knowledge (and still hadn't). I wanted to create my own blockchain for some of that knowledge to sink in, and I wanted it to be simple. Simplechain is the result of that, and I hope you find it as helpful as it was for me when I created it.

## How To Use

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

Well done! But if you want to learn more, please don't forget to [look at the code](https://github.com/olistic/simplechain/tree/master/lib).

## Resources

* [_Ever wonder how Bitcoin (and other cryptocurrencies) actually work?_](https://youtu.be/bBC-nXj3Ng4)

## License

MIT
