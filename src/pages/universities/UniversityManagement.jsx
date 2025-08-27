import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BuildingOffice2Icon,
  MagnifyingGlassIcon,
  PlusIcon,
  FunnelIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  CurrencyPoundIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
// import { universitiesAPI } from "../../services/apiServices";

// Dummy data for universities
const dummyUniversities = [
  {
    id: 1,
    name: "University of Manchester",
    country: "UK",
    city: "Manchester",
    status: "active",
    ranking: 27,
    establishedYear: 1824,
    tuitionFee: 28000,
    programs: 85,
    description: "A leading research university in the UK",
  },
  {
    id: 2,
    name: "Technical University of Munich",
    country: "Germany",
    city: "Munich",
    status: "active",
    ranking: 45,
    establishedYear: 1868,
    tuitionFee: 5000,
    programs: 65,
    description: "One of Europe's top technical universities",
  },
  {
    id: 3,
    name: "University of Edinburgh",
    country: "UK",
    city: "Edinburgh",
    status: "active",
    ranking: 18,
    establishedYear: 1583,
    tuitionFee: 32000,
    programs: 95,
    description: "Historic university with excellent research programs",
  },
];

const UniversityManagement = () => {
  const [universities, setUniversities] = useState(dummyUniversities);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    country: "",
    status: "",
    page: 1,
    limit: 10,
  });
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [showUniversityModal, setShowUniversityModal] = useState(false);
  const [modalMode, setModalMode] = useState("view"); // 'view', 'create', 'edit'
  const [stats, setStats] = useState({
    total: 3,
    uk: 2,
    germany: 1,
    active: 3,
  });

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      // Commented out API call - using dummy data
      // const response = await universitiesAPI.getUniversities(filters);
      // setUniversities(response.data.universities);

      // Using dummy data instead
      setUniversities(dummyUniversities);

      // Calculate stats from dummy data
      setStats({
        total: dummyUniversities.length,
        uk: dummyUniversities.filter((u) => u.country === "UK").length,
        germany: dummyUniversities.filter((u) => u.country === "Germany")
          .length,
        active: dummyUniversities.filter((u) => u.status === "active").length,
      });
    } catch (error) {
      console.error("Error fetching universities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleSearch = (e) => {
    setFilters({ ...filters, search: e.target.value, page: 1 });
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value, page: 1 });
  };

  const handleCreateUniversity = () => {
    setSelectedUniversity(null);
    setModalMode("create");
    setShowUniversityModal(true);
  };

  const handleViewUniversity = async (universityId) => {
    try {
      // Commented out API call - using dummy data
      // const response = await universitiesAPI.getUniversity(universityId);
      // setSelectedUniversity(response.data);

      // Find university in dummy data
      const university = dummyUniversities.find((u) => u.id === universityId);
      setSelectedUniversity(university);
      setModalMode("view");
      setShowUniversityModal(true);
    } catch (error) {
      console.error("Error fetching university:", error);
    }
  };

  const handleEditUniversity = async (universityId) => {
    try {
      // Commented out API call - using dummy data
      // const response = await universitiesAPI.getUniversity(universityId);
      // setSelectedUniversity(response.data);

      // Find university in dummy data
      const university = dummyUniversities.find((u) => u.id === universityId);
      setSelectedUniversity(university);
      setModalMode("edit");
      setShowUniversityModal(true);
    } catch (error) {
      console.error("Error fetching university:", error);
    }
  };

  const handleDeleteUniversity = async (universityId) => {
    if (window.confirm("Are you sure you want to delete this university?")) {
      try {
        // Commented out API call
        // await universitiesAPI.deleteUniversity(universityId);

        // Remove from dummy data
        const updatedUniversities = universities.filter(
          (u) => u.id !== universityId
        );
        setUniversities(updatedUniversities);

        // Update stats
        setStats({
          total: updatedUniversities.length,
          uk: updatedUniversities.filter((u) => u.country === "UK").length,
          germany: updatedUniversities.filter((u) => u.country === "Germany")
            .length,
          active: updatedUniversities.filter((u) => u.status === "active")
            .length,
        });
      } catch (error) {
        console.error("Error deleting university:", error);
      }
    }
  };

  const handleSaveUniversity = async (universityData) => {
    try {
      if (modalMode === "create") {
        // Commented out API call
        // await universitiesAPI.createUniversity(universityData);

        // Add to dummy data
        const newUniversity = {
          ...universityData,
          id: universities.length + 1,
        };
        const updatedUniversities = [...universities, newUniversity];
        setUniversities(updatedUniversities);
      } else if (modalMode === "edit") {
        // Commented out API call
        // await universitiesAPI.updateUniversity(selectedUniversity.id, universityData);

        // Update in dummy data
        const updatedUniversities = universities.map((u) =>
          u.id === selectedUniversity.id ? { ...u, ...universityData } : u
        );
        setUniversities(updatedUniversities);
      }
      setShowUniversityModal(false);
      // fetchUniversities(); // Comment out as well
    } catch (error) {
      console.error("Error saving university:", error);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          styles[status] || "bg-gray-100 text-gray-800"
        }`}>
        {status}
      </span>
    );
  };

  const getRankingBadge = (ranking) => {
    if (ranking <= 10) {
      return <span className="text-yellow-500 font-medium">Top 10</span>;
    } else if (ranking <= 50) {
      return <span className="text-green-500 font-medium">Top 50</span>;
    } else if (ranking <= 100) {
      return <span className="text-blue-500 font-medium">Top 100</span>;
    }
    return <span className="text-gray-500">{ranking}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Partner Institute Management
          </h1>
          <p className="text-sm text-gray-600">
            Manage university partnerships and details
          </p>
        </div>
        <button
          onClick={handleCreateUniversity}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add University
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Total Universities",
            value: stats.total,
            icon: BuildingOffice2Icon,
            color: "blue",
          },
          {
            title: "UK Universities",
            value: stats.uk,
            icon: GlobeAltIcon,
            color: "green",
          },
          {
            title: "Germany Universities",
            value: stats.germany,
            icon: GlobeAltIcon,
            color: "purple",
          },
          {
            title: "Active Partners",
            value: stats.active,
            icon: AcademicCapIcon,
            color: "orange",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
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
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>
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
                placeholder="Search universities..."
                value={filters.search}
                onChange={handleSearch}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md pl-10"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              value={filters.country}
              onChange={(e) => handleFilterChange("country", e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option value="">All Countries</option>
              <option value="UK">United Kingdom</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Canada">Canada</option>
            </select>
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() =>
                setFilters({
                  search: "",
                  country: "",
                  status: "",
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

      {/* Universities Grid */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <p className="mt-2 text-sm text-gray-500">
                Loading universities...
              </p>
            </div>
          ) : universities.length === 0 ? (
            <div className="text-center py-12">
              <BuildingOffice2Icon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No universities found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {universities.map((university) => (
                <motion.div
                  key={university.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <img
                          src={university.logo}
                          alt={university.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {university.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {university.location}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Ranking:
                          </span>
                          <div className="flex items-center">
                            <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                            {getRankingBadge(university.ranking)}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Programs:
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            {university.programs}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Students:
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            {university.totalStudents.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Tuition:
                          </span>
                          <div className="flex items-center">
                            <CurrencyPoundIcon className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm font-medium text-gray-900">
                              £{university.tuitionFee.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Commission:
                          </span>
                          <span className="text-sm font-medium text-green-600">
                            {university.commissionRate}%
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Status:</span>
                          {getStatusBadge(university.status)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => handleViewUniversity(university.id)}
                      className="flex-1 text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                      title="View Details">
                      <EyeIcon className="h-4 w-4 inline mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => handleEditUniversity(university.id)}
                      className="flex-1 text-green-600 hover:text-green-900 text-sm font-medium"
                      title="Edit University">
                      <PencilIcon className="h-4 w-4 inline mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUniversity(university.id)}
                      className="flex-1 text-red-600 hover:text-red-900 text-sm font-medium"
                      title="Delete University">
                      <TrashIcon className="h-4 w-4 inline mr-1" />
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* University Modal */}
      {showUniversityModal && (
        <UniversityModal
          university={selectedUniversity}
          mode={modalMode}
          onClose={() => setShowUniversityModal(false)}
          onSave={handleSaveUniversity}
        />
      )}
    </div>
  );
};

// University Modal Component
const UniversityModal = ({ university, mode, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    country: "UK",
    location: "",
    type: "Public",
    tuitionFee: 0,
    commissionRate: 0,
    status: "active",
    programs: 0,
    ranking: 0,
    totalStudents: 0,
    internationalStudents: 0,
    acceptanceRate: 0,
    establishedYear: new Date().getFullYear(),
    contactEmail: "",
    contactPhone: "",
  });

  useEffect(() => {
    if (university) {
      setFormData({
        name: university.name || "",
        country: university.country || "UK",
        location: university.location || "",
        type: university.type || "Public",
        tuitionFee: university.tuitionFee || 0,
        commissionRate: university.commissionRate || 0,
        status: university.status || "active",
        programs: university.programs || 0,
        ranking: university.ranking || 0,
        totalStudents: university.totalStudents || 0,
        internationalStudents: university.internationalStudents || 0,
        acceptanceRate: university.acceptanceRate || 0,
        establishedYear: university.establishedYear || new Date().getFullYear(),
        contactEmail: university.contactEmail || "",
        contactPhone: university.contactPhone || "",
      });
    }
  }, [university]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const isReadOnly = mode === "view";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {mode === "create"
                    ? "Add University"
                    : mode === "edit"
                    ? "Edit University"
                    : "University Details"}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      University Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      disabled={isReadOnly}
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      disabled={isReadOnly}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100">
                      <option value="UK">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      disabled={isReadOnly}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      disabled={isReadOnly}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100">
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tuition Fee (£)
                    </label>
                    <input
                      type="number"
                      value={formData.tuitionFee}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tuitionFee: Number(e.target.value),
                        })
                      }
                      disabled={isReadOnly}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Commission Rate (%)
                    </label>
                    <input
                      type="number"
                      value={formData.commissionRate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          commissionRate: Number(e.target.value),
                        })
                      }
                      disabled={isReadOnly}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      disabled={isReadOnly}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Number of Programs
                    </label>
                    <input
                      type="number"
                      value={formData.programs}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          programs: Number(e.target.value),
                        })
                      }
                      disabled={isReadOnly}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      World Ranking
                    </label>
                    <input
                      type="number"
                      value={formData.ranking}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ranking: Number(e.target.value),
                        })
                      }
                      disabled={isReadOnly}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Total Students
                    </label>
                    <input
                      type="number"
                      value={formData.totalStudents}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          totalStudents: Number(e.target.value),
                        })
                      }
                      disabled={isReadOnly}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      International Students
                    </label>
                    <input
                      type="number"
                      value={formData.internationalStudents}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          internationalStudents: Number(e.target.value),
                        })
                      }
                      disabled={isReadOnly}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Acceptance Rate (%)
                    </label>
                    <input
                      type="number"
                      value={formData.acceptanceRate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          acceptanceRate: Number(e.target.value),
                        })
                      }
                      disabled={isReadOnly}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Established Year
                    </label>
                    <input
                      type="number"
                      value={formData.establishedYear}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          establishedYear: Number(e.target.value),
                        })
                      }
                      disabled={isReadOnly}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contactEmail: e.target.value,
                        })
                      }
                      disabled={isReadOnly}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              {!isReadOnly && (
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                  {mode === "create" ? "Add University" : "Save Changes"}
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                {isReadOnly ? "Close" : "Cancel"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UniversityManagement;
