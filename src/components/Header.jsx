import React from "react";
import { Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <header className="md:ml-72 h-20 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-4 sm:px-8 flex items-center justify-between shadow-lg fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Left Section */}
      <div className="flex items-center gap-4 sm:gap-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Panel Admin
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Welcome back to your dashboard
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Notifications */}
        <div className="relative">
          <button className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 group">
            <Bell
              className="text-gray-600 group-hover:text-gray-800"
              size={20}
            />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-gray-200"></div>

        {/* User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>

          <div className="relative">
            <img
              src="https://ui-avatars.com/api/?name=Admin&background=6366F1&color=fff&size=40"
              alt="admin"
              className="w-10 h-10 rounded-full ring-2 ring-white shadow-lg"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="group flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
        >
          <LogOut
            size={16}
            className="group-hover:rotate-6 transition-transform duration-200"
          />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
