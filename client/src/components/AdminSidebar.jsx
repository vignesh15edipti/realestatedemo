import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAdmin } from '../redux/authSlice';
import {
  HiChartBar,
  HiHome,
  HiChatBubbleLeftRight,
  HiArrowLeftOnRectangle,
  HiGlobeAlt,
} from 'react-icons/hi2';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate('/');
  };

  const menuItems = [
    {
      name: 'Summary Stats',
      path: '/admin/dashboard',
      icon: <HiChartBar className="h-5 w-5" />,
    },
    {
      name: 'Manage Listings',
      path: '/admin/properties',
      icon: <HiHome className="h-5 w-5" />,
    },
    {
      name: 'Client Inquiries',
      path: '/admin/inquiries',
      icon: <HiChatBubbleLeftRight className="h-5 w-5" />,
    },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full border-r border-slate-800 shrink-0">
      {/* Brand Header */}
      <div className="px-6 py-6 border-b border-slate-800 flex flex-col space-y-1 bg-slate-950">
        <span className="text-xl font-black text-white tracking-widest">
          SVS<span className="text-amber-500 font-medium"> ADMIN</span>
        </span>
        {admin && (
          <span className="text-[10px] text-slate-400 font-medium truncate">
            Signed in: {admin.name}
          </span>
        )}
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3.5 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                isActive
                  ? 'bg-amber-500 text-slate-900 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer Controls */}
      <div className="p-4 border-t border-slate-800 space-y-1 bg-slate-950/40">
        <NavLink
          to="/"
          className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/40 transition duration-200"
        >
          <HiGlobeAlt className="h-4.5 w-4.5 text-slate-500" />
          <span>Public Website</span>
        </NavLink>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-red-950/20 transition duration-200"
        >
          <HiArrowLeftOnRectangle className="h-4.5 w-4.5 text-red-400" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
