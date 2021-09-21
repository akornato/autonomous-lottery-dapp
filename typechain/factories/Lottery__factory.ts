/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Lottery, LotteryInterface } from "../Lottery";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "roundStartingBlock",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "NewPlayer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "roundStartingBlock",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    inputs: [],
    name: "enterCurrentRound",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPayouts",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPlayers",
    outputs: [
      {
        internalType: "address[][]",
        name: "",
        type: "address[][]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRounds",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "roundIndex",
        type: "uint256",
      },
    ],
    name: "getWinner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "payouts",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "players",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "roundDurationInBlocks",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "rounds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "roundIndex",
        type: "uint256",
      },
    ],
    name: "withdrawPayout",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052600a60035534801561001557600080fd5b5061147b806100256000396000f3fe6080604052600436106100915760003560e01c80638c65c81f116100595780638c65c81f146101915780638f972385146101ce578063998f1b80146101f9578063b21c793514610236578063fef5ae431461025f57610091565b806329652e86146100965780634129b2c9146100d35780636984d070146101105780636bf90c841461013b5780638b5b9ccc14610166575b600080fd5b3480156100a257600080fd5b506100bd60048036038101906100b89190610b4a565b610269565b6040516100ca9190610f5b565b60405180910390f35b3480156100df57600080fd5b506100fa60048036038101906100f59190610b4a565b61028d565b6040516101079190610e9c565b60405180910390f35b34801561011c57600080fd5b506101256103b0565b6040516101329190610ed9565b60405180910390f35b34801561014757600080fd5b50610150610408565b60405161015d9190610ed9565b60405180910390f35b34801561017257600080fd5b5061017b610460565b6040516101889190610eb7565b60405180910390f35b34801561019d57600080fd5b506101b860048036038101906101b39190610b4a565b610535565b6040516101c59190610f5b565b60405180910390f35b3480156101da57600080fd5b506101e3610559565b6040516101f09190610f5b565b60405180910390f35b34801561020557600080fd5b50610220600480360381019061021b9190610b77565b61055f565b60405161022d9190610e9c565b60405180910390f35b34801561024257600080fd5b5061025d60048036038101906102589190610b4a565b6105b9565b005b6102676107b0565b005b6002818154811061027957600080fd5b906000526020600020016000915090505481565b60008060005b600184815481106102a7576102a6611339565b5b906000526020600020018054905081101561031757600184815481106102d0576102cf611339565b5b90600052602060002001826040516020016102ec929190610e74565b604051602081830303815290604052805190602001209150808061030f90611228565b915050610293565b5060006001848154811061032e5761032d611339565b5b90600052602060002001805490508260001c61034a919061127b565b9050600184815481106103605761035f611339565b5b90600052602060002001818154811061037c5761037b611339565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1692505050919050565b606060008054806020026020016040519081016040528092919081815260200182805480156103fe57602002820191906000526020600020905b8154815260200190600101908083116103ea575b5050505050905090565b6060600280548060200260200160405190810160405280929190818152602001828054801561045657602002820191906000526020600020905b815481526020019060010190808311610442575b5050505050905090565b60606001805480602002602001604051908101604052809291908181526020016000905b8282101561052c5783829060005260206000200180548060200260200160405190810160405280929190818152602001828054801561051857602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190600101908083116104ce575b505050505081526020019060010190610484565b50505050905090565b6000818154811061054557600080fd5b906000526020600020016000915090505481565b60035481565b6001828154811061056f57600080fd5b90600052602060002001818154811061058757600080fd5b906000526020600020016000915091509054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b8060008082815481106105cf576105ce611339565b5b9060005260206000200154905060006105e6610a6c565b905080821061062a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161062190610f3b565b60405180910390fd5b6000600285815481106106405761063f611339565b5b9060005260206000200154905060008111610690576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161068790610f1b565b60405180910390fd5b600061069b8661028d565b90506000600287815481106106b3576106b2611339565b5b906000526020600020018190555060004790508173ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051600060405180830381858888f1935050505015801561070c573d6000803e3d6000fd5b5082816107199190611174565b4714610728576107276112ac565b5b8173ffffffffffffffffffffffffffffffffffffffff167f37e8063b72a944a76de602f32b82fd8c2a1c6f99564c727ffaf913c7762cd420600060016000805490506107749190611174565b8154811061078557610784611339565b5b90600052602060002001548560405161079f929190610f76565b60405180910390a250505050505050565b662386f26fc100003410156107fa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107f190610efb565b60405180910390fd5b6000610804610a6c565b9050600080805490501480610848575080600060016000805490506108299190611174565b8154811061083a57610839611339565b5b906000526020600020015414155b15610915576000819080600181540180825580915050600190039060005260206000200160009091909190915055600160405180602001604052803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250908060018154018082558091505060019003906000526020600020016000909190919091509060016108e6929190610a8e565b5060023490806001815401808255809150506001900390600052602060002001600090919091909150556109ea565b60018080805490506109279190611174565b8154811061093857610937611339565b5b90600052602060002001339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555034600260016002805490506109b89190611174565b815481106109c9576109c8611339565b5b9060005260206000200160008282546109e29190611093565b925050819055505b3373ffffffffffffffffffffffffffffffffffffffff167f29436df7317f4d239eebfb749343ead1f182a224f56f744abd08cf86a2d9cee160006001600080549050610a369190611174565b81548110610a4757610a46611339565b5b906000526020600020015434604051610a61929190610f76565b60405180910390a250565b600060035460035443610a7f91906110e9565b610a89919061111a565b905090565b828054828255906000526020600020908101928215610b07579160200282015b82811115610b065782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190610aae565b5b509050610b149190610b18565b5090565b5b80821115610b31576000816000905550600101610b19565b5090565b600081359050610b448161142e565b92915050565b600060208284031215610b6057610b5f61137b565b5b6000610b6e84828501610b35565b91505092915050565b60008060408385031215610b8e57610b8d61137b565b5b6000610b9c85828601610b35565b9250506020610bad85828601610b35565b9150509250929050565b6000610bc38383610c13565b60208301905092915050565b6000610bdb8383610c31565b60208301905092915050565b6000610bf38383610c40565b905092915050565b6000610c078383610e56565b60208301905092915050565b610c1c816111c8565b82525050565b610c2b816111c8565b82525050565b610c3a816111c8565b82525050565b6000610c4b82610fe4565b610c558185611044565b9350610c6083610f9f565b8060005b83811015610c91578151610c788882610bb7565b9750610c8383611010565b925050600181019050610c64565b5085935050505092915050565b6000610ca982610fef565b610cb38185611055565b9350610cbe83610faf565b8060005b83811015610cf657610cd382611368565b610cdd8882610bcf565b9750610ce88361101d565b925050600181019050610cc2565b5085935050505092915050565b6000610d0e82610ffa565b610d188185611060565b935083602082028501610d2a85610fc4565b8060005b85811015610d665784840389528151610d478582610be7565b9450610d528361102a565b925060208a01995050600181019050610d2e565b50829750879550505050505092915050565b6000610d8382611005565b610d8d8185611071565b9350610d9883610fd4565b8060005b83811015610dc9578151610db08882610bfb565b9750610dbb83611037565b925050600181019050610d9c565b5085935050505092915050565b610de7610de2826111da565b611271565b82525050565b6000610dfa601f83611082565b9150610e058261138d565b602082019050919050565b6000610e1d603083611082565b9150610e28826113b6565b604082019050919050565b6000610e40601683611082565b9150610e4b82611405565b602082019050919050565b610e5f81611204565b82525050565b610e6e81611204565b82525050565b6000610e808285610c9e565b9150610e8c8284610dd6565b6020820191508190509392505050565b6000602082019050610eb16000830184610c22565b92915050565b60006020820190508181036000830152610ed18184610d03565b905092915050565b60006020820190508181036000830152610ef38184610d78565b905092915050565b60006020820190508181036000830152610f1481610ded565b9050919050565b60006020820190508181036000830152610f3481610e10565b9050919050565b60006020820190508181036000830152610f5481610e33565b9050919050565b6000602082019050610f706000830184610e65565b92915050565b6000604082019050610f8b6000830185610e65565b610f986020830184610e65565b9392505050565b6000819050602082019050919050565b60008190508160005260206000209050919050565b6000819050602082019050919050565b6000819050602082019050919050565b600081519050919050565b600081549050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b6000600182019050919050565b6000602082019050919050565b6000602082019050919050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600061109e82611204565b91506110a983611204565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156110de576110dd6112db565b5b828201905092915050565b60006110f482611204565b91506110ff83611204565b92508261110f5761110e61130a565b5b828204905092915050565b600061112582611204565b915061113083611204565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615611169576111686112db565b5b828202905092915050565b600061117f82611204565b915061118a83611204565b92508282101561119d5761119c6112db565b5b828203905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006111d3826111e4565b9050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061122161121c83611380565b6111a8565b9050919050565b600061123382611204565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415611266576112656112db565b5b600182019050919050565b6000819050919050565b600061128682611204565b915061129183611204565b9250826112a1576112a061130a565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052600160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000611374825461120e565b9050919050565b600080fd5b60008160001c9050919050565b7f4d696e696d756d206265742076616c756520697320302e303120657468657200600082015250565b7f5061796f75742068617320616c7265616479206265656e20776974686472617760008201527f6e20666f72207468697320726f756e6400000000000000000000000000000000602082015250565b7f526f756e64206e6f742066696e69736865642079657400000000000000000000600082015250565b61143781611204565b811461144257600080fd5b5056fea2646970667358221220b834ad8a97a2924e791b9bcfde9f6e1a189cef1190fa6098d017bbe11613801064736f6c63430008060033";

export class Lottery__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Lottery> {
    return super.deploy(overrides || {}) as Promise<Lottery>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Lottery {
    return super.attach(address) as Lottery;
  }
  connect(signer: Signer): Lottery__factory {
    return super.connect(signer) as Lottery__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LotteryInterface {
    return new utils.Interface(_abi) as LotteryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Lottery {
    return new Contract(address, _abi, signerOrProvider) as Lottery;
  }
}
