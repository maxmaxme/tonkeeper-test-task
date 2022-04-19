export enum Actions {
  // eslint-disable-next-line no-unused-vars
  SET_DOCUMENT_TITLE = 'SET_DOCUMENT_TITLE'
}

export type Action =
  | { type: Actions.SET_DOCUMENT_TITLE, payload: string }
;
