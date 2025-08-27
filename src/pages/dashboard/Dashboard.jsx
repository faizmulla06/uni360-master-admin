import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  fetchDashboardStart,
  fetchDashboardSuccess,
} from "../../store/slices/dashboardSlice";
// import { dashboardAPI } from "../../services/apiServices";
import StatsCards from "../../components/dashboard/StatsCards";
import ConversionFunnel from "../../components/dashboard/ConversionFunnel";
import RevenueChart from "../../components/dashboard/RevenueChart";
import AgentPerformance from "../../components/dashboard/AgentPerformance";
import NotificationsPanel from "../../components/dashboard/NotificationsPanel";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { selectedCountry } = useSelector((state) => state.ui);
  const {
    stats,
    conversionFunnel,
    revenueData,
    agentPerformance,
    notifications,
    loading,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    const fetchDashboardData = async () => {
      dispatch(fetchDashboardStart());
      try {
        // Commented out API call for demo
        // const response = await dashboardAPI.getStats(selectedCountry);
        // dispatch(fetchDashboardSuccess(response.data));

        // Using dummy data instead
        dispatch(
          fetchDashboardSuccess({
            stats: {
              totalStudents: 1245,
              totalApplications: 523,
              totalUniversities: 89,
              totalRevenue: 2547889,
            },
            conversionData: [
              { stage: "Inquiries", count: 1500 },
              { stage: "Applications", count: 1200 },
              { stage: "Interviews", count: 800 },
              { stage: "Offers", count: 600 },
              { stage: "Enrollments", count: 450 },
            ],
            revenueData: [
              { month: "Jan", revenue: 85000 },
              { month: "Feb", revenue: 92000 },
              { month: "Mar", revenue: 78000 },
              { month: "Apr", revenue: 105000 },
              { month: "May", revenue: 118000 },
              { month: "Jun", revenue: 134000 },
            ],
          })
        );
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [dispatch, selectedCountry]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.name || "Master Admin"}!
        </h1>
        <p className="text-primary-100 mt-2">
          UUID: {user?.uuid || "MADM-2024-001"} | Managing {selectedCountry}{" "}
          Operations
        </p>
        <div className="mt-4 flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            System Status: Online
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
            Region: {selectedCountry}
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        <StatsCards stats={stats} loading={loading} />
      </motion.div>

      {/* Charts and Analytics */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <ConversionFunnel data={conversionFunnel} loading={loading} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <RevenueChart data={revenueData} loading={loading} />
        </motion.div>
      </motion.div>

      {/* Agent Performance and Notifications */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <AgentPerformance data={agentPerformance} loading={loading} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <NotificationsPanel notifications={notifications} loading={loading} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
