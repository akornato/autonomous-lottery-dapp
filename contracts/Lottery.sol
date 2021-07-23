//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "hardhat/console.sol";

contract Lottery {
    uint256[] public rounds;
    address[][] public players;
    uint256[] public payouts;

    uint256 public roundDurationInBlocks = 10;

    modifier onlyFinishedRound(uint256 roundIndex) {
        uint256 roundStartingBlock = rounds[roundIndex];
        require(
            block.number >= roundStartingBlock + roundDurationInBlocks - 1,
            "Round not finished yet"
        );
        _;
    }

    function enterCurrentRound() external payable {
        require(msg.value >= 0.01 ether, "Minimum bet value is 0.01 ether");
        uint256 currentRoundStartingBlock = getCurrentRoundStartingBlock();
        if (
            rounds.length == 0 ||
            rounds[rounds.length - 1] != currentRoundStartingBlock
        ) {
            rounds.push(currentRoundStartingBlock);
            players.push([msg.sender]);
            payouts.push(msg.value);
        } else {
            players[players.length - 1].push(msg.sender);
            payouts[payouts.length - 1] += msg.value;
        }
    }

    function getCurrentRoundStartingBlock() public view returns (uint256) {
        return (block.number / roundDurationInBlocks) * roundDurationInBlocks;
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

    function getWinner(uint256 roundIndex)
        public
        view
        onlyFinishedRound(roundIndex)
        returns (address)
    {
        uint256 roundStartingBlock = rounds[roundIndex];
        uint256 pseudoRandom = uint256(
            blockhash(roundStartingBlock + roundDurationInBlocks)
        );
        uint256 winnerIndex = pseudoRandom % players[roundIndex].length;
        return players[roundIndex][winnerIndex];
    }

    function withdrawPayout(uint256 roundIndex)
        external
        onlyFinishedRound(roundIndex)
    {
        address payable winner = payable(getWinner(roundIndex));
        payouts[roundIndex] = 0;
        winner.transfer(payouts[roundIndex]);
    }
}
