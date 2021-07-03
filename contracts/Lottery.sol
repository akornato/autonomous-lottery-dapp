//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "hardhat/console.sol";

contract Lottery {
    mapping(uint256 => address[]) public players; // key: lotteryId
    mapping(uint256 => uint256) public payouts; // key: lotteryId

    function enterCurrentLottery() external payable {
        require(msg.value >= 0.01 ether);
        uint256 lotteryId = getCurrentLotteryId();
        players[lotteryId].push(msg.sender);
        payouts[lotteryId] += msg.value;
    }

    function getCurrentLotteryId() public view returns (uint256) {
        return block.number / 100;
    }
}
