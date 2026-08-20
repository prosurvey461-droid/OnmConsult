import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Key, X, ShieldCheck, AlertCircle } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { loginModalOpen, setLoginModalOpen, login, siteData } = useApp();
  const [email, setEmail] = useState('admin@thimiguys.com');
  const [password, setPassword] = useState('thimi123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!loginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await login(email, password);
    setLoading(false);
    if (!result.success) {
      setError(result.error || 'Invalid credentials. Please verify email and password.');
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@thimiguys.com');
    setPassword('thimi123');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-none max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 border-l-4 border-l-sky-700 animate-in fade-in duration-150 relative">
        {/* Close Button */}
        <button
          onClick={() => setLoginModalOpen(false)}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-none transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-slate-50 border border-slate-200 flex items-center justify-center text-sky-700 mx-auto mb-3 rounded-none">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-mono font-bold text-sky-700 uppercase tracking-widest block mb-1">
            CONTROL CENTER
          </span>
          <h3 className="text-2xl font-bold text-slate-900 font-['Cairo',sans-serif] uppercase tracking-tight">
            Admin CMS Login
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Authorized portal for {siteData.settings.companyName || "omsconsults"}
          </p>
        </div>

        {/* Credentials Info Badge */}
        <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-none text-xs space-y-1.5 font-mono">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              Preset Admin Access
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] font-bold text-sky-700 hover:underline cursor-pointer uppercase"
            >
              Auto-Fill
            </button>
          </div>
          <p className="text-slate-600 text-[11px]">
            Email: <strong className="text-slate-900">admin@thimiguys.com</strong>
          </p>
          <p className="text-slate-600 text-[11px]">
            Password: <strong className="text-slate-900">thimi123</strong>
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-none flex items-center gap-2.5 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@thimiguys.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-none text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono">
              Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-none text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] font-bold text-slate-400 hover:text-slate-700 uppercase"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs uppercase tracking-widest rounded-none shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? (
              <>AUTHENTICATING...</>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" /> SIGN IN TO CMS
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
