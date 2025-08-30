import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  FunnelIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  UserIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  UsersIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

// Enhanced dummy data with different user types
const dummyUsers = {
  students: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "student",
      status: "active",
      country: "UK",
      lastLogin: "2024-01-15T10:30:00Z",
      createdAt: "2023-06-01T09:00:00Z",
      phone: "+44 7700 900123",
      dateOfBirth: "1995-05-15",
      nationality: "British",
      address: "123 Oxford Street, London",
      currentEducation: "Bachelor's in Computer Science",
      institution: "University of London",
      gpa: "3.8/4.0",
      applications: 3,
      documents: 5,
      profilePhoto:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "student",
      status: "active",
      country: "Germany",
      lastLogin: "2024-01-14T14:20:00Z",
      createdAt: "2023-05-15T11:30:00Z",
      phone: "+49 30 12345678",
      dateOfBirth: "1996-08-22",
      nationality: "German",
      address: "456 Berlin Street, Berlin",
      currentEducation: "Master's in Data Science",
      institution: "Technical University Berlin",
      gpa: "3.9/4.0",
      applications: 2,
      documents: 4,
      profilePhoto:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    },
  ],
  admins: [
    {
      id: 3,
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      status: "active",
      country: "UK",
      lastLogin: "2024-01-16T08:45:00Z",
      createdAt: "2023-01-01T00:00:00Z",
      phone: "+44 20 7946 0958",
      department: "Administration",
      permissions: ["users", "universities", "applications", "reports"],
      managedUsers: 25,
      profilePhoto:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@uni360.com",
      role: "admin",
      status: "active",
      country: "Canada",
      lastLogin: "2024-01-15T16:30:00Z",
      createdAt: "2023-03-15T09:00:00Z",
      phone: "+1 416 555 0123",
      department: "Student Services",
      permissions: ["students", "applications", "documents"],
      managedUsers: 18,
      profilePhoto:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    },
  ],
  externalAdmins: [
    {
      id: 5,
      name: "Michael Johnson",
      email: "michael@agencypartner.com",
      role: "external_admin",
      status: "active",
      country: "Australia",
      lastLogin: "2024-01-14T12:15:00Z",
      createdAt: "2023-07-20T10:00:00Z",
      phone: "+61 2 9876 5432",
      agency: "Education Partners Australia",
      agencyType: "Education Consultant",
      contractStart: "2023-07-20",
      contractEnd: "2024-07-20",
      managedStudents: 12,
      commission: "15%",
      profilePhoto:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 6,
      name: "Emma Thompson",
      email: "emma@globalstudies.com",
      role: "external_admin",
      status: "active",
      country: "New Zealand",
      lastLogin: "2024-01-16T09:20:00Z",
      createdAt: "2023-09-10T14:30:00Z",
      phone: "+64 9 123 4567",
      agency: "Global Studies NZ",
      agencyType: "Student Recruitment",
      contractStart: "2023-09-10",
      contractEnd: "2024-09-10",
      managedStudents: 8,
      commission: "12%",
      profilePhoto:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
    },
  ],
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

const EnhancedUserManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("students");
  const [users, setUsers] = useState(dummyUsers);
  const [loading] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    country: "",
  });

  const tabs = [
    {
      id: "students",
      name: "Students",
      icon: AcademicCapIcon,
      count: users.students.length,
    },
    {
      id: "admins",
      name: "Admins",
      icon: ShieldCheckIcon,
      count: users.admins.length,
    },
    {
      id: "externalAdmins",
      name: "External Admins",
      icon: UsersIcon,
      count: users.externalAdmins.length,
    },
  ];

  const getCurrentUsers = () => {
    return users[activeTab] || [];
  };

  const getFilteredUsers = () => {
    const currentUsers = getCurrentUsers();
    return currentUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = !filters.status || user.status === filters.status;
      const matchesCountry =
        !filters.country || user.country === filters.country;

      return matchesSearch && matchesStatus && matchesCountry;
    });
  };

  const handleSearch = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleCreateUser = () => {
    // Implementation for creating new user
    console.log(`Creating new ${activeTab.slice(0, -1)}`);
  };

  const handleEditUser = (userId) => {
    // Implementation for editing user
    console.log(`Editing user ${userId}`);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = { ...users };
      updatedUsers[activeTab] = updatedUsers[activeTab].filter(
        (u) => u.id !== userId
      );
      setUsers(updatedUsers);
    }
  };

  const getTotalStats = () => {
    return {
      total:
        users.students.length +
        users.admins.length +
        users.externalAdmins.length,
      students: users.students.length,
      admins: users.admins.length,
      externalAdmins: users.externalAdmins.length,
      active: [
        ...users.students,
        ...users.admins,
        ...users.externalAdmins,
      ].filter((u) => u.status === "active").length,
    };
  };

  const stats = getTotalStats();
  const filteredUsers = getFilteredUsers();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                User Management
              </h1>
              <p className="text-sm text-gray-500">
                Manage students, admins, and external partners
              </p>
            </div>
            <button
              onClick={handleCreateUser}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add{" "}
              {activeTab === "students"
                ? "Student"
                : activeTab === "admins"
                ? "Admin"
                : "External Admin"}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <UserGroupIcon className="h-8 w-8 text-indigo-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <AcademicCapIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Students</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.students}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ShieldCheckIcon className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Admins</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.admins}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <UsersIcon className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  External Admins
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.externalAdmins}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.active}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
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
                  <span
                    className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      activeTab === tab.id
                        ? "bg-indigo-100 text-indigo-600"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex-1 min-w-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Search users..."
                  value={filters.search}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}>
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filters.country}
                onChange={(e) => handleFilterChange("country", e.target.value)}>
                <option value="">All Countries</option>
                <option value="UK">UK</option>
                <option value="Germany">Germany</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="New Zealand">New Zealand</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No users found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Country
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {activeTab === "students"
                            ? "Applications"
                            : activeTab === "admins"
                            ? "Department"
                            : "Agency"}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Login
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={user.profilePhoto}
                                  alt={user.name}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {user.email}
                                </div>
                                <div className="text-xs text-gray-400">
                                  ID: {user.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {user.role === "student" && (
                                <AcademicCapIcon className="h-5 w-5 text-blue-500 mr-2" />
                              )}
                              {user.role === "admin" && (
                                <ShieldCheckIcon className="h-5 w-5 text-green-500 mr-2" />
                              )}
                              {user.role === "external_admin" && (
                                <UsersIcon className="h-5 w-5 text-purple-500 mr-2" />
                              )}
                              <span className="text-sm text-gray-900 capitalize">
                                {user.role === "external_admin"
                                  ? "External Admin"
                                  : user.role}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={user.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.country}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {activeTab === "students" &&
                              user.applications &&
                              `${user.applications} applications`}
                            {activeTab === "admins" &&
                              user.department &&
                              user.department}
                            {activeTab === "externalAdmins" &&
                              user.managedStudents &&
                              `${user.managedStudents} students`}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.lastLogin).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  if (user.role === "student") {
                                    navigate(`/users/student/${user.id}`);
                                  } else if (user.role === "admin") {
                                    navigate(`/users/admin/${user.id}`);
                                  } else if (user.role === "external_admin") {
                                    navigate(
                                      `/users/external-admin/${user.id}`
                                    );
                                  }
                                }}
                                className="text-indigo-600 hover:text-indigo-900"
                                title="View User">
                                <EyeIcon className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleEditUser(user.id)}
                                className="text-green-600 hover:text-green-900"
                                title="Edit User">
                                <PencilIcon className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600 hover:text-red-900"
                                title="Delete User">
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EnhancedUserManagement;
