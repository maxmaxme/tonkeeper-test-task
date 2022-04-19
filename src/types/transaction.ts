export type TransactionId = string;
export type Transaction = {
    transaction_id: TransactionId;
    amount: string;
    currency: string;
    direction: 'in' | 'out';
    keeperNumber: string;
    fee?: string;
    comment?: string;
};
