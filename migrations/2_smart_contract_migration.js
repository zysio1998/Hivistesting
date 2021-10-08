const SmartContract = artifacts.require("AreksNFTS");

module.exports = function (deployer) {
  deployer.deploy(SmartContract, "Name", "Symbol", "https://");
};
