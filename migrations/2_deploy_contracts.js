const TripToken = artifacts.require("./TripToken.sol"); 

module.exports = function(deployer) {
  deployer.deploy(TripToken);
}
