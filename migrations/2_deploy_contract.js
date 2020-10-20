const StableXRouter = artifacts.require("StableXRouter");
const WBNB = {
    mainnet:'0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    testnet:'0xae13d989dac2f0debff460ac112a837c89baa7cd'
};

const stableXFactory = "0x526a2dC47BA323707Faf77f288fc7d0Fe1c9DF3d"

module.exports = async (deployer, network) => {
    console.log(network)
    await deployer.deploy(StableXRouter, stableXFactory, WBNB.mainnet)
};