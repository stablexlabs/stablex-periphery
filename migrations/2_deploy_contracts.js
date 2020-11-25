const StableXRouter = artifacts.require('StableXRouter');
const StableXRouterProxy = artifacts.require('StableXRouterProxy');

const fs = require('fs');
const Web3 = require('web3');

const web3 = new Web3();

module.exports = async (deployer, network, accounts) => {

  web3.setProvider(deployer.provider);

  const proxyAdmin = accounts[0];

  if (network === "mainnet") {
    const jsonFile = "build/contracts/StableXRouterProxy.json";
    const abi = JSON.parse(fs.readFileSync(jsonFile))["abi"];

    await deployer.deploy(StableXRouter);

    let stableXRouterProxy = new web3.eth.Contract(abi, '0xc7fA7951187F91153851b0F9Ab2d032Abd0f2f0C');
    // upgrade to new implementation
    await stableXRouterProxy.methods.upgradeTo(StableXRouter.address).send({from: proxyAdmin});

  } else {
    await deployer.deploy(StableXRouter);

    const stableXFactory = '0xbf42ad1c9d0267e067af20c7b392b6ae20533077';
    const WBNB = '0xae13d989dac2f0debff460ac112a837c89baa7cd'

    const abiEncodeData = web3.eth.abi.encodeFunctionCall({
      "inputs": [
        {
          "internalType": "address",
          "name": "_factory",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_WETH",
          "type": "address"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },[stableXFactory, WBNB]);

    await deployer.deploy(StableXRouterProxy, StableXRouter.address, proxyAdmin, abiEncodeData);
  }
};
