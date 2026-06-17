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
      <div className="form-card">
        <h2>Add Account</h2>
        <form onSubmit={e => { e.preventDefault(); createMutation.mutate(form as any); }}>
          <div className="form-row">
            <input placeholder="Account Name" value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
              {['CHECKING','SAVINGS','CREDIT_CARD','INVESTMENT','CASH'].map(t => <option key={t}>{t}</option>)}
            </select>
            <input type="number" placeholder="Initial Balance" value={form.initialBalance}
              onChange={e => setForm(f => ({ ...f, initialBalance: Number(e.target.value) }))} />
            <button type="submit" className="btn-sm" style={{ flexBasis: 'auto', flexGrow: 0 }}>Add Account</button>
          </div>
        </form>
      </div>
      <div className="section-header"><h2>Your Accounts</h2></div>
      <ul className="account-list">
        {accounts.length === 0 && <li className="empty">No accounts yet. Add one above.</li>}
        {accounts.map(a => (
          <li key={a.id} className="account-item">
            <span className="acct-name">{a.name} <span className="badge">{a.type}</span></span>
            <span className="amount">{a.currency} {a.balance.toFixed(2)}</span>
            <button className="btn-danger" onClick={() => deleteMutation.mutate(a.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
