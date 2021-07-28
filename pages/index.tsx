import React, { useCallback } from "react";
import { NextPage } from "next";
import { ethers } from "ethers";
import { Table, Button, notification } from "antd";
import { useStore } from "@hooks/useStore";

const HomePage: NextPage = () => {
  const {
    blockNumber,
    currentRoundStartingBlock,
    rounds,
    players,
    payouts,
    winners,
    connectWallet,
    signer,
    signerAddress,
    signerBalance,
    contract,
  } = useStore();

  const enterCurrentRound = useCallback(async () => {
    try {
      const tx = await contract.enterCurrentRound({
        value: ethers.utils.parseEther(".01"),
      });
      await tx.wait();
    } catch (e) {
      notification.open({
        message: "Error",
        description: e.message,
      });
    }
  }, [contract]);

  const withdrawPayout = useCallback(
    async (roundIndex: number) => {
      try {
        const tx = await contract.withdrawPayout(roundIndex);
        await tx.wait();
      } catch (e) {
        notification.open({
          message: "Error",
          description: e.message,
        });
      }
    },
    [contract]
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
            Current block: {blockNumber} | Current round starting block:{" "}
            {currentRoundStartingBlock} |{" "}
            <a
              href={`https://rinkeby.etherscan.io/address/${contract.address}#code`}
              target="_blank"
              rel="noreferrer"
            >
              Etherscan
            </a>
          </div>
          {signer &&
            rounds[rounds.length - 1] !== currentRoundStartingBlock && (
              <Button onClick={enterCurrentRound}>Start new round</Button>
            )}
        </div>
        <Table
          className="pt-5"
          pagination={{ defaultPageSize: 3 }}
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
            payout: `${payouts[roundIndex]} ETH`,
            winner:
              signer &&
              (winners[roundIndex] ? (
                payouts[roundIndex] !== "0.0" ? (
                  <Button onClick={() => withdrawPayout(roundIndex)}>
                    Withdraw payout
                  </Button>
                ) : (
                  "Payout withdrawn"
                )
              ) : (
                <Button onClick={enterCurrentRound}>Enter round</Button>
              )),
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
      </div>
    </>
  );
};

export default HomePage;
