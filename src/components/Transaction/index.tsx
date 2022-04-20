import React from 'react';
import cn from 'classnames';
import { Transaction as TransactionType } from '../../types/transaction';
import styles from './index.css';
import { TransactionIcon } from '../TransactionIcon';

type Props = {
  transaction: TransactionType;
};

const formatwalletNumber = (walletNumber: string) => {
  return walletNumber.slice(0, 3) + '...' + walletNumber.slice(-3);
};

export const Transaction = ({
  transaction,
}: Props) => {
  const isIn = !!transaction.in_msg.source;
  const msg = isIn ? transaction.in_msg : transaction.out_msgs[0];
  const {
    value: amount,
    destination: walletNumber,
    message: comment,
  } = msg;
  const currency = 'TON';

  return (
    <div className={styles.transaction}>
      <div className={styles.content}>
        <div className={styles.icon}><TransactionIcon dir={isIn ? 'down' : 'up'} /></div>
        <div className={styles.headers}>
          <div className={styles.direction}>{isIn ? 'Received' : 'Sent'}</div>
          <div className={styles.secondary}>{isIn ? 'From' : 'To'}</div>
        </div>
        <div className={styles.amount}>
          <div className={cn(styles.sum, { [styles.income]: isIn })}>
            {isIn ? '+' : '-'}&nbsp;
            {amount}&nbsp;
            {currency}
          </div>
          <div className={styles.walletNumber}>
            {formatwalletNumber(walletNumber)}
          </div>
        </div>
      </div>
      {comment && (
        <div className={styles.comment}>{comment}</div>
      )}
    </div>
  );
};
