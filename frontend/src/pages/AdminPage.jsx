import { useState, useEffect } from 'react';
import { Users, Heart, X, CheckCircle, HelpCircle, Trash2, LogOut, Download } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || '';
const ADMIN_KEY_STORAGE = 'wedding_admin_key';

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState(localStorage.getItem(ADMIN_KEY_STORAGE) || '');
  const [inputKey, setInputKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchRSVPs = async (key) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/admin/rsvps`, {
        headers: { 'x-admin-key': key }
      });
      if (res.status === 401) {
        setError('Invalid admin key.');
        setAuthenticated(false);
        localStorage.removeItem(ADMIN_KEY_STORAGE);
        setLoading(false);
        return;
      }
      const json = await res.json();
      setData(json);
      setAuthenticated(true);
      localStorage.setItem(ADMIN_KEY_STORAGE, key);
      setAdminKey(key);
    } catch {
      setError('Failed to connect to server.');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (adminKey) fetchRSVPs(adminKey);
    // eslint-disable-next-line
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    fetchRSVPs(inputKey);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setData(null);
    setAdminKey('');
    localStorage.removeItem(ADMIN_KEY_STORAGE);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/api/admin/rsvps/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey }
      });
      setData(prev => ({
        ...prev,
        rsvps: prev.rsvps.filter(r => r._id !== id),
        stats: {
          ...prev.stats,
          total: prev.stats.total - 1,
        }
      }));
      setDeleteConfirm(null);
    } catch {
      alert('Failed to delete.');
    }
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Attending', 'Guests', 'Dietary', 'Message', 'Date'];
    const rows = data.rsvps.map(r => [
      r.name, r.email, r.phone || '', r.attending, r.guests,
      r.dietaryRestrictions || '', r.message || '',
      new Date(r.createdAt).toLocaleDateString()
    ]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rsvps.csv';
    a.click();
  };

  const filtered = data?.rsvps?.filter(r => filter === 'all' || r.attending === filter) || [];

  const attendingBadge = (status) => {
    const styles = {
      yes: 'bg-green-100 text-green-700',
      no: 'bg-red-100 text-red-700',
      maybe: 'bg-yellow-100 text-yellow-700',
    };
    const labels = { yes: '✓ Attending', no: '✗ Declining', maybe: '? Maybe' };
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="font-script text-5xl text-gold mb-2">A & K</h1>
            <p className="font-display text-2xl text-charcoal font-light">Admin Dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="bg-white border border-champagne p-10 shadow-sm">
            <label className="font-body text-xs tracking-widest uppercase text-charcoal/50 mb-2 block">
              Admin Key
            </label>
            <input
              type="password"
              value={inputKey}
              onChange={e => setInputKey(e.target.value)}
              placeholder="Enter admin key"
              className="w-full border-b border-charcoal/20 focus:border-gold outline-none py-3 font-body text-sm text-charcoal mb-8 bg-transparent"
              required
            />
            {error && <p className="text-red-500 text-sm mb-4 font-body">{error}</p>}
            <button type="submit" disabled={loading} className="btn-gold w-full">
              <span>{loading ? 'Authenticating...' : 'Access Dashboard'}</span>
            </button>
          </form>
          <p className="text-center font-body text-xs text-charcoal/30 mt-4">
            Default key: abhijith-kelsey-2025
          </p>
        </div>
      </div>
    );
  }

  const { stats } = data || {};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-charcoal border-b border-gold/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-script text-3xl text-gold">A & K</span>
            <span className="font-body text-ivory/40 text-xs tracking-widest uppercase">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => fetchRSVPs(adminKey)} className="btn-outline-gold text-xs py-2 px-4">
              Refresh
            </button>
            <button onClick={exportCSV} className="btn-gold text-xs py-2 px-4 flex items-center gap-2">
              <span><Download size={14} className="inline mr-1" />Export CSV</span>
            </button>
            <button onClick={handleLogout} className="text-ivory/40 hover:text-ivory transition-colors flex items-center gap-1.5 font-body text-xs">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
            {[
              { label: 'Total RSVPs', value: stats.total, icon: <Users size={18} />, color: 'text-charcoal' },
              { label: 'Attending', value: stats.attending, icon: <CheckCircle size={18} />, color: 'text-green-600' },
              { label: 'Declining', value: stats.notAttending, icon: <X size={18} />, color: 'text-red-500' },
              { label: 'Maybe', value: stats.maybe, icon: <HelpCircle size={18} />, color: 'text-yellow-500' },
              { label: 'Total Guests', value: stats.totalGuests, icon: <Heart size={18} />, color: 'text-gold' },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-gray-100 p-6 shadow-sm">
                <div className={`${stat.color} mb-2`}>{stat.icon}</div>
                <div className={`font-display text-4xl font-light ${stat.color} mb-1`}>{stat.value}</div>
                <div className="font-body text-xs text-gray-400 tracking-widest uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          {['all', 'yes', 'no', 'maybe'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-body text-xs tracking-widest uppercase py-2 px-5 border transition-all duration-200 ${
                filter === f
                  ? 'bg-gold border-gold text-white'
                  : 'border-gray-200 text-gray-500 hover:border-gold hover:text-gold'
              }`}
            >
              {f === 'all' ? 'All' : f === 'yes' ? 'Attending' : f === 'no' ? 'Declining' : 'Maybe'}
              {f !== 'all' && stats && (
                <span className="ml-2 opacity-60">
                  ({f === 'yes' ? stats.attending : f === 'no' ? stats.notAttending : stats.maybe})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {['Name', 'Email', 'Phone', 'Status', 'Guests', 'Dietary', 'Message', 'Date', ''].map(h => (
                    <th key={h} className="px-5 py-4 text-left font-body text-xs tracking-widest uppercase text-gray-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-5 py-16 text-center font-body text-gray-400 text-sm">
                      No RSVPs found
                    </td>
                  </tr>
                ) : (
                  filtered.map(rsvp => (
                    <tr key={rsvp._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 font-body text-sm font-medium text-charcoal">{rsvp.name}</td>
                      <td className="px-5 py-4 font-body text-sm text-gray-500">{rsvp.email}</td>
                      <td className="px-5 py-4 font-body text-sm text-gray-500">{rsvp.phone || '—'}</td>
                      <td className="px-5 py-4">{attendingBadge(rsvp.attending)}</td>
                      <td className="px-5 py-4 font-body text-sm text-gray-500 text-center">{rsvp.guests}</td>
                      <td className="px-5 py-4 font-body text-sm text-gray-500 max-w-xs truncate">{rsvp.dietaryRestrictions || '—'}</td>
                      <td className="px-5 py-4 font-body text-sm text-gray-400 max-w-xs truncate italic">{rsvp.message || '—'}</td>
                      <td className="px-5 py-4 font-body text-xs text-gray-400 whitespace-nowrap">
                        {new Date(rsvp.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-5 py-4">
                        {deleteConfirm === rsvp._id ? (
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleDelete(rsvp._id)} className="text-red-500 font-body text-xs hover:underline">Confirm</button>
                            <button onClick={() => setDeleteConfirm(null)} className="text-gray-400 font-body text-xs hover:underline">Cancel</button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteConfirm(rsvp._id)} className="text-gray-300 hover:text-red-400 transition-colors">
                            <Trash2 size={15} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {loading && (
          <div className="text-center py-10 font-body text-gray-400 text-sm">Loading RSVPs...</div>
        )}
      </div>
    </div>
  );
}
