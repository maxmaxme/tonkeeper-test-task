import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../../../../store/context';
import { getTransactionMessage, getTransactionOriginalMessage } from '../../../../../getters/transaction';
import styles from './index.css';
import { Actions } from '../../../../../store/actions';

const resizeTextArea = (target: HTMLTextAreaElement) => () => {
  // Reset field height
  target.style.height = 'inherit';

  // Get the computed styles for the element
  const computed = window.getComputedStyle(target);

  // Calculate the height
  const height = parseInt(computed.getPropertyValue('border-top-width'), 10) +
    parseInt(computed.getPropertyValue('padding-top'), 10) +
    target.scrollHeight +
    parseInt(computed.getPropertyValue('padding-bottom'), 10) +
    parseInt(computed.getPropertyValue('border-bottom-width'), 10);

  target.style.height = `${Math.min(height, 300)}px`;
};

export const TransactionEdit = () => {
  const { state: { activeTransaction: transaction, transactionCustomMessages }, dispatch } = useContext(AppContext);
  const [value, setValue] = useState('');
  const textarea = useRef<HTMLTextAreaElement>(null);
  if (!transaction) {
    return null;
  }
  const transactionCustomMessage = transactionCustomMessages[transaction.transaction_id.lt];
  useEffect(() => {
    setValue(getTransactionMessage(transaction, transactionCustomMessage));
  }, [transaction, transactionCustomMessage]);

  useEffect(() => {
    if (textarea.current) {
      resizeTextArea(textarea.current)();
      textarea.current.focus();
    }
  }, [textarea.current]);

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
        ref={textarea}
        className={styles.textarea}
        value={value}
        placeholder={getTransactionOriginalMessage(transaction)}
        onChange={(e) => {
          if (textarea.current) {
            resizeTextArea(textarea.current)();
          }
          setValue(e.target.value);
        }}
      />
      <button onClick={onSave} className={styles.saveButton}>Save</button>
    </div>
  );
};
