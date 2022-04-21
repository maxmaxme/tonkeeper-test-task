import { Transaction } from '../components/Transaction';

export type TransactionRaw = {
  '@type': string,
  'utime': number,
  'data': string,
  'transaction_id': {
    '@type': string,
    'lt': string,
    'hash': string,
  },
  'fee': string,
  'storage_fee': string,
  'other_fee': string,
  'in_msg': {
    '@type': string,
    'source': string,
    'destination': string,
    'value': string,
    'fwd_fee': string,
    'ihr_fee': string,
    'created_lt': string,
    'body_hash': string,
    'msg_data': {
      '@type': string,
      'text': string
    },
    'message': string
  },
  'out_msgs': []
};

export type TransactionId = {
  lt: string,
  hash: string,
};

// https://github.com/toncenter/ton-http-api/blob/master/pyTON/client.py#L224
type TransactionMsg = {
  source: string,
  destination: string,
  value: string,
  message: string
};

type Fee = {
  fee: string,
  storage_fee: string,
  other_fee: string,
}
export type Transaction = {
  time: number,
  transaction_id: TransactionId,
  fee: Fee,
  in_msg: TransactionMsg,
  out_msgs: TransactionMsg[],
};

export type TransactionDict = {[key: TransactionId['lt']]: Transaction};
export type TransactionMessagesDict = {[key: TransactionId['lt']]: string};
