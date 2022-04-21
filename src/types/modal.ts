export const MODALS = {
  TRANSACTION_EDIT: 'transaction_edit',
};

export type ModalsKeys = keyof typeof MODALS;
export type Modals = typeof MODALS[ModalsKeys];
