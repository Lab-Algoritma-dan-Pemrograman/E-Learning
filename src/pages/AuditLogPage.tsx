import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { useStore } from '../store/useStore';
import { monitoringService, ActivityLog } from '../services/monitoringService';
import { Trash2, Search, Filter, RefreshCw, Download, Calendar, Clock, Shield, LogIn, LogOut, FileText, Key, Brain, ChevronLeft, ChevronRight, X, Lock, BookOpen, RotateCcw } from 'lucide-react';
import { cn } from '../lib/utils';

const EVENT_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  login: { label: 'Login', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: <LogIn size={12} /> },
  logout: { label: 'Logout', color: 'bg-zinc-100 text-zinc-600 border-zinc-200', icon: <LogOut size={12} /> },
  start_test: { label: 'Mulai Ujian', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: <FileText size={12} /> },
  submit_test: { label: 'Submit Ujian', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: <FileText size={12} /> },
  token_generated: { label: 'Token Dibuat', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: <Key size={12} /> },
  token_used: { label: 'Token Dipakai', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: <Key size={12} /> },
  access_modified: { label: 'Akses Diubah', color: 'bg-red-50 text-red-700 border-red-200', icon: <Shield size={12} /> },
  ai_grading: { label: 'AI Grading', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: <Brain size={12} /> },
  curriculum_modified: { label: 'Ubah Kurikulum', color: 'bg-rose-50 text-rose-700 border-rose-200', icon: <BookOpen size={12} /> },
  progress_reset: { label: 'Reset Progress', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: <RotateCcw size={12} /> },
};

const formatGMT7 = (iso: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  return new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  }).format(d);
};

const formatShortGMT7 = (iso: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  return new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  }).format(d);
};

