import client from './client';

export interface Transaction {
  id: number; amount: number; description: string; date: string;
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
  account: { id: number; name: string };
  category?: { id: number; name: string };
  notes?: string;
}

export const getTransactions = (from?: string, to?: string) =>
  client.get<Transaction[]>('/transactions', { params: { from, to } }).then(r => r.data);

export const createTransaction = (data: Omit<Transaction, 'id' | 'account' | 'category'> & { accountId: number; categoryId?: number }) =>
  client.post<Transaction>('/transactions', data).then(r => r.data);

export const deleteTransaction = (id: number) => client.delete(`/transactions/${id}`);
