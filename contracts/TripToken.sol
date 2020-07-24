// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.6.8;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
//import "./TokenReward.sol";

contract TripToken is ERC20, Ownable {
    constructor() public ERC20("TripToken", "TRIP"){
        _mint(msg.sender, 21000000);
_setupDecimals(0);

    }
    /**
function transfer(address beneficiary, uint256 tokens) public onlyOwner override returns (bool)  {
       require(beneficiary != msg.sender);
require(tokens > 0);
       super._transfer(msg.sender,beneficiary, tokens);
   }

}    
	struct _Reward {
		uint256 trips;
		uint256 date;
	    }

	mapping(address => _Reward[]) private _rewards;

	event Reward(address indexed _beneficiary, uint256 tokens);

	function rewardsCount() public view returns(uint256) {
		return _rewards[_beneficiary].length;
	}


	function reward() public payable onlyOwner returns (bool) {
//require(tokens > 0);
		_Reward memory _reward = _Reward({
		tokens: msg.trips,
		date: block.timestamp
		});

		_rewards[_beneficiary].push(_reward);
		totalTokens = totalTokens.add(_reward.tokens);

	//rewardsCount++;
		emit Reward(_beneficiary, msg.value);
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
}
