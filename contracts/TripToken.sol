// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.6.8;


// Base contracts 
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

/** 
 * @title TripToken
 * @author Manoj M
 * @notice This contract represents a creation of an ERC-20 token named "TripToken". 
 * It has a total supply of 21000000.  
 * It's symbol is "TRIP" and has 0 decimals.
 */
contract TripToken is ERC20, Ownable {
    constructor() public ERC20("TripToken", "TRIP"){
        _mint(msg.sender, 21000000);
_setupDecimals(0);
    }
}


