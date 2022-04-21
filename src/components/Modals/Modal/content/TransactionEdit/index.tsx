import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../../../store/context';
import { getTransactionMessage, getTransactionOriginalMessage } from '../../../../../getters/transaction';
import styles from './index.css';
import { Actions } from '../../../../../store/actions';

const handleKeyDown = (e: any) => {
  // Reset field height
  e.target.style.height = 'inherit';

  // Get the computed styles for the element
  const computed = window.getComputedStyle(e.target);

  // Calculate the height
  const height = parseInt(computed.getPropertyValue('border-top-width'), 10) +
    parseInt(computed.getPropertyValue('padding-top'), 10) +
    e.target.scrollHeight +
    parseInt(computed.getPropertyValue('padding-bottom'), 10) +
    parseInt(computed.getPropertyValue('border-bottom-width'), 10);

  e.target.style.height = `${Math.min(height, 300)}px`;
};

export const TransactionEdit = () => {
  const { state: { activeTransaction: transaction }, dispatch } = useContext(AppContext);
  const [value, setValue] = useState('');
  if (!transaction) {
    return null;
  }
  useEffect(() => {
    setValue(getTransactionMessage(transaction));
  }, [transaction]);

  const onSave = useCallback(() => {
    dispatch({ type: Actions.CLOSE_MODAL });
    dispatch({
      type: Actions.SET_TRANSACTION_CUSTOM_MESSAGE,
      payload: {
        transactionId: transaction.transaction_id,
        message: value,
      },
    });
  }, [dispatch, transaction, value]);

  return (
    <div className={styles.root}>
      <textarea
        className={styles.textarea}
        onKeyDown={handleKeyDown}
        value={value}
        placeholder={getTransactionOriginalMessage(transaction)}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button onClick={onSave} className={styles.saveButton}>Save</button>
    </div>
  );
};
