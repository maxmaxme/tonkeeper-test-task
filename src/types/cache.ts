export const KEYS = {
  TRANSACTION_COMMENTS: 'transaction_comments',
};

export type KeysKeys = keyof typeof KEYS;
export type Keys = typeof KEYS[KeysKeys];
