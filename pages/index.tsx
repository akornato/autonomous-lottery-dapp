import React from "react";
import { NextPage } from "next";
import { useStore } from "@hooks/useStore";

const HomePage: NextPage = () => {
  const { blockNumber, currentRound, contract, rounds, players, payouts } =
    useStore();
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div>
        <p>Current block number: {blockNumber}</p>
        <p>Contract lottery address: {contract.address}</p>
        <p>Current lottery round: {currentRound}</p>
        <table>
          <tr>
            <th>Round</th>
            <th>Players</th>
            <th>Payout</th>
          </tr>
          {rounds.map((round, roundIndex) => (
            <tr key={round}>
              <td>{round}</td>
              <td>
                {players[roundIndex].map((player) => (
                  <p key={player}>{player}</p>
                ))}
              </td>
              <td>{payouts[roundIndex]}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default HomePage;
