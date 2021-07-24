/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Lottery, LotteryInterface } from "../Lottery";

const _abi = [
  {
    inputs: [],
    name: "enterCurrentRound",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentRoundStartingBlock",
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
  "0x6080604052600a60035534801561001557600080fd5b506113cc806100256000396000f3fe60806040526004361061009c5760003560e01c80638b5b9ccc116100645780638b5b9ccc1461019c5780638c65c81f146101c75780638f97238514610204578063998f1b801461022f578063b21c79351461026c578063fef5ae43146102955761009c565b806329652e86146100a15780634129b2c9146100de5780636984d0701461011b5780636bf90c841461014657806371f47d8314610171575b600080fd5b3480156100ad57600080fd5b506100c860048036038101906100c39190610af3565b61029f565b6040516100d59190610f04565b60405180910390f35b3480156100ea57600080fd5b5061010560048036038101906101009190610af3565b6102c3565b6040516101129190610e45565b60405180910390f35b34801561012757600080fd5b5061013061046b565b60405161013d9190610e82565b60405180910390f35b34801561015257600080fd5b5061015b6104c3565b6040516101689190610e82565b60405180910390f35b34801561017d57600080fd5b5061018661051b565b6040516101939190610f04565b60405180910390f35b3480156101a857600080fd5b506101b161053d565b6040516101be9190610e60565b60405180910390f35b3480156101d357600080fd5b506101ee60048036038101906101e99190610af3565b610612565b6040516101fb9190610f04565b60405180910390f35b34801561021057600080fd5b50610219610636565b6040516102269190610f04565b60405180910390f35b34801561023b57600080fd5b5061025660048036038101906102519190610b20565b61063c565b6040516102639190610e45565b60405180910390f35b34801561027857600080fd5b50610293600480360381019061028e9190610af3565b610696565b005b61029d6107fa565b005b600281815481106102af57600080fd5b906000526020600020016000915090505481565b60008160008082815481106102db576102da61128a565b5b906000526020600020015490506001600354826102f89190611013565b61030291906110f4565b431015610344576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161033b90610ee4565b60405180910390fd5b600080600090505b600186815481106103605761035f61128a565b5b90600052602060002001805490508110156103d057600186815481106103895761038861128a565b5b90600052602060002001826040516020016103a5929190610e1d565b60405160208183030381529060405280519060200120915080806103c8906111a8565b91505061034c565b506000600186815481106103e7576103e661128a565b5b90600052602060002001805490508260001c61040391906111fb565b9050600186815481106104195761041861128a565b5b9060005260206000200181815481106104355761043461128a565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16945050505050919050565b606060008054806020026020016040519081016040528092919081815260200182805480156104b957602002820191906000526020600020905b8154815260200190600101908083116104a5575b5050505050905090565b6060600280548060200260200160405190810160405280929190818152602001828054801561051157602002820191906000526020600020905b8154815260200190600101908083116104fd575b5050505050905090565b60006003546003544361052e9190611069565b610538919061109a565b905090565b60606001805480602002602001604051908101604052809291908181526020016000905b82821015610609578382906000526020600020018054806020026020016040519081016040528092919081815260200182805480156105f557602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190600101908083116105ab575b505050505081526020019060010190610561565b50505050905090565b6000818154811061062257600080fd5b906000526020600020016000915090505481565b60035481565b6001828154811061064c57600080fd5b90600052602060002001818154811061066457600080fd5b906000526020600020016000915091509054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b8060008082815481106106ac576106ab61128a565b5b906000526020600020015490506001600354826106c99190611013565b6106d391906110f4565b431015610715576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161070c90610ee4565b60405180910390fd5b60006002848154811061072b5761072a61128a565b5b906000526020600020015490506000811161077b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161077290610ec4565b60405180910390fd5b6000610786856102c3565b905060006002868154811061079e5761079d61128a565b5b90600052602060002001819055508073ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f193505050501580156107f2573d6000803e3d6000fd5b505050505050565b662386f26fc10000341015610844576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161083b90610ea4565b60405180910390fd5b600061084e61051b565b90506000808054905014806108925750806000600160008054905061087391906110f4565b815481106108845761088361128a565b5b906000526020600020015414155b1561095f576000819080600181540180825580915050600190039060005260206000200160009091909190915055600160405180602001604052803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681525090806001815401808255809150506001900390600052602060002001600090919091909150906001610930929190610a37565b506002349080600181540180825580915050600190039060005260206000200160009091909190915055610a34565b600180808054905061097191906110f4565b815481106109825761098161128a565b5b90600052602060002001339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503460026001600280549050610a0291906110f4565b81548110610a1357610a1261128a565b5b906000526020600020016000828254610a2c9190611013565b925050819055505b50565b828054828255906000526020600020908101928215610ab0579160200282015b82811115610aaf5782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190610a57565b5b509050610abd9190610ac1565b5090565b5b80821115610ada576000816000905550600101610ac2565b5090565b600081359050610aed8161137f565b92915050565b600060208284031215610b0957610b086112cc565b5b6000610b1784828501610ade565b91505092915050565b60008060408385031215610b3757610b366112cc565b5b6000610b4585828601610ade565b9250506020610b5685828601610ade565b9150509250929050565b6000610b6c8383610bbc565b60208301905092915050565b6000610b848383610bda565b60208301905092915050565b6000610b9c8383610be9565b905092915050565b6000610bb08383610dff565b60208301905092915050565b610bc581611148565b82525050565b610bd481611148565b82525050565b610be381611148565b82525050565b6000610bf482610f64565b610bfe8185610fc4565b9350610c0983610f1f565b8060005b83811015610c3a578151610c218882610b60565b9750610c2c83610f90565b925050600181019050610c0d565b5085935050505092915050565b6000610c5282610f6f565b610c5c8185610fd5565b9350610c6783610f2f565b8060005b83811015610c9f57610c7c826112b9565b610c868882610b78565b9750610c9183610f9d565b925050600181019050610c6b565b5085935050505092915050565b6000610cb782610f7a565b610cc18185610fe0565b935083602082028501610cd385610f44565b8060005b85811015610d0f5784840389528151610cf08582610b90565b9450610cfb83610faa565b925060208a01995050600181019050610cd7565b50829750879550505050505092915050565b6000610d2c82610f85565b610d368185610ff1565b9350610d4183610f54565b8060005b83811015610d72578151610d598882610ba4565b9750610d6483610fb7565b925050600181019050610d45565b5085935050505092915050565b610d90610d8b8261115a565b6111f1565b82525050565b6000610da3601f83611002565b9150610dae826112de565b602082019050919050565b6000610dc6603083611002565b9150610dd182611307565b604082019050919050565b6000610de9601683611002565b9150610df482611356565b602082019050919050565b610e0881611184565b82525050565b610e1781611184565b82525050565b6000610e298285610c47565b9150610e358284610d7f565b6020820191508190509392505050565b6000602082019050610e5a6000830184610bcb565b92915050565b60006020820190508181036000830152610e7a8184610cac565b905092915050565b60006020820190508181036000830152610e9c8184610d21565b905092915050565b60006020820190508181036000830152610ebd81610d96565b9050919050565b60006020820190508181036000830152610edd81610db9565b9050919050565b60006020820190508181036000830152610efd81610ddc565b9050919050565b6000602082019050610f196000830184610e0e565b92915050565b6000819050602082019050919050565b60008190508160005260206000209050919050565b6000819050602082019050919050565b6000819050602082019050919050565b600081519050919050565b600081549050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b6000600182019050919050565b6000602082019050919050565b6000602082019050919050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600061101e82611184565b915061102983611184565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561105e5761105d61122c565b5b828201905092915050565b600061107482611184565b915061107f83611184565b92508261108f5761108e61125b565b5b828204905092915050565b60006110a582611184565b91506110b083611184565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156110e9576110e861122c565b5b828202905092915050565b60006110ff82611184565b915061110a83611184565b92508282101561111d5761111c61122c565b5b828203905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061115382611164565b9050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60006111a161119c836112d1565b611128565b9050919050565b60006111b382611184565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156111e6576111e561122c565b5b600182019050919050565b6000819050919050565b600061120682611184565b915061121183611184565b9250826112215761122061125b565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006112c5825461118e565b9050919050565b600080fd5b60008160001c9050919050565b7f4d696e696d756d206265742076616c756520697320302e303120657468657200600082015250565b7f5061796f75742068617320616c7265616479206265656e20776974686472617760008201527f6e20666f72207468697320726f756e6400000000000000000000000000000000602082015250565b7f526f756e64206e6f742066696e69736865642079657400000000000000000000600082015250565b61138881611184565b811461139357600080fd5b5056fea264697066735822122089a9f29ea25725fddcbaa4b30201287b1393d95cc098144624dc2c8566e67acd64736f6c63430008060033";

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
