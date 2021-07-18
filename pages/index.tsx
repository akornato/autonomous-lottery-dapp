import React, { useCallback } from "react";
import { NextPage } from "next";
import { ethers } from "ethers";
import { useStore } from "@hooks/useStore";

const HomePage: NextPage = () => {
  const {
    blockNumber,
    currentRound,
    rounds,
    players,
    payouts,
    connectWallet,
    signer,
    signerAddress,
    signerBalance,
    contract,
  } = useStore();

  const enterCurrentRound = useCallback(() => {
    contract.enterCurrentRound({ value: ethers.utils.parseEther("1.0") });
  }, [contract]);

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
                  {players[roundIndex].map((player, index) => (
                    <p key={player + index}>{player}</p>
                  ))}
                </td>
                <td>{payouts[roundIndex]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!signer && (
          <div>
            <button onClick={connectWallet}>Connect Wallet</button>
          </div>
        )}
        {signer && (
          <>
            <div>Signer address: {signerAddress}</div>
            <div>Signer balance: {signerBalance}</div>
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
