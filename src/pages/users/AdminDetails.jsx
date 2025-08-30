import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { addToast } from "../../store/slices/toastSlice";
import {
  UserIcon,
  ShieldCheckIcon,
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
  KeyIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

// Mock admin data
const mockAdminData = {
  id: 3,
  personalInfo: {
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    phone: "+44 20 7946 0958",
    dateOfBirth: "1985-03-10",
    nationality: "British",
    address: {
      street: "456 Admin Street",
      city: "London",
      state: "England",
      zipCode: "W1C 2AB",
      country: "United Kingdom",
    },
    profilePhoto:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
  },
  workInfo: {
    department: "Administration",
    position: "Senior Administrator",
    employeeId: "ADM001",
    startDate: "2023-01-01",
    supervisor: "Head of Operations",
    workLocation: "London Office",
  },
  permissions: [
    {
      id: 1,
      name: "User Management",
      granted: true,
      description: "Create, edit, and delete user accounts",
    },
    {
      id: 2,
      name: "University Management",
      granted: true,
      description: "Manage university partnerships",
    },
    {
      id: 3,
      name: "Application Oversight",
      granted: true,
      description: "View and manage student applications",
    },
    {
      id: 4,
      name: "Financial Reports",
      granted: true,
      description: "Access financial and commission reports",
    },
    {
      id: 5,
      name: "Document Verification",
      granted: false,
      description: "Verify and approve student documents",
    },
    {
      id: 6,
      name: "System Settings",
      granted: false,
      description: "Modify system configuration",
    },
  ],
  managedUsers: [
    {
      id: 1,
      name: "John Doe",
      role: "student",
      status: "active",
      lastActivity: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "student",
      status: "active",
      lastActivity: "2024-01-14",
    },
    {
      id: 3,
      name: "Agent Mike",
      role: "agent",
      status: "active",
      lastActivity: "2024-01-16",
    },
  ],
  activityLog: [
    {
      id: 1,
      action: "Updated user permissions",
      target: "John Doe",
      timestamp: "2024-01-16T10:30:00Z",
    },
    {
      id: 2,
      action: "Approved application",
      target: "University of Manchester",
      timestamp: "2024-01-15T14:20:00Z",
    },
    {
      id: 3,
      action: "Created new user",
      target: "Jane Smith",
      timestamp: "2024-01-14T09:15:00Z",
    },
    {
      id: 4,
      action: "Generated commission report",
      target: "Q4 2023",
      timestamp: "2024-01-13T16:45:00Z",
    },
  ],
  status: "active",
  lastLogin: "2024-01-16T08:45:00Z",
  createdAt: "2023-01-01T00:00:00Z",
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

const PermissionBadge = ({ granted }) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
        granted ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}>
      {granted ? (
        <CheckCircleIcon className="h-3 w-3 mr-1" />
      ) : (
        <XCircleIcon className="h-3 w-3 mr-1" />
      )}
      {granted ? "Granted" : "Denied"}
    </span>
  );
};

const AdminDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAdmin(mockAdminData);
      setLoading(false);
      dispatch(
        addToast({
          type: "success",
          title: "Admin data loaded",
          message: "Admin details have been successfully retrieved.",
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

  if (!admin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Admin not found</h2>
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

  const handleEditAdmin = () => {
    dispatch(
      addToast({
        type: "info",
        title: "Edit mode activated",
        message: "Admin editing functionality will be available soon.",
      })
    );
  };

  const tabs = [
    { id: "overview", name: "Overview", icon: UserIcon },
    { id: "permissions", name: "Permissions", icon: KeyIcon },
    { id: "managed-users", name: "Managed Users", icon: UsersIcon },
    { id: "activity", name: "Activity Log", icon: DocumentTextIcon },
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
                  {admin.personalInfo.firstName} {admin.personalInfo.lastName}
                </h1>
                <p className="text-sm text-gray-500">Admin ID: {admin.id}</p>
              </div>
            </div>
            <button
              onClick={handleEditAdmin}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit Admin
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
                src={admin.personalInfo.profilePhoto}
                alt={`${admin.personalInfo.firstName} ${admin.personalInfo.lastName}`}
              />
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {admin.personalInfo.firstName} {admin.personalInfo.lastName}
              </h2>
              <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <EnvelopeIcon className="h-4 w-4 mr-1" />
                  {admin.personalInfo.email}
                </div>
                <div className="flex items-center">
                  <PhoneIcon className="h-4 w-4 mr-1" />
                  {admin.personalInfo.phone}
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  {admin.workInfo.department}
                </div>
              </div>
              <div className="mt-2">
                <StatusBadge status={admin.status} />
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
                    {admin.personalInfo.dateOfBirth}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Nationality
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {admin.personalInfo.nationality}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="text-sm text-gray-900">
                    {admin.personalInfo.address.street},{" "}
                    {admin.personalInfo.address.city},{" "}
                    {admin.personalInfo.address.zipCode},{" "}
                    {admin.personalInfo.address.country}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Start Date
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {admin.workInfo.startDate}
                  </dd>
                </div>
              </dl>
            </motion.div>

            {/* Work Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Work Information
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Position
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {admin.workInfo.position}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Employee ID
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {admin.workInfo.employeeId}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Supervisor
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {admin.workInfo.supervisor}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Work Location
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {admin.workInfo.workLocation}
                  </dd>
                </div>
              </dl>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">
                    {admin.managedUsers.length}
                  </div>
                  <div className="text-sm text-gray-500">Managed Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {admin.permissions.filter((p) => p.granted).length}
                  </div>
                  <div className="text-sm text-gray-500">Permissions</div>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {admin.activityLog.slice(0, 3).map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <ClockIcon className="h-4 w-4 text-gray-400 mt-1" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.target}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === "permissions" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Permissions & Access Rights
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {admin.permissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-sm font-medium text-gray-900">
                          {permission.name}
                        </h4>
                        <PermissionBadge granted={permission.granted} />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {permission.description}
                      </p>
                    </div>
                    <button className="ml-4 text-sm text-indigo-600 hover:text-indigo-900">
                      {permission.granted ? "Revoke" : "Grant"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "managed-users" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Managed Users
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {admin.managedUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.lastActivity}
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

        {activeTab === "activity" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Activity Log
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {admin.activityLog.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <ClockIcon className="h-4 w-4 text-indigo-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.action}
                        </p>
                        <span className="text-xs text-gray-500">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Target: {activity.target}
                      </p>
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

export default AdminDetails;
