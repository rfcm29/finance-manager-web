import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAccounts, createAccount, deleteAccount } from '../api/accounts';

export default function AccountsPage() {
  const qc = useQueryClient();
  const { data: accounts = [] } = useQuery({ queryKey: ['accounts'], queryFn: getAccounts });
  const [form, setForm] = useState({ name: '', type: 'CHECKING', initialBalance: 0, currency: 'USD' });

  const createMutation = useMutation({
    mutationFn: createAccount,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['accounts'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['accounts'] }),
  });

  return (
    <div className="page">
      <h1>Accounts</h1>
      <form onSubmit={e => { e.preventDefault(); createMutation.mutate(form as any); }}>
        <h2>Add Account</h2>
        <input placeholder="Account Name" value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
        <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
          {['CHECKING','SAVINGS','CREDIT_CARD','INVESTMENT','CASH'].map(t => <option key={t}>{t}</option>)}
        </select>
        <input type="number" placeholder="Initial Balance" value={form.initialBalance}
          onChange={e => setForm(f => ({ ...f, initialBalance: Number(e.target.value) }))} />
        <button type="submit">Add Account</button>
      </form>
      <ul className="account-list">
        {accounts.map(a => (
          <li key={a.id} className="account-item">
            <div>
              <strong>{a.name}</strong> <span className="badge">{a.type}</span>
            </div>
            <span className="amount">{a.currency} {a.balance.toFixed(2)}</span>
            <button onClick={() => deleteMutation.mutate(a.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
