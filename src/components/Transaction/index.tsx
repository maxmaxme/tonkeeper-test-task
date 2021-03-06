import React, { useContext, useMemo } from 'react';
import cn from 'classnames';
import { Transaction as TransactionType } from '../../types/transaction';
import styles from './index.css';
import { TransactionIcon } from '../TransactionIcon';
import { getIsInTransaction, getTransactionCurrency, getTransactionDestination, getTransactionFee, getTransactionMessage, getTransactionValue } from '../../getters/transaction';
import { AppContext } from '../../store/context';
import { CopyToClipboard } from '../CopyToClipboard';
import { TransactionComment } from './TransactionComment';

type Props = {
  transaction: TransactionType;
  onClick(): void;
};

const formatWalletNumber = (walletNumber: string) => {
  return walletNumber.slice(0, 4) + 'ยทยทยท' + walletNumber.slice(-4);
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
    transactionFee,
    walletNumber,
    comment,
    currency,
  ] = useMemo(() => [
    getIsInTransaction(transaction),
    getTransactionValue(transaction),
    getTransactionFee(transaction),
    getTransactionDestination(transaction),
    getTransactionMessage(transaction, transactionCustomMessage),
    getTransactionCurrency(),
  ], [transaction, transactionCustomMessage]);

  return (
    <div tabIndex={0} role="button" className={styles.transaction} onClick={onClick}>
      <div className={styles.content}>
        <div className={styles.icon}><TransactionIcon dir={isIn ? 'down' : 'up'} /></div>
        <div className={styles.headers}>
          <div className={styles.direction}>{isIn ? 'Received' : 'Sent'}</div>
          {transactionFee > 0 && (<div className={styles.secondary}>Fee</div>)}
          <div className={styles.secondary}>{isIn ? 'From' : 'To'}</div>
        </div>
        <div className={styles.amount}>
          <div className={cn(styles.sum, { [styles.income]: isIn })}>
            {isIn ? '+' : '-'}&nbsp;
            {amount}&nbsp;
            {currency}
          </div>
          {transactionFee > 0 && (<div className={styles.walletNumber}>- {transactionFee}</div>)}
          <div className={styles.walletNumber}>
            <CopyToClipboard text={walletNumber}>
              {formatWalletNumber(walletNumber)}
            </CopyToClipboard>
          </div>
        </div>
      </div>
      {comment && (
        <TransactionComment text={comment} />
      )}
    </div>
  );
};
