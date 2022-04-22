import React, { useContext, useMemo } from 'react';
import cn from 'classnames';
import { Transaction as TransactionType } from '../../types/transaction';
import styles from './index.css';
import { TransactionIcon } from '../TransactionIcon';
import { getIsInTransaction, getTransactionCurrency, getTransactionDestination, getTransactionMessage, getTransactionValue } from '../../getters/transaction';
import { AppContext } from '../../store/context';
import { CopyToClipboard } from '../CopyToClipboard';

type Props = {
  transaction: TransactionType;
  onClick(): void;
};

const formatWalletNumber = (walletNumber: string) => {
  return walletNumber.slice(0, 4) + '···' + walletNumber.slice(-4);
};

export const Transaction = ({
  transaction,
  onClick,
}: Props) => {
  const { state: { transactionCustomMessages } } = useContext(AppContext);
  const transactionCustomMessage = transactionCustomMessages[transaction.transaction_id.lt];
  const [
    isIn,
    amount,
    walletNumber,
    comment,
    currency,
  ] = useMemo(() => [
    getIsInTransaction(transaction),
    getTransactionValue(transaction),
    getTransactionDestination(transaction),
    getTransactionMessage(transaction, transactionCustomMessage),
    getTransactionCurrency(),
  ], [transaction, transactionCustomMessage]);

  return (
    <button className={styles.transaction} onClick={onClick}>
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
            <CopyToClipboard text={walletNumber}>
              {formatWalletNumber(walletNumber)}
            </CopyToClipboard>
          </div>
        </div>
      </div>
      {comment && (
        <div className={styles.comment}>{comment}</div>
      )}
    </button>
  );
};
