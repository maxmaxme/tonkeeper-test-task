import { TransactionId } from './transaction';

export const KEYS = {
  TRANSACTION_COMMENT: 'transaction_comment',
};

export type KeysKeys = keyof typeof KEYS;
export type Keys = typeof KEYS[KeysKeys];

export const getTransactionCommentCacheKey = (id: TransactionId) => KEYS.TRANSACTION_COMMENT + '_' + id;
