import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../redux/authSlice';
import AdminSidebar from '../components/AdminSidebar';

const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, token, initialChecked, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    // If we have a token, check auth. Otherwise, redirect to login.
    if (token) {
      dispatch(checkAuth());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (initialChecked && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [initialChecked, isAuthenticated, navigate]);

  if (!initialChecked && loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-amber-500"></div>
          <p className="mt-4 text-sm font-medium tracking-wide">Securing connection...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Pane */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm border-b border-slate-200 px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-slate-800">Admin Control Panel</h1>
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live Sync Connected</span>
          </div>
        </header>

        <main className="p-6 md:p-8 flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
