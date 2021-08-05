const TripToken = artifacts.require("./TripToken.sol");
const TokenReward = artifacts.require("./TokenReward.sol"); 
const saveToIPFS = artifacts.require("./saveToIPFS.sol");


module.exports = function(deployer) {
  deployer.deploy(TripToken);
  deployer.deploy(TokenReward);
  deployer.deploy(saveToIPFS);
}
