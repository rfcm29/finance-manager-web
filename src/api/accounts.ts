import client from './client';

export interface Account {
  id: number; name: string; type: string; balance: number; currency: string;
}

export const getAccounts = () => client.get<Account[]>('/accounts').then(r => r.data);
export const createAccount = (data: Omit<Account, 'id'> & { initialBalance: number }) =>
  client.post<Account>('/accounts', data).then(r => r.data);
export const deleteAccount = (id: number) => client.delete(`/accounts/${id}`);
