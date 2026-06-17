import { useQuery } from '@tanstack/react-query';
import { getAccounts } from '../api/accounts';
import { getTransactions } from '../api/transactions';
import { useAuthStore } from '../store/auth';

export default function DashboardPage() {
  const user = useAuthStore(s => s.user);
  const { data: accounts = [] } = useQuery({ queryKey: ['accounts'], queryFn: getAccounts });
  const { data: transactions = [] } = useQuery({ queryKey: ['transactions'], queryFn: () => getTransactions() });

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthlyIncome = transactions
    .filter(t => t.type === 'INCOME' && t.date.startsWith(thisMonth))
    .reduce((sum, t) => sum + t.amount, 0);
  const monthlyExpenses = transactions
    .filter(t => t.type === 'EXPENSE' && t.date.startsWith(thisMonth))
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="page">
      <h1>Welcome back, {user?.name} 👋</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Balance</h3>
          <p className="amount">${totalBalance.toFixed(2)}</p>
        </div>
        <div className="stat-card income">
          <h3>Monthly Income</h3>
          <p className="amount">${monthlyIncome.toFixed(2)}</p>
        </div>
        <div className="stat-card expense">
          <h3>Monthly Expenses</h3>
          <p className="amount">${monthlyExpenses.toFixed(2)}</p>
        </div>
      </div>
      <div className="section-header"><h2>Recent Transactions</h2></div>
      <ul className="transaction-list">
        {transactions.length === 0 && <li className="empty">No transactions yet.</li>}
        {transactions.slice(0, 10).map(t => (
          <li key={t.id} className={`transaction-item ${t.type.toLowerCase()}`}>
            <span className="desc">{t.description}</span>
            <span className="date">{t.date}</span>
            <span className="amount">{t.type === 'EXPENSE' ? '-' : '+'}${t.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
