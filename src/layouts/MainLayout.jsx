import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PlusIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import QuickActionsMenu from "../components/QuickActionsMenu";
import ToastContainer from "../components/ToastContainer";
import { removeToast } from "../store/slices/toastSlice";

const MainLayout = () => {
  const dispatch = useDispatch();
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const { toasts } = useSelector((state) => state.toast);

  // Auto-remove toasts after their duration
  useEffect(() => {
    toasts.forEach((toast) => {
      const timer = setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, toast.duration);

      return () => clearTimeout(timer);
    });
  }, [toasts, dispatch]);

  const handleCloseToast = (toastId) => {
    dispatch(removeToast(toastId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 pt-16 lg:ml-64">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => setQuickActionsOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Quick Actions">
        <PlusIcon className="h-6 w-6" />
      </motion.button>

      {/* Quick Actions Menu */}
      <QuickActionsMenu
        isOpen={quickActionsOpen}
        onClose={() => setQuickActionsOpen(false)}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={handleCloseToast} />
    </div>
  );
};

export default MainLayout;
