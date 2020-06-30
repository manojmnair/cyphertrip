pragma solidity >=0.4.21 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/TripToken.sol";

contract TestTripToken {

  function testTotalSupply() public {
    TripToken tripToken = TripToken(DeployedAddresses.TripToken());

    uint totalsupply = 21000000;

    Assert.equal(tripToken.totalSupply(), totalsupply, "The contract should have a total supply of 21000000 tokens.");
  }
/**
function testTransfer() public {
    TripToken tripToken = TripToken(DeployedAddresses.TripToken());

    uint totalsupply = 21000000;

    Assert.equal(tripToken.totalSupply(), totalsupply, "The contract should have a total supply of 21000000 tokens.");
  }

*/
}
