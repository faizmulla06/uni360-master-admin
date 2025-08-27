import React, { useState } from "react";
import {
  CreditCardIcon,
  BanknotesIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const PaymentManagement = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const paymentStats = [
    {
      name: "Total Revenue",
      value: "$125,430",
      change: "+12.3%",
      icon: CurrencyDollarIcon,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      name: "Pending Payments",
      value: "$8,420",
      change: "-2.4%",
      icon: ClockIcon,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      name: "Failed Payments",
      value: "$1,230",
      change: "+5.1%",
      icon: ExclamationTriangleIcon,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      name: "Successful Payments",
      value: "1,842",
      change: "+8.7%",
      icon: CheckCircleIcon,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];

  const recentTransactions = [
    {
      id: "TXN-001",
      student: "John Smith",
      university: "Harvard University",
      amount: "$2,500",
      status: "completed",
      date: "2025-08-27",
    },
    {
      id: "TXN-002",
      student: "Sarah Johnson",
      university: "MIT",
      amount: "$3,200",
      status: "pending",
      date: "2025-08-26",
    },
    {
      id: "TXN-003",
      student: "Mike Wilson",
      university: "Stanford University",
      amount: "$1,800",
      status: "failed",
      date: "2025-08-25",
    },
  ];

  const tabs = [
    { id: "overview", name: "Overview" },
    { id: "transactions", name: "Transactions" },
    { id: "refunds", name: "Refunds" },
    { id: "settings", name: "Payment Settings" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Payments & Transactions
        </h1>
        <button className="btn-primary">
          <CreditCardIcon className="h-5 w-5" />
          Process Payment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paymentStats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Recent Transactions
              </h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      University
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {transaction.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.student}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.university}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            transaction.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : transaction.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "transactions" && (
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            All Transactions
          </h3>
          <p className="text-gray-600">
            Detailed transaction management functionality will be implemented
            here.
          </p>
        </div>
      )}

      {activeTab === "refunds" && (
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Refund Management
          </h3>
          <p className="text-gray-600">
            Refund processing and management functionality will be implemented
            here.
          </p>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Payment Settings
          </h3>
          <p className="text-gray-600">
            Payment gateway configuration and settings will be implemented here.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;
