/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface LotteryInterface extends ethers.utils.Interface {
  functions: {
    "enterCurrentRound()": FunctionFragment;
    "getCurrentRoundStartingBlock()": FunctionFragment;
    "getPayouts()": FunctionFragment;
    "getPlayers()": FunctionFragment;
    "getRounds()": FunctionFragment;
    "getWinner(uint256)": FunctionFragment;
    "payouts(uint256)": FunctionFragment;
    "players(uint256,uint256)": FunctionFragment;
    "roundDurationInBlocks()": FunctionFragment;
    "rounds(uint256)": FunctionFragment;
    "withdrawPayout(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "enterCurrentRound",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCurrentRoundStartingBlock",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPayouts",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPlayers",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getRounds", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getWinner",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "payouts",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "players",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "roundDurationInBlocks",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rounds",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawPayout",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "enterCurrentRound",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCurrentRoundStartingBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPayouts", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getPlayers", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRounds", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getWinner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "payouts", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "players", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "roundDurationInBlocks",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rounds", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawPayout",
    data: BytesLike
  ): Result;

  events: {};
}

export class Lottery extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: LotteryInterface;

  functions: {
    enterCurrentRound(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getCurrentRoundStartingBlock(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getPayouts(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    getPlayers(overrides?: CallOverrides): Promise<[string[][]]>;

    getRounds(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    getWinner(
      roundIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    payouts(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    players(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    roundDurationInBlocks(overrides?: CallOverrides): Promise<[BigNumber]>;

    rounds(arg0: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    withdrawPayout(
      roundIndex: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  enterCurrentRound(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getCurrentRoundStartingBlock(overrides?: CallOverrides): Promise<BigNumber>;

  getPayouts(overrides?: CallOverrides): Promise<BigNumber[]>;

  getPlayers(overrides?: CallOverrides): Promise<string[][]>;

  getRounds(overrides?: CallOverrides): Promise<BigNumber[]>;

  getWinner(
    roundIndex: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  payouts(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  players(
    arg0: BigNumberish,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  roundDurationInBlocks(overrides?: CallOverrides): Promise<BigNumber>;

  rounds(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  withdrawPayout(
    roundIndex: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    enterCurrentRound(overrides?: CallOverrides): Promise<void>;

    getCurrentRoundStartingBlock(overrides?: CallOverrides): Promise<BigNumber>;

    getPayouts(overrides?: CallOverrides): Promise<BigNumber[]>;

    getPlayers(overrides?: CallOverrides): Promise<string[][]>;

    getRounds(overrides?: CallOverrides): Promise<BigNumber[]>;

    getWinner(
      roundIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    payouts(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    players(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    roundDurationInBlocks(overrides?: CallOverrides): Promise<BigNumber>;

    rounds(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    withdrawPayout(
      roundIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    enterCurrentRound(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getCurrentRoundStartingBlock(overrides?: CallOverrides): Promise<BigNumber>;

    getPayouts(overrides?: CallOverrides): Promise<BigNumber>;

    getPlayers(overrides?: CallOverrides): Promise<BigNumber>;

    getRounds(overrides?: CallOverrides): Promise<BigNumber>;

    getWinner(
      roundIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    payouts(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    players(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    roundDurationInBlocks(overrides?: CallOverrides): Promise<BigNumber>;

    rounds(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    withdrawPayout(
      roundIndex: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    enterCurrentRound(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getCurrentRoundStartingBlock(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPayouts(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPlayers(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getRounds(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getWinner(
      roundIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    payouts(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    players(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    roundDurationInBlocks(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rounds(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdrawPayout(
      roundIndex: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
