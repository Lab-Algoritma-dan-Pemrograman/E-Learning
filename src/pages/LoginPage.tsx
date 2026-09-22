import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, AlertCircle, User, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { saveToken } from '../services/tokenService';

interface LoginResponse {
  payload: { nim: string; nama: string; kelas: string; jurusan: string | null; email: string | null; role: string };
  token: string;
}

export const LoginPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const doLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setErr('');
    if (!identifier.trim() || !password) {
      setErr('NIM/email dan password wajib diisi.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: identifier.trim(), password }),
      });
      const json = (await res.json()) as (LoginResponse & { error?: string });
      if (!res.ok) {
        setErr(json.error || 'Login gagal. Coba lagi.');
        return;
      }
      saveToken(json.token);
      if ((json as any).backendToken) {
        try { sessionStorage.setItem('backend_token', (json as any).backendToken); } catch { /* abaikan */ }
      }
      sessionStorage.removeItem('logged_in_audit_logged');
      window.location.reload();
    } catch {
      setErr('Tidak bisa menghubungi server. Periksa koneksi lalu coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent font-sans flex flex-col">
      {/* Navbar mini */}
      <nav className="h-20 px-6 md:px-12 flex items-center justify-between sticky top-0 bg-[#FDFBF7]/80 backdrop-blur-md z-50 border-b border-maroon/5">
        <div
          onClick={onBack}
          className="flex items-center gap-3 font-black text-2xl tracking-tighter cursor-pointer"
        >
          <div className="w-11 h-11 bg-maroon rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-bubbly-maroon rotate-[-6deg]">
            E
          </div>
          <span className="text-maroon font-black tracking-tight ml-1">E-Learning</span>
        </div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-500 hover:text-maroon transition-colors cursor-pointer"
        >
          <ArrowLeft size={15} /> Kembali ke beranda
        </button>
      </nav>

      {/* Form card */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white border border-maroon/10 rounded-[2.5rem] p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(138,21,56,0.25)] text-center">
          <div className="absolute top-0 left-12 right-12 h-1 bg-gradient-to-r from-transparent via-maroon to-transparent rounded-t-[2.5rem]" />

          <div className="mb-8">
            <div className="mx-auto mb-4 w-16 h-16 bg-maroon rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-bubbly-maroon rotate-[-6deg]">
              E
            </div>
            <h1 className="text-2xl font-black tracking-tight text-dark">Masuk E-Learning</h1>
            <p className="mt-1 text-xs font-bold text-maroon uppercase tracking-wider">
              Lab Algoritma &amp; Pemrograman
            </p>
          </div>

          {err && (
            <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-xs font-semibold text-red-700 shadow-sm flex items-start gap-2.5 text-left">
              <AlertCircle size={15} className="shrink-0 text-red-500 mt-0.5" />
              <span>{err}</span>
            </div>
          )}

          <form onSubmit={doLogin} className="space-y-5 text-left">
            <div>
              <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2" htmlFor="identifier">
                Nomor Induk Mahasiswa / Email
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                  <User size={15} />
                </div>
                <input
                  id="identifier"
                  className="w-full h-12 pl-10 pr-4 bg-zinc-50/80 border border-zinc-200 rounded-2xl text-sm font-semibold text-zinc-800 placeholder-zinc-400/50 focus:outline-none focus:border-maroon/50 focus:bg-white transition-all"
                  value={identifier}
                  onChange={(ev) => setIdentifier(ev.target.value)}
                  placeholder="Masukkan NIM atau Email"
                  autoComplete="username"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2" htmlFor="pw">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                  <Lock size={15} />
                </div>
                <input
                  id="pw"
                  type={showPassword ? 'text' : 'password'}
                  className="w-full h-12 pl-10 pr-11 bg-zinc-50/80 border border-zinc-200 rounded-2xl text-sm font-semibold text-zinc-800 placeholder-zinc-400/50 focus:outline-none focus:border-maroon/50 focus:bg-white transition-all"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  placeholder="Masukkan password Anda"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-400 hover:text-zinc-600 transition-colors"
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full h-12 bg-maroon hover:bg-maroon-light text-white rounded-2xl text-sm font-black flex items-center justify-center gap-2 shadow-lg shadow-maroon/20 transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <><Loader2 size={15} className="animate-spin" /> Memeriksa akun…</>
              ) : (
                <>Masuk ke E-Learning <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          <p className="mt-5 text-xs font-semibold text-zinc-500">
            Akun yang sama dengan portal praktikum. Belum punya password? Daftar dulu di portal praktikum.
          </p>
        </div>
      </div>
    </div>
  );
};
