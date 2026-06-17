import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

export default function Layout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="app">
      <nav className="sidebar">
        <div className="logo">💰 Finance</div>
        <Link to="/">Dashboard</Link>
        <Link to="/accounts">Accounts</Link>
        <Link to="/transactions">Transactions</Link>
        <div className="spacer" />
        <div className="user-info">
          <span>{user?.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
