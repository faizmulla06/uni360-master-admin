import React, { useState, useEffect } from "react";
import {
  CurrencyPoundIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  ChartBarIcon,
  CalendarIcon,
  BanknotesIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { commissionsAPI } from "../../services/apiServices";

const CommissionTracker = () => {
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    university: "",
    dateRange: "all",
    page: 1,
    limit: 10,
  });
  const [selectedCommission, setSelectedCommission] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    totalAmount: 0,
    pending: 0,
    paid: 0,
  });

  const fetchCommissions = async () => {
    try {
      setLoading(true);
      const response = await commissionsAPI.getCommissions(filters);
      setCommissions(response.data.commissions);

      // Calculate stats
      const allCommissions = response.data.commissions;
      setStats({
        total: allCommissions.length,
        totalAmount: allCommissions.reduce((sum, c) => sum + c.amount, 0),
        pending: allCommissions.filter((c) => c.status === "pending").length,
        paid: allCommissions.filter((c) => c.status === "paid").length,
      });
    } catch (error) {
      console.error("Error fetching commissions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleSearch = (e) => {
    setFilters({ ...filters, search: e.target.value, page: 1 });
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value, page: 1 });
  };

  const handleViewDetails = async (commissionId) => {
    try {
      const response = await commissionsAPI.getCommission(commissionId);
      setSelectedCommission(response.data);
      setShowDetailsModal(true);
    } catch (error) {
      console.error("Error fetching commission:", error);
    }
  };

  const handleUpdateStatus = async (commissionId, newStatus) => {
    try {
      await commissionsAPI.updateCommissionStatus(commissionId, newStatus);
      fetchCommissions();
    } catch (error) {
      console.error("Error updating commission status:", error);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        icon: ClockIcon,
      },
      paid: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: CheckCircleIcon,
      },
      cancelled: { bg: "bg-red-100", text: "text-red-800", icon: XCircleIcon },
      processing: { bg: "bg-blue-100", text: "text-blue-800", icon: ClockIcon },
    };

    const style = styles[status] || styles.pending;
    const IconComponent = style.icon;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
        <IconComponent className="h-3 w-3 mr-1" />
        {status}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Commission & Revenue Management
          </h1>
          <p className="text-sm text-gray-600">
            Track and manage university commissions
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Total Commissions",
            value: stats.total,
            icon: ChartBarIcon,
            color: "blue",
            format: "number",
          },
          {
            title: "Total Amount",
            value: stats.totalAmount,
            icon: BanknotesIcon,
            color: "green",
            format: "currency",
          },
          {
            title: "Pending",
            value: stats.pending,
            icon: ClockIcon,
            color: "yellow",
            format: "number",
          },
          {
            title: "Paid",
            value: stats.paid,
            icon: CheckCircleIcon,
            color: "green",
            format: "number",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.title}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stat.format === "currency"
                        ? formatCurrency(stat.value)
                        : stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Search
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                placeholder="Search commissions..."
                value={filters.search}
                onChange={handleSearch}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md pl-10"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="paid">Paid</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              University
            </label>
            <select
              value={filters.university}
              onChange={(e) => handleFilterChange("university", e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option value="">All Universities</option>
              <option value="oxford">University of Oxford</option>
              <option value="cambridge">University of Cambridge</option>
              <option value="imperial">Imperial College London</option>
              <option value="tum">Technical University of Munich</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() =>
                setFilters({
                  search: "",
                  status: "",
                  university: "",
                  dateRange: "all",
                  page: 1,
                  limit: 10,
                })
              }
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <FunnelIcon className="h-4 w-4 mr-2" />
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Commissions Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <p className="mt-2 text-sm text-gray-500">
                Loading commissions...
              </p>
            </div>
          ) : commissions.length === 0 ? (
            <div className="text-center py-12">
              <CurrencyPoundIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No commissions found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student / University
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {commissions.map((commission) => (
                    <tr key={commission.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {commission.studentName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {commission.universityName}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {commission.course}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-green-600">
                          {formatCurrency(commission.amount)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {commission.rate}% of £
                          {commission.tuitionFee?.toLocaleString() || "0"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                          {formatDate(commission.date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(commission.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleViewDetails(commission.id)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="View Details">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        {commission.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleUpdateStatus(commission.id, "processing")
                              }
                              className="text-blue-600 hover:text-blue-900 ml-2"
                              title="Mark as Processing">
                              Process
                            </button>
                            <button
                              onClick={() =>
                                handleUpdateStatus(commission.id, "paid")
                              }
                              className="text-green-600 hover:text-green-900 ml-2"
                              title="Mark as Paid">
                              Pay
                            </button>
                          </>
                        )}
                        {commission.status === "processing" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(commission.id, "paid")
                            }
                            className="text-green-600 hover:text-green-900 ml-2"
                            title="Mark as Paid">
                            Complete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Commission Details Modal */}
      {showDetailsModal && selectedCommission && (
        <CommissionDetailsModal
          commission={selectedCommission}
          onClose={() => setShowDetailsModal(false)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
};

// Commission Details Modal Component
const CommissionDetailsModal = ({ commission, onClose, onUpdateStatus }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Commission Details
              </h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Student Name
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {commission.studentName}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    University
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {commission.universityName}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Course
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {commission.course}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Session
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {commission.session}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tuition Fee
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {formatCurrency(commission.tuitionFee)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Commission Rate
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {commission.rate}%
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Commission Amount
                  </label>
                  <p className="mt-1 text-lg font-semibold text-green-600">
                    {formatCurrency(commission.amount)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {formatDate(commission.date)}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <div className="mt-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      commission.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : commission.status === "processing"
                        ? "bg-blue-100 text-blue-800"
                        : commission.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                    {commission.status}
                  </span>
                </div>
              </div>

              {commission.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {commission.notes}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {commission.status === "pending" && (
              <>
                <button
                  onClick={() => {
                    onUpdateStatus(commission.id, "paid");
                    onClose();
                  }}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Mark as Paid
                </button>
                <button
                  onClick={() => {
                    onUpdateStatus(commission.id, "processing");
                    onClose();
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Start Processing
                </button>
              </>
            )}
            {commission.status === "processing" && (
              <button
                onClick={() => {
                  onUpdateStatus(commission.id, "paid");
                  onClose();
                }}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                Complete Payment
              </button>
            )}
            <button
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionTracker;
