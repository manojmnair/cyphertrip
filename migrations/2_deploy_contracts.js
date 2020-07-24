const TripToken = artifacts.require("./TripToken.sol"); 
//const TokenReward = artifacts.require("./TokenReward.sol");


module.exports = function(deployer) {
  deployer.deploy(TripToken);
  //deployer.deploy(TokenReward);
}
