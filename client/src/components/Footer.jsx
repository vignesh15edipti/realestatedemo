import React from 'react';
import { Link } from 'react-router-dom';
import { HiEnvelope, HiPhone, HiMapPin } from 'react-icons/hi2';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-extrabold text-white tracking-wider">
                SVS<span className="text-amber-500 font-medium">REAL ESTATE</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              SVS Real Estate is a luxury real estate advisory and development firm. We curate high-end residences, premium villa plots, and state-of-the-art corporate workspaces across India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition duration-200">
                <FaFacebookF size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition duration-200">
                <FaTwitter size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition duration-200">
                <FaInstagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition duration-200">
                <FaLinkedinIn size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-500 transition duration-200">Home</Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-amber-500 transition duration-200">Properties</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-500 transition duration-200">Services Portfolio</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-500 transition duration-200">About Our Company</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-500 transition duration-200">Contact Advisory</Link>
              </li>
            </ul>
          </div>

          {/* Legal / Policy */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-6">Security & Policies</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/privacy-policy" className="hover:text-amber-500 transition duration-200">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-amber-500 transition duration-200">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-amber-500 transition duration-200 font-medium">Administrator Access</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-6">Headquarters</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <HiMapPin className="text-amber-500 h-5 w-5 shrink-0 mt-0.5" />
                <span>104, Executive Hub, Road No. 2, Banjara Hills, Hyderabad, TS, 500034</span>
              </li>
              <li className="flex items-center space-x-3">
                <HiPhone className="text-amber-500 h-5 w-5 shrink-0" />
                <span>+91 40 4880 1200 / +91 99887 76655</span>
              </li>
              <li className="flex items-center space-x-3">
                <HiEnvelope className="text-amber-500 h-5 w-5 shrink-0" />
                <span>info@svsrealestate.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {currentYear} SVS Real Estate Private Limited. All rights reserved.</p>
          <p className="mt-4 md:mt-0">
            Designed for luxury, built with trust.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
