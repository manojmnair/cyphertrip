// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.6.8;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
//import "./TokenReward.sol";

contract TripToken is ERC20, Ownable {
    constructor() public ERC20("TripToken", "TRIP"){
        _mint(msg.sender, 21000000);
    }

function transfer(address beneficiary, uint256 tokens) public onlyOwner override returns (bool)  {
       require(beneficiary != msg.sender);
require(tokens > 0);
       super._transfer(msg.sender,beneficiary, tokens);
   }

}

    /**
contract ERC20Whitelisted is ERC20 {
 
   Whitelist whitelist;
 
   constructor(address _whitelistAddress) public {
       whitelist = Whitelist(_whitelistAddress);
   }
 
   function transfer(address account, uint256 amount) public {
       require(whitelist.isMember(account), "Account not whitelisted.");
       super._transfer(account, amount);
   }
}
    */

/**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.

  function transferOwnership(address newOwner) public onlyOwner {
    require(newOwner != address(0));
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }
   */

