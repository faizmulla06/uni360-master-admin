import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { addToast } from "../../store/slices/toastSlice";
import {
  UserIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  PencilIcon,
  ArrowLeftIcon,
  CreditCardIcon,
  AcademicCapIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

// Mock external admin data
const mockExternalAdminData = {
  id: 5,
  personalInfo: {
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael@agencypartner.com",
    phone: "+61 2 9876 5432",
    dateOfBirth: "1980-07-22",
    nationality: "Australian",
    address: {
      street: "789 Partner Street",
      city: "Sydney",
      state: "NSW",
      zipCode: "2000",
      country: "Australia",
    },
    profilePhoto:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  agencyInfo: {
    agency: "Education Partners Australia",
    agencyType: "Education Consultant",
    contractStart: "2023-07-20",
    contractEnd: "2024-07-20",
    businessRegistration: "ABN 12 345 678 901",
    website: "www.educationpartners.com.au",
    specialization: [
      "Higher Education",
      "Vocational Training",
      "English Language",
    ],
  },
  businessMetrics: {
    managedStudents: 12,
    commission: "15%",
    totalCommissionEarned: 45000,
    averageApplicationSuccess: "85%",
    monthlyTarget: 5,
    currentMonthApplications: 3,
  },
  managedStudents: [
    {
      id: 1,
      name: "Alice Brown",
      program: "Computer Science",
      university: "University of Sydney",
      status: "approved",
      submissionDate: "2024-01-10",
    },
    {
      id: 2,
      name: "Bob Wilson",
      program: "Business Administration",
      university: "Monash University",
      status: "pending",
      submissionDate: "2024-01-15",
    },
    {
      id: 3,
      name: "Carol Davis",
      program: "Engineering",
      university: "UNSW",
      status: "approved",
      submissionDate: "2024-01-08",
    },
  ],
  commissions: [
    {
      id: 1,
      student: "Alice Brown",
      university: "University of Sydney",
      amount: 2500,
      currency: "AUD",
      status: "paid",
      date: "2024-01-20",
    },
    {
      id: 2,
      student: "Carol Davis",
      university: "UNSW",
      amount: 3000,
      currency: "AUD",
      status: "pending",
      date: "2024-01-18",
    },
    {
      id: 3,
      student: "David Lee",
      university: "University of Melbourne",
      amount: 2800,
      currency: "AUD",
      status: "paid",
      date: "2024-01-12",
    },
  ],
  performance: [
    { month: "January", applications: 3, approvals: 2, commissions: 5500 },
    { month: "December", applications: 4, approvals: 3, commissions: 7800 },
    { month: "November", applications: 2, approvals: 2, commissions: 5000 },
  ],
  status: "active",
  lastLogin: "2024-01-16T12:15:00Z",
  createdAt: "2023-07-20T10:00:00Z",
};

const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "paid":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
        status
      )}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const ExternalAdminDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [externalAdmin, setExternalAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setExternalAdmin(mockExternalAdminData);
      setLoading(false);
      dispatch(
        addToast({
          type: "success",
          title: "External admin data loaded",
          message: "External admin details have been successfully retrieved.",
        })
      );
    }, 1000);
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!externalAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            External admin not found
          </h2>
          <button
            onClick={() => navigate("/users")}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  const handleEditExternalAdmin = () => {
    dispatch(
      addToast({
        type: "info",
        title: "Edit mode activated",
        message: "External admin editing functionality will be available soon.",
      })
    );
  };

  const tabs = [
    { id: "overview", name: "Overview", icon: UserIcon },
    { id: "students", name: "Managed Students", icon: AcademicCapIcon },
    { id: "commissions", name: "Commissions", icon: CreditCardIcon },
    { id: "performance", name: "Performance", icon: ChartBarIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/users")}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back
              </button>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {externalAdmin.personalInfo.firstName}{" "}
                  {externalAdmin.personalInfo.lastName}
                </h1>
                <p className="text-sm text-gray-500">
                  External Admin ID: {externalAdmin.id}
                </p>
              </div>
            </div>
            <button
              onClick={handleEditExternalAdmin}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit External Admin
            </button>
          </div>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-20 w-20 rounded-full object-cover"
                src={externalAdmin.personalInfo.profilePhoto}
                alt={`${externalAdmin.personalInfo.firstName} ${externalAdmin.personalInfo.lastName}`}
              />
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {externalAdmin.personalInfo.firstName}{" "}
                {externalAdmin.personalInfo.lastName}
              </h2>
              <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <EnvelopeIcon className="h-4 w-4 mr-1" />
                  {externalAdmin.personalInfo.email}
                </div>
                <div className="flex items-center">
                  <PhoneIcon className="h-4 w-4 mr-1" />
                  {externalAdmin.personalInfo.phone}
                </div>
                <div className="flex items-center">
                  <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                  {externalAdmin.agencyInfo.agency}
                </div>
              </div>
              <div className="mt-2">
                <StatusBadge status={externalAdmin.status} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}>
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Personal Information
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Date of Birth
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {externalAdmin.personalInfo.dateOfBirth}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Nationality
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {externalAdmin.personalInfo.nationality}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="text-sm text-gray-900">
                    {externalAdmin.personalInfo.address.street},{" "}
                    {externalAdmin.personalInfo.address.city},{" "}
                    {externalAdmin.personalInfo.address.zipCode},{" "}
                    {externalAdmin.personalInfo.address.country}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Partnership Start
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {externalAdmin.agencyInfo.contractStart}
                  </dd>
                </div>
              </dl>
            </motion.div>

            {/* Agency Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Agency Information
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Agency Type
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {externalAdmin.agencyInfo.agencyType}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Business Registration
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {externalAdmin.agencyInfo.businessRegistration}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Website</dt>
                  <dd className="text-sm text-gray-900">
                    {externalAdmin.agencyInfo.website}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Contract Period
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {externalAdmin.agencyInfo.contractStart} -{" "}
                    {externalAdmin.agencyInfo.contractEnd}
                  </dd>
                </div>
              </dl>
            </motion.div>

            {/* Business Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Business Metrics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">
                    {externalAdmin.businessMetrics.managedStudents}
                  </div>
                  <div className="text-sm text-gray-500">Managed Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {externalAdmin.businessMetrics.commission}
                  </div>
                  <div className="text-sm text-gray-500">Commission Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {externalAdmin.businessMetrics.averageApplicationSuccess}
                  </div>
                  <div className="text-sm text-gray-500">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    $
                    {externalAdmin.businessMetrics.totalCommissionEarned.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Total Earned</div>
                </div>
              </div>
            </motion.div>

            {/* Specialization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Specialization
              </h3>
              <div className="flex flex-wrap gap-2">
                {externalAdmin.agencyInfo.specialization.map((spec, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {spec}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <dt className="text-sm font-medium text-gray-500">
                  Monthly Target
                </dt>
                <dd className="text-sm text-gray-900">
                  {externalAdmin.businessMetrics.currentMonthApplications} /{" "}
                  {externalAdmin.businessMetrics.monthlyTarget} applications
                </dd>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{
                      width: `${
                        (externalAdmin.businessMetrics
                          .currentMonthApplications /
                          externalAdmin.businessMetrics.monthlyTarget) *
                        100
                      }%`,
                    }}></div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === "students" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Managed Students
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Program
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      University
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submission Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {externalAdmin.managedStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.program}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.university}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={student.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.submissionDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === "commissions" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Commission History
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
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
                  {externalAdmin.commissions.map((commission) => (
                    <tr key={commission.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {commission.student}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {commission.university}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {commission.currency}{" "}
                        {commission.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={commission.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {commission.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === "performance" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Performance Metrics
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {externalAdmin.performance.map((period, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-3">
                      {period.month}
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Applications:
                        </span>
                        <span className="text-sm font-medium">
                          {period.applications}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Approvals:
                        </span>
                        <span className="text-sm font-medium">
                          {period.approvals}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Success Rate:
                        </span>
                        <span className="text-sm font-medium">
                          {(
                            (period.approvals / period.applications) *
                            100
                          ).toFixed(0)}
                          %
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Commissions:
                        </span>
                        <span className="text-sm font-medium text-green-600">
                          AUD {period.commissions.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ExternalAdminDetails;
