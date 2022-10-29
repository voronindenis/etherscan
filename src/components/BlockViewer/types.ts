export interface IAccess {
  address: string;
  storageKeys: string[];
}

export interface ITransactions {
  type: string;
  blockHash: string;
  blockNumber: string;
  from: string;
  gas: string;
  hash: string;
  input: string;
  nonce: string;
  to: string;
  transactionIndex: string;
  value: string;
  v: string;
  r: string;
  s: string;
  gasPrice: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
  chainId: string;
  accessList: IAccess[];
}

export interface IBlock {
  jsonrpc: string;
  result: {
    number: string;
    hash: string;
    parentHash: string;
    sha3Uncles: string;
    logsBloom: string;
    transactionsRoot: string;
    stateRoot: string;
    receiptsRoot: string;
    miner: string;
    difficulty: string;
    totalDifficulty: string;
    extraData: string;
    size: string;
    gasLimit: string;
    gasUsed: string;
    timestamp: string;
    transactions: ITransactions[];
    uncles: unknown[];
    baseFeePerGas: string;
    nonce: string;
    mixHash: string;
  };
  id: number;
}
