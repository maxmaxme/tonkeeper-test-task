import React, { useCallback, useContext } from 'react';
import { MODALS, Modals } from '../../../types/modal';
import styles from './index.css';
import { AppContext } from '../../../store/context';

type Props = {
  modal: Modals,
  onClose(): void,
}

export const Modal = ({ modal, onClose }: Props) => {
  const getContent = useCallback((modalName: Modals) => {
    switch (modalName) {
    case MODALS.TRANSACTION_EDIT: {
      const { state: { activeTransaction: transaction } } = useContext(AppContext);
      if (!transaction) {
        return 'Loading...';
      }
      return <div>Transaction Edit {transaction.transaction_id.lt}</div>;
    }
    default:
      return null;
    }
  }, []);

  const content = getContent(modal);
  if (!content) {
    return null;
  }

  return (
    <div className={styles.paranja} onClick={onClose}>
      <button className={styles.closeIcon} onClick={onClose}>Close</button>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {content}
      </div>
    </div>
  );
};
