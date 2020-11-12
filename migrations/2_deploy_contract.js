const StableXRouter = artifacts.require('StableXRouter')
const WBNB = {
  mainnet: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  testnet: '0xae13d989dac2f0debff460ac112a837c89baa7cd'
}

const stableXFactory = '0x61FFA3E1704125179F01916a3e19205BC9fb0DA0'

module.exports = async (deployer, network) => {
  console.log(network)
  await deployer.deploy(StableXRouter, stableXFactory, WBNB.mainnet)
}
