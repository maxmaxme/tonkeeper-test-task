import { Transaction, TransactionId, TransactionRaw } from '../../types/transaction';
import { getMethodUrl } from '../base';

type Response = {
  ok: boolean;
  result?: TransactionRaw[];
  error?: string;
  code?: number;
}

const formatMsg = (msg: TransactionRaw['in_msg']): Transaction['in_msg'] => {
  return {
    source: msg.source,
    destination: msg.destination,
    value: msg.value,
    message: msg.message,
  };
};

const formatTransactionId = (id: TransactionRaw['transaction_id']): Transaction['transaction_id'] => {
  return {
    lt: id.lt,
    hash: id.hash,
  };
};

const formatTransaction = (transaction: TransactionRaw): Transaction => ({
  transaction_id: formatTransactionId(transaction.transaction_id),
  time: transaction.utime,
  fee: {
    fee: transaction.fee,
    other_fee: transaction.other_fee,
    storage_fee: transaction.storage_fee,
  },
  in_msg: formatMsg(transaction.in_msg),
  out_msgs: transaction.out_msgs.map(formatMsg),
});

type Props = {
  address: string;
  limit: number;
  transactionId?: TransactionId;
}

export const getTransactionList = ({
  address,
  limit,
}: Props): Promise<Transaction[]> => {
  return fetch(getMethodUrl('getTransactions', {
    address,
    limit,
    to_lt: 0,
    archival: 0,
    // lt: transactionId?.lt, // todo
    // hash: transactionId?.hash,
  }))
    .then((response) => response.json())
    .then(({ ok, result, error }: Response): Transaction[] => {
      if (!ok || result === undefined) {
        throw new Error(error);
      }
      return result.map(formatTransaction);
    });
};
