import React from "react";
import { motion } from "framer-motion";
import {
  UsersIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

const StatsCards = ({ stats, loading }) => {
  const statsData = [
    {
      name: "Total Students",
      value: stats?.totalStudents || 0,
      icon: UsersIcon,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      name: "Active Applications",
      value: stats?.totalApplications || 0,
      icon: DocumentTextIcon,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      name: "Partner Universities",
      value: stats?.totalUniversities || 0,
      icon: AcademicCapIcon,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      name: "Total Revenue",
      value: `£${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: BanknotesIcon,
      color: "bg-primary-500",
      bgColor: "bg-primary-50",
      textColor: "text-primary-600",
    },
  ];

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="card animate-pulse">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.name}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: index * 0.1 }}
          className="card hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {stat.name}
              </p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${stat.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  />
                </div>
              </div>
              <span className="ml-2 text-sm text-green-600 font-medium">
                +12%
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;
