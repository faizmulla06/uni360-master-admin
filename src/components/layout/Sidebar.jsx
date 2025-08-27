import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toggleSidebar } from "../../store/slices/uiSlice";
import {
  HomeIcon,
  UsersIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  BanknotesIcon,
  CreditCardIcon,
  ChartBarIcon,
  FolderIcon,
  CalendarIcon,
  CogIcon,
  CpuChipIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { sidebarOpen } = useSelector((state) => state.ui);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "User Management", href: "/users", icon: UsersIcon },
    { name: "Universities", href: "/universities", icon: AcademicCapIcon },
    { name: "Applications", href: "/applications", icon: DocumentTextIcon },
    { name: "Commissions", href: "/commissions", icon: BanknotesIcon },
    { name: "Payments", href: "/payments", icon: CreditCardIcon },
    { name: "Reports & Analytics", href: "/reports", icon: ChartBarIcon },
    { name: "Documents", href: "/documents", icon: FolderIcon },
    { name: "Appointments", href: "/appointments", icon: CalendarIcon },
    { name: "AI Tools", href: "/ai-tools", icon: CpuChipIcon },
    { name: "Settings", href: "/settings", icon: CogIcon },
  ];

  const toggleSidebarOpen = () => {
    dispatch(toggleSidebar());
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebarOpen}
        />
      )}

      {/* Sidebar */}
      <motion.div
        animate={{ width: sidebarOpen ? 256 : 64 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 z-50 overflow-hidden">
        {/* Toggle Button */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={toggleSidebarOpen}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            {sidebarOpen ? (
              <XMarkIcon className="h-6 w-6 text-gray-600" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-3">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`sidebar-link ${
                    isActive ? "active" : ""
                  } group relative`}
                  title={!sidebarOpen ? item.name : ""}>
                  <item.icon className="h-6 w-6 flex-shrink-0" />
                  <motion.span
                    animate={{
                      opacity: sidebarOpen ? 1 : 0,
                      x: sidebarOpen ? 0 : -10,
                    }}
                    transition={{ duration: 0.2 }}
                    className="ml-3 text-sm font-medium">
                    {item.name}
                  </motion.span>

                  {/* Tooltip for collapsed sidebar */}
                  {!sidebarOpen && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      {item.name}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>
      </motion.div>
    </>
  );
};

export default Sidebar;
