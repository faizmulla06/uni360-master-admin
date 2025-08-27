import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const MainLayout = () => {
  const { sidebarOpen } = useSelector((state) => state.ui);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-16"
          } pt-16`}>
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
