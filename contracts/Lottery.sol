//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "hardhat/console.sol";

contract Lottery {
    mapping(uint256 => address[]) public players; // key: lotteryId
    mapping(uint256 => uint256) public payouts; // key: lotteryId

    function enterCurrentLottery() external payable {
        require(msg.value >= 0.01 ether);
        uint256 currentLotteryId = getCurrentLotteryId();
        players[currentLotteryId].push(msg.sender);
        payouts[currentLotteryId] += msg.value;
    }

    function getCurrentLotteryId() public view returns (uint256) {
        return (block.number / 100) * 100;
    }

    function withdrawPayout(uint256 lotteryId) external {
        uint256 currentLotteryId = getCurrentLotteryId();
        require(lotteryId < currentLotteryId);
        uint256 pseudoRandom = uint256(blockhash(currentLotteryId));
        uint256 winnerIndex = pseudoRandom % players[lotteryId].length;
        address payable winner = payable(players[lotteryId][winnerIndex]);
        winner.transfer(payouts[lotteryId]);
    }
}
