import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { loginAdmin, clearAuthError } from '../redux/authSlice';
import { toast } from 'react-toastify';

// Validation Schema
const schema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Clean error state on mount
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const onSubmit = async (data) => {
    const result = await dispatch(loginAdmin(data));
    if (loginAdmin.fulfilled.match(result)) {
      toast.success('Welcome back to the SVS Administrator console.');
    } else {
      toast.error(result.payload || 'Invalid administrative credentials');
    }
  };

  return (
    <>
      <Helmet>
        <title>Administrator Login | SVS Real Estate</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12 relative overflow-hidden">
        {/* Abstract luxury backdrop */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
            alt="Office skyscraper"
            className="w-full h-full object-cover filter blur-xs"
          />
        </div>

        <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl flex flex-col space-y-6">
          <div className="text-center space-y-2">
            <span className="text-2xl font-black text-white tracking-widest block">
              SVS<span className="text-amber-500 font-medium"> ADMIN</span>
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">
              Authorized Personnel Access Only
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
              <input
                type="email"
                {...register('email')}
                placeholder="admin@svs.com"
                className={`w-full text-xs bg-slate-950/80 border rounded-lg px-4 py-3 outline-none text-white focus:ring-1 transition-all ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:border-amber-500 focus:ring-amber-500'
                }`}
              />
              {errors.email && <p className="text-[10px] text-red-400 mt-1 font-medium">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Password</label>
              <input
                type="password"
                {...register('password')}
                placeholder="••••••••"
                className={`w-full text-xs bg-slate-950/80 border rounded-lg px-4 py-3 outline-none text-white focus:ring-1 transition-all ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:border-amber-500 focus:ring-amber-500'
                }`}
              />
              {errors.password && <p className="text-[10px] text-red-400 mt-1 font-medium">{errors.password.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-slate-700 text-slate-900 font-bold uppercase tracking-wider text-xs py-3.5 rounded-lg transition duration-200 mt-2 shadow-lg"
            >
              {loading ? 'Authenticating Profile...' : 'Sign In To Panel'}
            </button>
          </form>

          {/* Footer Backlink */}
          <div className="text-center pt-2">
            <Link
              to="/"
              className="text-xs text-slate-500 hover:text-slate-350 transition underline"
            >
              Return to Public Site
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
