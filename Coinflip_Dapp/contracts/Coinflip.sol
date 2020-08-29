// SPDX-License-Identifier: UNLICENSED;
import"./Ownable.sol";
import"./Selfdestructable.sol";
pragma solidity >= 0.5.16 <0.7.0;

contract Coinflip is Ownable, Selfdestructable{

    uint public balance;

    string[] public messages = ["You lost...", "You won!"];

    //struct Better {
    //    string playerId;
    //    uint age;
    //    uint betAmount;
    //    address walletAddress;
    //}

    modifier costs(uint cost){
        require(msg.value >= cost, "You must bet at least 0.01 ether");
        _;
    }

    modifier lessThanBalance(uint value){
        require(2 * msg.value < value, "Your bet is higher than this contract's value!");
        _;
    }

    //mapping(address => Better) public betters;

    function flipCoin(uint headsOrTails) public payable costs(0.01 ether) lessThanBalance(balance) returns(string memory) {
        // Heads = 1, Tails = 0
        require(headsOrTails == 0 || headsOrTails == 1, "Coin flip is neither 0 nor 1");
        address gambler = msg.sender;
        require(msg.value <= gambler.balance, "You can't bet more than you have!");
        if(headsOrTails == random()){
            balance -= msg.value;
            msg.sender.transfer(2 * msg.value);
            return messages[1];
        }
        else{
            balance += msg.value;
            return messages[0];
        }
    }

    function random() public view returns(uint) {
        return block.timestamp % 2;
    }

    //function randomOutput(uint latestTimestamp) internal returns(uint) {
    //    latestTimestamp = random();
    //    return latestTimestamp;
    //}

    function withdrawFunds(uint256 balanceToTransfer) public onlyOwner {
        require(balanceToTransfer < balance, "You can't withdraw that much!");
        balance -= balanceToTransfer;
        msg.sender.transfer(balanceToTransfer);
    }

    function topUpContract() public payable returns(string memory){
        balance += msg.value;
        return string("Thanks for your generosity!");
    }

    function getContractBalance() public view onlyOwner returns(uint) {
        return balance;
    }



}
