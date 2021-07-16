//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "hardhat/console.sol";

contract Lottery {
    uint[] public roundIds;
    address[][] public players;
    uint[] public payouts;

    function enterCurrentRound() external payable {
        require(msg.value >= 0.01 ether);
        uint currentRoundId = getCurrentRoundId();
        if (roundIds[roundIds.length - 1] != currentRoundId) {
            roundIds.push(currentRoundId);
        }
        uint currentRoundIndex = roundIds.length - 1;
        players[currentRoundIndex].push(msg.sender);
        payouts[currentRoundIndex] += msg.value;
    }

    function getCurrentRoundId() public view returns (uint) {
        return (block.number / 100) * 100;
    }

    function withdrawPayout(uint roundId) external {
        uint currentRoundId = getCurrentRoundId();
        require(roundId < currentRoundId);
        uint pseudoRandom = uint(blockhash(roundId + 100));
        uint winnerIndex = pseudoRandom % players[roundId].length;
        address payable winner = payable(players[roundId][winnerIndex]);
        winner.transfer(payouts[roundId]);
    }
}
