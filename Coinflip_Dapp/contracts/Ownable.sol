// SPDX-License-Identifier: UNLICENSED;
pragma solidity >= 0.5.16 <0.7.0;

contract Ownable{
    address internal owner;

    modifier onlyOwner(){
        require(msg.sender == owner);
        _; //The underscore means that the execution will continue
    }

    constructor() public payable {
        owner = msg.sender;
    }
}
