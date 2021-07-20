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

    function getWinner(uint256 roundStartingBlock)
        public
        view
        onlyFinishedRound(roundStartingBlock)
        returns (address)
    {
        uint256 roundIndex = 0;
        bool found = false;
        for (uint256 i = 0; i < rounds.length; i++) {
            if (rounds[i] == roundStartingBlock) {
                roundIndex = i;
                found = true;
                break;
            }
        }
        require(found, "No round with this roundStartingBlock exists");
        uint256 pseudoRandom = uint256(
            blockhash(roundStartingBlock + roundDurationInBlocks)
        );
        uint256 winnerIndex = pseudoRandom % players[roundIndex].length;
        return players[roundIndex][winnerIndex];
    }

    function withdrawPayout(uint256 roundStartingBlock)
        external
        onlyFinishedRound(roundStartingBlock)
    {
        address payable winner = payable(getWinner(roundStartingBlock));
        winner.transfer(payouts[roundStartingBlock]);
    }
}