export const AuditLogPage: React.FC = () => {
  const { user } = useStore();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [eventFilter, setEventFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedLogs, setSelectedLogs] = useState<Set<string>>(new Set());
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const pageSize = 25;
  const isAdmin = user?.role === 'admin';

  if (!['admin', 'kordas'].includes(user?.role || '')) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
          <div className="w-20 h-20 bg-rose-50 text-rose-700 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
            <Lock size={40} />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 mb-2">Akses Terbatas</h1>
          <p className="text-zinc-500 max-w-sm">Halaman ini hanya dapat diakses oleh Admin atau Koordinator.</p>
        </div>
      </Layout>
    );
  }

  const fetchLogs = async () => {
    setIsRefreshing(true);
    try {
      const data = await monitoringService.getAuditLogs(500);
      setLogs(data);
    } catch (e) { console.error(e); }
    finally { setIsRefreshing(false); setLoading(false); }
  };

  useEffect(() => {
    fetchLogs();
    const unsub = monitoringService.subscribeAuditLogs(setLogs);
    return unsub;
  }, []);

  const filtered = logs.filter(log => {
    const matchSearch = search === '' || log.nama.toLowerCase().includes(search.toLowerCase()) || log.nim.includes(search) || log.details.toLowerCase().includes(search.toLowerCase());
    const matchEvent = eventFilter === 'all' || log.event_type === eventFilter;
    let matchDate = true;
    if (dateFrom) {
      const from = new Date(dateFrom);
      from.setHours(0, 0, 0, 0);
      matchDate = matchDate && new Date(log.timestamp) >= from;
    }
    if (dateTo) {
      const to = new Date(dateTo);
      to.setHours(23, 59, 59, 999);
      matchDate = matchDate && new Date(log.timestamp) <= to;
    }
    return matchSearch && matchEvent && matchDate;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleDeleteSelected = async () => {
    setIsDeleting(true);
    try {
      for (const id of selectedLogs) {
        await monitoringService.deleteAuditLog(id);
      }
      setSelectedLogs(new Set());
      await fetchLogs();
    } catch (e) { console.error(e); }
    finally { setIsDeleting(false); setDeleteConfirm(false); }
  };

  const handleDeleteAll = async () => {
    setIsDeleting(true);
    try {
      for (const log of filtered) {
        if (log.id) await monitoringService.deleteAuditLog(log.id);
      }
      setSelectedLogs(new Set());
      await fetchLogs();
    } catch (e) { console.error(e); }
    finally { setIsDeleting(false); setDeleteConfirm(false); }
  };

  const toggleSelect = (id: string) => {
    setSelectedLogs(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedLogs.size === paginated.length) {
      setSelectedLogs(new Set());
    } else {
      setSelectedLogs(new Set(paginated.map(l => l.id).filter(Boolean) as string[]));
    }
  };

  const exportCSV = () => {
    const headers = 'Timestamp (GMT+7),NIM,Nama,Event,Detail\n';
    const rows = filtered.map(l => `"${formatGMT7(l.timestamp)}","${l.nim}","${l.nama}","${l.event_type}","${l.details.replace(/"/g, '""')}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `audit-log-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setSearch(''); setEventFilter('all'); setDateFrom(''); setDateTo(''); setCurrentPage(1);
  };

  if (loading) {
    return <Layout><div className="flex items-center justify-center h-64"><RefreshCw className="w-8 h-8 animate-spin text-rose-700" /></div></Layout>;
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Audit Log</h1>
            <p className="text-sm text-zinc-500 mt-1">{filtered.length} entri • Zona waktu GMT+7 (WIB)</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm font-bold text-zinc-700 hover:bg-zinc-50">
              <Download size={14} /> Export CSV
            </button>
            <button onClick={fetchLogs} disabled={isRefreshing} className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm font-bold text-zinc-700 hover:bg-zinc-50 disabled:opacity-50">
              <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} /> Refresh
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-4 space-y-3">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} placeholder="Cari nama, NIM, atau detail..." className="w-full pl-9 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-700/20" />
            </div>
            <select value={eventFilter} onChange={e => { setEventFilter(e.target.value); setCurrentPage(1); }} className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold text-zinc-700 focus:outline-none focus:ring-2 focus:ring-rose-700/20">
              <option value="all">Semua Event</option>
              {Object.entries(EVENT_CONFIG).map(([key, val]) => <option key={key} value={key}>{val.label}</option>)}
            </select>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-zinc-400" />
              <input type="date" value={dateFrom} onChange={e => { setDateFrom(e.target.value); setCurrentPage(1); }} className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-700/20" />
              <span className="text-zinc-400 text-xs">s/d</span>
              <input type="date" value={dateTo} onChange={e => { setDateTo(e.target.value); setCurrentPage(1); }} className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-700/20" />
            </div>
            {(search || eventFilter !== 'all' || dateFrom || dateTo) && (
              <button onClick={clearFilters} className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-800 bg-zinc-100 rounded-lg hover:bg-zinc-200">
                <X size={12} /> Hapus Filter
              </button>
            )}
          </div>
        </div>

        {/* Bulk Actions - admin only */}
        {isAdmin && selectedLogs.size > 0 && (
          <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
            <span className="text-sm font-bold text-rose-700">{selectedLogs.size} dipilih</span>
            <div className="flex-1" />
            <button onClick={() => setDeleteConfirm(true)} disabled={isDeleting} className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 disabled:opacity-50">
              <Trash2 size={12} /> Hapus Terpilih
            </button>
          </div>
        )}

        {/* Log Table */}
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/50">
                  {isAdmin && (
                    <th className="w-10 p-3">
                      <input type="checkbox" checked={selectedLogs.size === paginated.length && paginated.length > 0} onChange={toggleSelectAll} className="rounded border-zinc-300" />
                    </th>
                  )}
                  <th className="text-left text-[10px] font-bold text-zinc-400 uppercase tracking-widest p-3">Waktu (GMT+7)</th>
                  <th className="text-left text-[10px] font-bold text-zinc-400 uppercase tracking-widest p-3">Mahasiswa</th>
                  <th className="text-left text-[10px] font-bold text-zinc-400 uppercase tracking-widest p-3">Event</th>
                  <th className="text-left text-[10px] font-bold text-zinc-400 uppercase tracking-widest p-3">Detail</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map(log => {
                  const config = EVENT_CONFIG[log.event_type] || { label: log.event_type, color: 'bg-zinc-100 text-zinc-600 border-zinc-200', icon: <Filter size={12} /> };
                  return (
                    <tr key={log.id} className="border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors">
                      {isAdmin && (
                        <td className="p-3">
                          {log.id && <input type="checkbox" checked={selectedLogs.has(log.id)} onChange={() => toggleSelect(log.id)} className="rounded border-zinc-300" />}
                        </td>
                      )}
                      <td className="p-3">
                        <div className="text-sm font-mono text-zinc-700">{formatShortGMT7(log.timestamp)}</div>
                        <div className="text-[10px] text-zinc-400">{new Date(log.timestamp).toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta', day: '2-digit', month: 'short', year: 'numeric' })}</div>
                      </td>
                      <td className="p-3">
                        <div className="text-sm font-bold">{log.nama}</div>
                        <div className="text-[10px] text-zinc-400">{log.nim}</div>
                      </td>
                      <td className="p-3">
                        <span className={cn("inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold border", config.color)}>
                          {config.icon} {config.label}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-zinc-600 max-w-xs truncate">{log.details}</td>
                    </tr>
                  );
                })}
                {paginated.length === 0 && (
                  <tr><td colSpan={5} className="p-12 text-center text-zinc-400">
                    <Filter size={32} className="mx-auto mb-3 opacity-50" />
                    <p className="font-bold">Tidak ada log ditemukan</p>
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-zinc-100">
              <span className="text-xs text-zinc-500">Halaman {currentPage} dari {totalPages}</span>
              <div className="flex items-center gap-1">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg hover:bg-zinc-100 disabled:opacity-30"><ChevronLeft size={16} /></button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let page: number;
                  if (totalPages <= 5) page = i + 1;
                  else if (currentPage <= 3) page = i + 1;
                  else if (currentPage >= totalPages - 2) page = totalPages - 4 + i;
                  else page = currentPage - 2 + i;
                  return (
                    <button key={page} onClick={() => setCurrentPage(page)} className={cn("w-8 h-8 rounded-lg text-xs font-bold transition-colors", page === currentPage ? "bg-rose-700 text-white" : "hover:bg-zinc-100 text-zinc-600")}>
                      {page}
                    </button>
                  );
                })}
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg hover:bg-zinc-100 disabled:opacity-30"><ChevronRight size={16} /></button>
              </div>
            </div>
          )}
        </div>

        {/* Delete Confirmation - admin only */}
        {isAdmin && deleteConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4">
              <h3 className="font-bold text-lg">Hapus Log Audit?</h3>
              <p className="text-sm text-zinc-600">
                {selectedLogs.size > 0 ? `${selectedLogs.size} log terpilih akan dihapus.` : 'Semua log yang difilter akan dihapus.'}
                Tindakan ini tidak bisa dibatalkan.
              </p>
              <div className="flex gap-2 pt-2">
                <button onClick={() => setDeleteConfirm(false)} disabled={isDeleting} className="flex-1 py-2.5 bg-zinc-100 text-zinc-700 font-bold rounded-xl hover:bg-zinc-200 text-sm">Batal</button>
                <button onClick={selectedLogs.size > 0 ? handleDeleteSelected : handleDeleteAll} disabled={isDeleting} className="flex-1 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 text-sm disabled:opacity-50">
                  {isDeleting ? 'Menghapus...' : 'Hapus'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
