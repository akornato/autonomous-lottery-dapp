//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "hardhat/console.sol";

contract Lottery {
    uint256[] public rounds;
    address[][] public players;
    uint256[] public payouts;

    uint256 public roundDurationInBlocks = 10;

    modifier onlyFinishedRound(uint256 roundStartingBlock) {
        require(
            block.number > roundStartingBlock + roundDurationInBlocks,
            "Round not finished yet"
        );
        _;
    }

    function enterCurrentRound() external payable {
        require(msg.value >= 0.01 ether, "Minimum bet value is 0.01 ether");
        uint256 currentRound = getCurrentRound();
        if (rounds.length == 0 || rounds[rounds.length - 1] != currentRound) {
            rounds.push(currentRound);
            players.push([msg.sender]);
            payouts.push(msg.value);
        } else {
            players[players.length - 1].push(msg.sender);
            payouts[payouts.length - 1] += msg.value;
        }
    }

    function getCurrentRound() public view returns (uint256) {
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

    function getWinner(uint256 roundStartingBlock)
        public
        view
        onlyFinishedRound(roundStartingBlock)
        returns (address)
    {
        uint256 pseudoRandom = uint256(
            blockhash(roundStartingBlock + roundDurationInBlocks)
        );
        uint256 winnerIndex = pseudoRandom % players[roundStartingBlock].length;
        return players[roundStartingBlock][winnerIndex];
    }

    function withdrawPayout(uint256 roundStartingBlock)
        external
        onlyFinishedRound(roundStartingBlock)
    {
        address payable winner = payable(getWinner(roundStartingBlock));
        winner.transfer(payouts[roundStartingBlock]);
    }
}
