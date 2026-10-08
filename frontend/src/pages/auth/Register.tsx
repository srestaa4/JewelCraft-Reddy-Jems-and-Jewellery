import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Lock, Phone, MapPin, AlertCircle, Loader2 } from 'lucide-react';

export const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await register({
        name,
        email,
        password,
        phone,
        city,
        address,
      });
      navigate('/customer/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Email might already exist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-3 mb-4 group focus:outline-none">
          <div className="w-12 h-12 rounded-sm overflow-hidden bg-white border border-[#D5C2A5] p-1 shadow-sm">
            <img
              src="/images/logo/reddy_logo.jpg"
              alt="REDDY JEMS AND JEWELLERY"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="text-left">
            <span className="font-serif text-2xl font-bold tracking-wider text-[#171717] block leading-none">
              REDDY
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#8B5E20] uppercase font-semibold block mt-0.5">
              JEMS AND JEWELLERY
            </span>
          </div>
        </Link>

        <h2 className="font-serif text-2xl font-bold tracking-tight text-[#171717]">
          Create Customer Account
        </h2>
        <p className="mt-1 text-xs text-[#6A5E50]">
          Register to customize fine jewellery, calculate valuations, and schedule showroom visits.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white border border-[#E8DEC8] rounded-md p-6 shadow-sm space-y-6">
          {error && (
            <div className="p-3 bg-[#FFF5F5] border border-[#F8D7DA] text-[#B02A37] text-xs rounded flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ananya Sharma"
                className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#B8863B]"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ananya@example.com"
                className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#B8863B]"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#B8863B]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                  Mobile Phone
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#B8863B]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Hyderabad"
                  className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#B8863B]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                Consultation Residential Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Road No 36, Jubilee Hills"
                className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#B8863B]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#B8863B] hover:bg-[#8B5E20] text-white text-xs uppercase tracking-widest font-semibold rounded transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Registering Account...</span>
                </>
              ) : (
                <span>Register & Enter Studio</span>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-[#FAF7F0] text-center text-xs text-[#6A5E50]">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#8B5E20] hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
