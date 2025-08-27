import React from "react";
import { motion } from "framer-motion";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-3xl"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white font-bold text-2xl">U</span>
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900">UNI360</h1>
            <p className="text-gray-600 mt-2">Master Admin Portal</p>
          </div>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
