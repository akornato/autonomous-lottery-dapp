//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "hardhat/console.sol";

contract Lottery {
    uint256[] public rounds;
    address[][] public players;
    uint256[] public payouts;

    function enterCurrentRound() external payable {
        require(msg.value >= 0.01 ether, "Minimum bet value is 0.01 ether");
        uint256 currentRound = getCurrentRound();
        if (rounds[rounds.length - 1] != currentRound) {
            rounds.push(currentRound);
        }
        uint256 currentRoundIndex = rounds.length - 1;
        players[currentRoundIndex].push(msg.sender);
        payouts[currentRoundIndex] += msg.value;
    }

    function getCurrentRound() public view returns (uint256) {
        return (block.number / 100) * 100;
    }

    function getRounds() external view returns (uint256[] memory) {
        return rounds;
    }

    function getPlayers() external view returns (address[][] memory) {
        return players;
    }

    function getPayouts() external view returns (uint256[] memory) {
        return payouts;
    }

    function withdrawPayout(uint256 roundId) external {
        uint256 currentRoundId = getCurrentRound();
        require(
            roundId < currentRoundId,
            "Payout can be withdrawn for finished rounds only"
        );
        uint256 pseudoRandom = uint256(blockhash(roundId + 100));
        uint256 winnerIndex = pseudoRandom % players[roundId].length;
        address payable winner = payable(players[roundId][winnerIndex]);
        winner.transfer(payouts[roundId]);
    }
}
