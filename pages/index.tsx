import React, { useCallback } from "react";
import { NextPage } from "next";
import { ethers } from "ethers";
import { Table, Button } from "antd";
import { useStore } from "@hooks/useStore";
import { roundDurationInBlocks } from "@constants/ethers";

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
    <>
      <div className="fixed top-0 flex items-center w-screen h-12 px-10 text-white bg-blue-500">
        <div className="text-base">Autonomous Lottery Dapp</div>
        <div className="ml-auto">
          {!signer && <Button onClick={connectWallet}>Connect Wallet</Button>}
          {signer && signerAddress && (
            <div>
              Signer address:{" "}
              {`${signerAddress.substring(0, 6)}...${signerAddress.substring(
                signerAddress.length - 4
              )}`}{" "}
              | balance: {signerBalance}
            </div>
          )}
        </div>
      </div>
      <div className="fixed bottom-0 w-screen px-10 pt-3 overflow-auto top-12">
        <div className="flex justify-between">
          <div className="px-4">
            Current block number: {blockNumber} | Contract lottery address:{" "}
            {contract.address}
          </div>
          {blockNumber >=
            rounds[rounds.length - 1] + roundDurationInBlocks - 1 && (
            <Button onClick={enterCurrentRound}>Start new round</Button>
          )}
        </div>
        <Table
          className="pt-5"
          dataSource={rounds.map((roundStartingBlock, roundIndex) => ({
            key: roundStartingBlock,
            roundStartingBlock,
            players: players[roundIndex].map((player, playerIndex) => (
              <div
                key={`${player}${playerIndex}`}
                className={
                  winners[roundIndex] === player ? "text-blue-500" : ""
                }
              >
                {player}
              </div>
            )),
            payout: payouts[roundIndex],
            winner: winners[roundIndex] ? (
              <Button onClick={() => withdrawPayout(roundIndex)}>
                Withdraw payout
              </Button>
            ) : (
              <Button onClick={enterCurrentRound}>Enter round</Button>
            ),
          }))}
        >
          <Table.Column
            title="Round starting block"
            dataIndex="roundStartingBlock"
            // @ts-ignore
            sorter={(a, b) => a.roundStartingBlock - b.roundStartingBlock}
            defaultSortOrder="descend"
            sortDirections={[]}
          />
          <Table.Column
            title={
              <div>
                Players & <span className="text-blue-500">Winners</span>
              </div>
            }
            dataIndex="players"
          />
          <Table.Column title="Payout" dataIndex="payout" />
          <Table.Column dataIndex="winner" />
        </Table>
        {error && (
          <div className="flex justify-center pb-5 text-xs text-red-500">
            {error.message}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
