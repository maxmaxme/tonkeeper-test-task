import React, { useCallback } from 'react';
import { MODALS, Modals } from '../../../types/modal';
import styles from './index.css';
import { TransactionEdit } from './content/TransactionEdit';

type Props = {
  modal: Modals,
  onClose(): void,
}

export const Modal = ({ modal, onClose }: Props) => {
  const getContent = useCallback((modalName: Modals) => {
    switch (modalName) {
    case MODALS.TRANSACTION_EDIT: {
      return <TransactionEdit />;
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
    <div className={styles.modal}>
      <div className={styles.paranja} onClick={onClose}>
        <button className={styles.closeIcon} onClick={onClose}>Close</button>
      </div>
      <div className={styles.content}>
        {content}
      </div>
    </div>
  );
};
