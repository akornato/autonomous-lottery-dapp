import React, { useCallback } from "react";
import { NextPage } from "next";
import { useStore } from "@hooks/useStore";
import { contract } from "@constants/ethers";

const HomePage: NextPage = () => {
  const {
    blockNumber,
    currentRound,
    rounds,
    players,
    payouts,
    connect,
    signer,
    signerAddress,
    signerBalance,
  } = useStore();
  const enterCurrentRound = useCallback(() => {
    contract.enterCurrentRound({ value: 1 });
  }, []);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div>
        <p>Current block number: {blockNumber}</p>
        <p>Contract lottery address: {contract.address}</p>
        <p>Current lottery round: {currentRound}</p>
        <table>
          <thead>
            <tr>
              <th>Round</th>
              <th>Players</th>
              <th>Payout</th>
            </tr>
          </thead>
          <tbody>
            {rounds.map((round, roundIndex) => (
              <tr key={round}>
                <td>
                  {round}
                  {currentRound === round ? " (ongoing)" : ""}
                </td>
                <td>
                  {players[roundIndex].map((player) => (
                    <p key={player}>{player}</p>
                  ))}
                </td>
                <td>{payouts[roundIndex]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button onClick={connect}>Connect</button>
        </div>
        {signer && (
          <>
            <div>Signer address: {signerAddress}</div>
            <div>Signer balance: {signerBalance?.toNumber()}</div>
            <div>
              <button onClick={enterCurrentRound}>Enter current round</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
