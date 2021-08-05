// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.6.8;

// Base contracts. 
import "@openzeppelin/contracts/access/Ownable.sol";
import "./TripToken.sol";

/** 
 * @title TokenReward
 * @author Manoj M 
 * @notice This contract is used to set the beneficiary, reward tokens and to get the balance of beneficiary. 
 */

contract TokenReward is Ownable, TripToken{

    /**
    * @dev Indicates that the owner has set the beneficiary
    * @param _beneficiary is the beneficiary
    */
    event setbeneficiary(address indexed _beneficiary);

    /**
    * beneficiary is the receiver of tokens
    */
    address payable public beneficiary;

    constructor() public {

    }

    /** 
    * @notice Sets the beneficiary 
    * @dev Only owner can set the beneficiary
    * @param _beneficiary The beneficiary address
    */ 
    function setBeneficiary(address payable  _beneficiary) public onlyOwner {
        beneficiary = _beneficiary;
        emit setbeneficiary(beneficiary);
    }


    /** 
    * @notice To get the beneficiary address
    * @return beneficiary address
    */
    function getBeneficiary() public returns (address) {
        return beneficiary;
    }

    /** 
    * @notice Transfer tokens to beneficiary 
    * @dev Only owner can transfer tokens
    * @dev Beneficiary should not be the owner
    * @dev Tokens awarded should be greater than 0
    * @param _beneficiary The beneficiary address
    * @param tokens Tokens rewarded
    * @return Bool
    */ 
    function transfer(address _beneficiary, uint256 tokens) public onlyOwner override returns (bool)  {
       require(beneficiary != msg.sender);
       require(tokens > 0);
       super._transfer(msg.sender,_beneficiary, tokens);
   }


  }




