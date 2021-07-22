import React, { useCallback } from "react";
import { NextPage } from "next";
import { ethers } from "ethers";
import { useStore } from "@hooks/useStore";

const roundDurationInBlocks = 10;

const HomePage: NextPage = () => {
  const {
    blockNumber,
    currentRoundStartingBlock,
    rounds,
    players,
    payouts,
    winners,
    updateStoreProps,
    error,
    setError,
    connectWallet,
    signer,
    signerAddress,
    signerBalance,
    contract,
  } = useStore();

  const enterCurrentRound = useCallback(async () => {
    setError(null);
    updateStoreProps();
    try {
      const tx = await contract.enterCurrentRound({
        value: ethers.utils.parseEther("1.0"),
      });
      await tx.wait();
    } catch (e) {
      setError(e);
    }
    updateStoreProps();
  }, [contract, setError, updateStoreProps]);

  const withdrawPayout = useCallback(
    async (roundIndex: number) => {
      setError(null);
      try {
        const tx = await contract.withdrawPayout(roundIndex);
        await tx.wait();
      } catch (e) {
        setError(e);
      }
      updateStoreProps();
    },
    [contract, setError, updateStoreProps]
  );

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div>
        <p>Current block number: {blockNumber}</p>
        <p>Contract lottery address: {contract.address}</p>
        <p>Current lottery round: {currentRoundStartingBlock}</p>
        <table>
          <thead>
            <tr>
              <th>Round starting block</th>
              <th>Players</th>
              <th>Payout</th>
              <th>Winner</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rounds.map((roundStartingBlock, roundIndex) => (
              <tr key={roundStartingBlock}>
                <td>{roundStartingBlock}</td>
                <td>
                  {players[roundIndex].map((player, index) => (
                    <p key={player + index}>{player}</p>
                  ))}
                </td>
                <td>{payouts[roundIndex]}</td>
                <td>
                  {winners[roundIndex] || (
                    <div>
                      <button onClick={enterCurrentRound}>
                        Enter current round
                      </button>
                    </div>
                  )}
                  {winners[roundIndex] && (
                    <div>
                      <button
                        onClick={() => withdrawPayout(roundIndex)}
                      >
                        Withdraw payout
                      </button>
                    </div>
                  )}
                </td>
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
          </>
        )}
        {error && <div className="text-xs text-red-500">{error.message}</div>}
      </div>
    </div>
  );
};

export default HomePage;
