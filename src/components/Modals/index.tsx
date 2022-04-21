import React, { useCallback, useContext } from 'react';
import { Modals as ModalsType } from '../../types/modal';
import { Modal } from './Modal';
import { AppContext } from '../../store/context';
import { Actions } from '../../store/actions';

type Props = {
  modals: ModalsType[]
}

export const Modals = ({
  modals,
}: Props) => {
  const { dispatch } = useContext(AppContext);

  const onClose = useCallback(() => {
    dispatch({ type: Actions.CLOSE_MODAL });
  }, [dispatch]);

  return (<>
    {modals.map((modal) => {
      return (
        <Modal
          key={modal}
          onClose={onClose}
          modal={modal}
        />
      );
    })}
  </>);
};
