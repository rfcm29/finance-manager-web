import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTransactions, createTransaction, deleteTransaction } from '../api/transactions';
import { getAccounts } from '../api/accounts';

export default function TransactionsPage() {
  const qc = useQueryClient();
  const { data: transactions = [] } = useQuery({ queryKey: ['transactions'], queryFn: () => getTransactions() });
  const { data: accounts = [] } = useQuery({ queryKey: ['accounts'], queryFn: getAccounts });
  const [form, setForm] = useState({
    amount: 0, description: '', date: new Date().toISOString().split('T')[0],
    type: 'EXPENSE' as const, accountId: 0, notes: '',
  });

  const createMutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['transactions', 'accounts'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['transactions', 'accounts'] }),
  });

  return (
    <div className="page">
      <h1>Transactions</h1>
      <form onSubmit={e => { e.preventDefault(); createMutation.mutate(form); }}>
        <h2>Add Transaction</h2>
        <select value={form.accountId} onChange={e => setForm(f => ({ ...f, accountId: Number(e.target.value) }))}>
          <option value={0}>Select Account</option>
          {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
        <input type="number" placeholder="Amount" value={form.amount}
          onChange={e => setForm(f => ({ ...f, amount: Number(e.target.value) }))} required />
        <input placeholder="Description" value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
        <input type="date" value={form.date}
          onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
        <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as any }))}>
          <option>EXPENSE</option><option>INCOME</option><option>TRANSFER</option>
        </select>
        <button type="submit">Add</button>
      </form>
      <ul className="transaction-list">
        {transactions.map(t => (
          <li key={t.id} className={`transaction-item ${t.type.toLowerCase()}`}>
            <span>{t.description}</span>
            <span>{t.account.name}</span>
            <span>{t.date}</span>
            <span className="amount">{t.type === 'EXPENSE' ? '-' : '+'}${t.amount.toFixed(2)}</span>
            <button onClick={() => deleteMutation.mutate(t.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
