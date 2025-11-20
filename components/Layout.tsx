import React from 'react';
import { Button } from './UI';
import { User, UserRole } from '../types';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onDashboardClick: () => void;
  onHomeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout, onLoginClick, onRegisterClick, onDashboardClick, onHomeClick }) => {
  return (
    <header className="bg-white border-b-4 border-gov-accent shadow-sm sticky top-0 z-40">
      <div className="bg-gov-dark text-white text-xs py-1 px-4 flex justify-between items-center">
        <div className="flex gap-4">
          <span>Government of Himachal Pradesh</span>
          <span className="hidden sm:inline">Ministry of Youth Affairs & Sports</span>
        </div>
        <div className="flex gap-4 items-center">
          <button className="hover:underline" aria-label="Decrease font size">A-</button>
          <button className="hover:underline" aria-label="Reset font size">A</button>
          <button className="hover:underline" aria-label="Increase font size">A+</button>
          <select className="bg-gov-dark text-white border-none text-xs focus:ring-0 cursor-pointer">
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onHomeClick}>
          {/* Text-only logo replacement */}
          <div className="flex flex-col border-l-4 border-gov-accent pl-3">
            <h1 className="text-xl font-bold text-gov-blue leading-tight">HP CPGRAMS</h1>
            <span className="text-xs text-gray-600 font-medium uppercase tracking-wider">Public Grievance Redressal</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="ghost" onClick={onHomeClick}>Home</Button>
          
          {user ? (
            <div className="flex items-center gap-3 ml-4">
              <span className="text-sm font-semibold text-gray-700">Hello, {user.name}</span>
              {user.role === UserRole.GRO && (
                <Button variant="outline" size="sm" onClick={onDashboardClick}>Dashboard</Button>
              )}
              <Button variant="primary" size="sm" onClick={onLogout}>Logout</Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-4">
              <Button variant="outline" size="sm" onClick={onLoginClick}>Login</Button>
              <Button variant="primary" size="sm" onClick={onRegisterClick}>Register</Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button Placeholder */}
        <div className="md:hidden">
          <Button variant="ghost" aria-label="Menu">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gov-dark text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Government of Himachal Pradesh.</p>
        <p className="mt-2 md:mt-0">All Rights Reserved.</p>
      </div>
    </footer>
  );
};