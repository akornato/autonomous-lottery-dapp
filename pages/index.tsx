import React, { useCallback } from "react";
import { NextPage } from "next";
import { ethers } from "ethers";
import { Table, Button } from "antd";
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
        <Table
          dataSource={rounds.map((roundStartingBlock, roundIndex) => ({
            key: roundStartingBlock,
            roundIndex,
          }))}
        >
          <Table.Column
            title="Round starting block"
            dataIndex="roundIndex"
            render={(roundIndex) => rounds[roundIndex]}
          />
          <Table.Column
            title="Players"
            dataIndex="roundIndex"
            render={(roundIndex) => (
              <>
                {players[roundIndex].map((player) => (
                  <div key={player}>{player}</div>
                ))}
              </>
            )}
          />
          <Table.Column
            title="Payout"
            dataIndex="roundIndex"
            render={(roundIndex) => payouts[roundIndex]}
          />
          <Table.Column
            title="Winner"
            dataIndex="roundIndex"
            render={(roundIndex) =>
              winners[roundIndex] ? (
                <Button onClick={() => withdrawPayout(roundIndex)}>
                  Withdraw payout
                </Button>
              ) : (
                <Button onClick={enterCurrentRound}>Enter current round</Button>
              )
            }
          />
        </Table>

        {!signer && <Button onClick={connectWallet}>Connect Wallet</Button>}
        {signer && (
          <>
            <p>Signer address: {signerAddress}</p>
            <p>Signer balance: {signerBalance}</p>
          </>
        )}
        {error && <p className="text-xs text-red-500">{error.message}</p>}
      </div>
    </div>
  );
};

export default HomePage;
