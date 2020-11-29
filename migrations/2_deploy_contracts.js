const StableXRouter = artifacts.require('StableXRouter');

module.exports = async (deployer, network, accounts) => {
  if (network === "mainnet") {
    const stableXFactory = '';
    const WBNB = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
    await deployer.deploy(StableXRouter, stableXFactory, WBNB);
  } else {
    const stableXFactory = '';
    const WBNB = '0xae13d989dac2f0debff460ac112a837c89baa7cd'
    await deployer.deploy(StableXRouter, stableXFactory, WBNB);
  }
};
