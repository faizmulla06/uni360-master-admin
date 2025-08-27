import React, { useState } from "react";
import {
  ChartBarIcon,
  DocumentChartBarIcon,
  CalendarIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

const ReportsAnalytics = () => {
  const [dateRange, setDateRange] = useState("30days");
  const [reportType, setReportType] = useState("overview");

  const analyticsData = [
    {
      name: "Total Applications",
      value: "2,847",
      change: "+12.3%",
      icon: DocumentChartBarIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      name: "Active Students",
      value: "1,432",
      change: "+8.7%",
      icon: UserGroupIcon,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      name: "Partner Universities",
      value: "85",
      change: "+5.2%",
      icon: AcademicCapIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      name: "Revenue Growth",
      value: "24.8%",
      change: "+3.1%",
      icon: ArrowTrendingUpIcon,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ];

  const reportCategories = [
    { id: "overview", name: "Overview", icon: ChartBarIcon },
    { id: "applications", name: "Applications", icon: DocumentChartBarIcon },
    { id: "students", name: "Students", icon: UserGroupIcon },
    { id: "universities", name: "Universities", icon: AcademicCapIcon },
    { id: "revenue", name: "Revenue", icon: ArrowTrendingUpIcon },
  ];

  const recentReports = [
    {
      name: "Monthly Application Report",
      type: "PDF",
      generated: "2025-08-27",
      size: "2.4 MB",
    },
    {
      name: "Student Performance Analytics",
      type: "Excel",
      generated: "2025-08-26",
      size: "1.8 MB",
    },
    {
      name: "University Partnership Report",
      type: "PDF",
      generated: "2025-08-25",
      size: "3.2 MB",
    },
  ];

  const chartData = {
    applications: [
      { month: "Jan", count: 120 },
      { month: "Feb", count: 145 },
      { month: "Mar", count: 180 },
      { month: "Apr", count: 220 },
      { month: "May", count: 280 },
      { month: "Jun", count: 320 },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Reports & Analytics
        </h1>
        <div className="flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input-field">
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="1year">Last year</option>
          </select>
          <button className="btn-primary">
            <ArrowDownTrayIcon className="h-5 w-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((item) => (
          <div key={item.name} className="card">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${item.bgColor}`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{item.name}</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {item.value}
                </p>
                <p className="text-sm text-green-600">{item.change}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Categories */}
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Report Categories
            </h3>
            <div className="space-y-2">
              {reportCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setReportType(category.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    reportType === category.id
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}>
                  <category.icon className="h-5 w-5 mr-3" />
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Report Content */}
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {reportCategories.find((cat) => cat.id === reportType)?.name}{" "}
              Analytics
            </h3>

            {reportType === "overview" && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Application Trends (Last 6 Months)
                  </h4>
                  <div className="h-64 flex items-end space-x-2">
                    {chartData.applications.map((data, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className="bg-blue-500 w-8 rounded-t"
                          style={{
                            height: `${(data.count / 320) * 200}px`,
                          }}></div>
                        <span className="text-xs text-gray-600 mt-1">
                          {data.month}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">94.5%</p>
                    <p className="text-sm text-gray-600">Success Rate</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">12.3%</p>
                    <p className="text-sm text-gray-600">Growth Rate</p>
                  </div>
                </div>
              </div>
            )}

            {reportType !== "overview" && (
              <div className="text-center py-8">
                <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Detailed{" "}
                  {reportCategories
                    .find((cat) => cat.id === reportType)
                    ?.name.toLowerCase()}{" "}
                  analytics will be displayed here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Reports</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All Reports
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Generated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentReports.map((report, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {report.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.generated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button className="text-blue-600 hover:text-blue-700 mr-3">
                      Download
                    </button>
                    <button className="text-gray-600 hover:text-gray-700">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
