import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  DocumentTextIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
// import { applicationsAPI } from "../../services/apiServices";

// Dummy data for applications
const dummyApplications = [
  {
    id: 1,
    studentName: "Alice Johnson",
    university: "University of Manchester",
    program: "Computer Science MSc",
    status: "submitted",
    dateSubmitted: "2024-01-15",
    agentName: "Agent Smith",
    country: "UK",
    documents: ["transcript", "sop", "resume"],
  },
  {
    id: 2,
    studentName: "Bob Wilson",
    university: "Technical University of Munich",
    program: "Engineering PhD",
    status: "approved",
    dateSubmitted: "2024-01-10",
    agentName: "Agent Brown",
    country: "Germany",
    documents: ["transcript", "sop", "resume", "research_proposal"],
  },
  {
    id: 3,
    studentName: "Carol Davis",
    university: "University of Edinburgh",
    program: "Business MBA",
    status: "pending",
    dateSubmitted: "2024-01-20",
    agentName: "Agent Smith",
    country: "UK",
    documents: ["transcript", "sop"],
  },
];

const ApplicationOversight = () => {
  const [applications, setApplications] = useState(dummyApplications);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    university: "",
    agent: "",
    page: 1,
    limit: 10,
  });
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [_totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    submitted: 0,
    underReview: 0,
    offers: 0,
    admitted: 0,
  });

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      // Commented out API call - using dummy data
      // const response = await applicationsAPI.getApplications(filters);
      // setApplications(response.data.applications);
      // setTotalPages(response.data.totalPages);

      // Using dummy data instead
      setApplications(dummyApplications);
      setTotalPages(1);

      // Calculate stats from dummy data
      setStats({
        total: dummyApplications.length,
        submitted: dummyApplications.filter((a) => a.status === "submitted")
          .length,
        underReview: dummyApplications.filter(
          (a) => a.status === "under_review"
        ).length,
        offers: dummyApplications.filter((a) => a.status === "offer_received")
          .length,
        admitted: dummyApplications.filter((a) => a.status === "admitted")
          .length,
      });
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  }, []); // Removed filters dependency since we're using dummy data

  const handleSearch = (e) => {
    setFilters({ ...filters, search: e.target.value, page: 1 });
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value, page: 1 });
  };

  const handleViewApplication = async (applicationId) => {
    try {
      // Commented out API call - using dummy data
      // const response = await applicationsAPI.getApplication(applicationId);
      // setSelectedApplication(response.data);

      // Find application in dummy data
      const application = dummyApplications.find((a) => a.id === applicationId);
      setSelectedApplication(application);
      setShowApplicationModal(true);
    } catch (error) {
      console.error("Error fetching application:", error);
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus, note) => {
    try {
      // Commented out API call
      // await applicationsAPI.updateApplicationStatus(applicationId, newStatus, note);

      // Update in dummy data
      const updatedApplications = applications.map((a) =>
        a.id === applicationId ? { ...a, status: newStatus, note: note } : a
      );
      setApplications(updatedApplications);

      // Update stats
      setStats({
        total: updatedApplications.length,
        submitted: updatedApplications.filter((a) => a.status === "submitted")
          .length,
        underReview: updatedApplications.filter(
          (a) => a.status === "under_review"
        ).length,
        offers: updatedApplications.filter((a) => a.status === "offer_received")
          .length,
        admitted: updatedApplications.filter((a) => a.status === "admitted")
          .length,
      });

      if (selectedApplication && selectedApplication.id === applicationId) {
        // Update selected application
        const updatedApp = updatedApplications.find(
          (a) => a.id === applicationId
        );
        setSelectedApplication(updatedApp);
      }
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      submitted: "bg-blue-100 text-blue-800",
      under_review: "bg-yellow-100 text-yellow-800",
      documents_requested: "bg-orange-100 text-orange-800",
      interview_scheduled: "bg-purple-100 text-purple-800",
      interview_completed: "bg-indigo-100 text-indigo-800",
      offer_received: "bg-green-100 text-green-800",
      admitted: "bg-emerald-100 text-emerald-800",
      rejected: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          styles[status] || "bg-gray-100 text-gray-800"
        }`}>
        {status.replace("_", " ")}
      </span>
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "submitted":
      case "under_review":
        return <ClockIcon className="h-4 w-4 text-yellow-500" />;
      case "offer_received":
      case "admitted":
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircleIcon className="h-4 w-4 text-red-500" />;
      default:
        return <DocumentTextIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Application Oversight
          </h1>
          <p className="text-sm text-gray-600">
            Monitor and manage all university applications
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {[
          {
            title: "Total Applications",
            value: stats.total,
            icon: DocumentTextIcon,
            color: "blue",
          },
          {
            title: "Submitted",
            value: stats.submitted,
            icon: ClockIcon,
            color: "yellow",
          },
          {
            title: "Under Review",
            value: stats.underReview,
            icon: EyeIcon,
            color: "orange",
          },
          {
            title: "Offers Received",
            value: stats.offers,
            icon: CheckCircleIcon,
            color: "green",
          },
          {
            title: "Admitted",
            value: stats.admitted,
            icon: AcademicCapIcon,
            color: "emerald",
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Search
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                placeholder="Search applications..."
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
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="documents_requested">Documents Requested</option>
              <option value="interview_scheduled">Interview Scheduled</option>
              <option value="offer_received">Offer Received</option>
              <option value="admitted">Admitted</option>
              <option value="rejected">Rejected</option>
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
              <option value="University of Oxford">University of Oxford</option>
              <option value="University of Cambridge">
                University of Cambridge
              </option>
              <option value="Technical University of Munich">
                Technical University of Munich
              </option>
              <option value="Imperial College London">
                Imperial College London
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Agent
            </label>
            <select
              value={filters.agent}
              onChange={(e) => handleFilterChange("agent", e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option value="">All Agents</option>
              <option value="John Smith">John Smith</option>
              <option value="Sarah Wilson">Sarah Wilson</option>
              <option value="Hans Mueller">Hans Mueller</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() =>
                setFilters({
                  search: "",
                  status: "",
                  university: "",
                  agent: "",
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

      {/* Applications Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <p className="mt-2 text-sm text-gray-500">
                Loading applications...
              </p>
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-12">
              <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No applications found
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
                      Application
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      University
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Agent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((application) => (
                    <motion.tr
                      key={application.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(application.status)}
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {application.applicationId}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.program}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {application.studentName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {application.studentEmail}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {application.universityName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {application.country}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {application.agentName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(application.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {application.submittedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              handleViewApplication(application.id)
                            }
                            className="text-indigo-600 hover:text-indigo-900"
                            title="View Details">
                            <EyeIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Application Details Modal */}
      {showApplicationModal && selectedApplication && (
        <ApplicationModal
          application={selectedApplication}
          onClose={() => setShowApplicationModal(false)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
};

// Application Details Modal Component
const ApplicationModal = ({ application, onClose, onStatusUpdate }) => {
  const [newStatus, setNewStatus] = useState("");
  const [statusNote, setStatusNote] = useState("");

  const handleStatusUpdate = () => {
    if (newStatus) {
      onStatusUpdate(application.id, newStatus, statusNote);
      setNewStatus("");
      setStatusNote("");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      submitted: "blue",
      under_review: "yellow",
      documents_requested: "orange",
      interview_scheduled: "purple",
      interview_completed: "indigo",
      offer_received: "green",
      admitted: "emerald",
      rejected: "red",
    };
    return colors[status] || "gray";
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Application Details: {application.applicationId}
                </h3>
                <p className="text-sm text-gray-500">
                  {application.studentName} - {application.program} at{" "}
                  {application.universityName}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600">
                <XCircleIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-900">
                  Basic Information
                </h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Student:{" "}
                    </span>
                    <span className="text-sm text-gray-900">
                      {application.studentName}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Email:{" "}
                    </span>
                    <span className="text-sm text-gray-900">
                      {application.studentEmail}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Agent:{" "}
                    </span>
                    <span className="text-sm text-gray-900">
                      {application.agentName}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Program:{" "}
                    </span>
                    <span className="text-sm text-gray-900">
                      {application.program}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      University:{" "}
                    </span>
                    <span className="text-sm text-gray-900">
                      {application.universityName}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Country:{" "}
                    </span>
                    <span className="text-sm text-gray-900">
                      {application.country}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Submitted:{" "}
                    </span>
                    <span className="text-sm text-gray-900">
                      {application.submittedDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Last Updated:{" "}
                    </span>
                    <span className="text-sm text-gray-900">
                      {application.lastUpdated}
                    </span>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-900">Documents</h4>
                <div className="space-y-2">
                  {application.documents.map((doc, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-900">{doc}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-md font-medium text-gray-900 mt-6">Fees</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Application Fee:{" "}
                    </span>
                    <span className="text-sm text-gray-900">
                      £{application.fees.applicationFee}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Tuition Fee:{" "}
                    </span>
                    <span className="text-sm text-gray-900">
                      £{application.fees.tuitionFee}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Status:{" "}
                    </span>
                    <span
                      className={`text-sm ${
                        application.fees.status === "paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}>
                      {application.fees.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-900 mb-4">
                Application Timeline
              </h4>
              <div className="flow-root">
                <ul className="-mb-8">
                  {application.timeline.map((event, eventIdx) => (
                    <li key={eventIdx}>
                      <div className="relative pb-8">
                        {eventIdx !== application.timeline.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span
                              className={`h-8 w-8 rounded-full bg-${getStatusColor(
                                event.status
                              )}-500 flex items-center justify-center ring-8 ring-white`}>
                              <CheckCircleIcon
                                className="h-5 w-5 text-white"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                Status updated to{" "}
                                <span className="font-medium text-gray-900">
                                  {event.status.replace("_", " ")}
                                </span>
                              </p>
                              {event.note && (
                                <p className="text-sm text-gray-400">
                                  {event.note}
                                </p>
                              )}
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              {event.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Status Update */}
            <div className="mt-6 border-t pt-4">
              <h4 className="text-md font-medium text-gray-900 mb-4">
                Update Status
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="">Select Status</option>
                    <option value="submitted">Submitted</option>
                    <option value="under_review">Under Review</option>
                    <option value="documents_requested">
                      Documents Requested
                    </option>
                    <option value="interview_scheduled">
                      Interview Scheduled
                    </option>
                    <option value="interview_completed">
                      Interview Completed
                    </option>
                    <option value="offer_received">Offer Received</option>
                    <option value="admitted">Admitted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Note
                  </label>
                  <input
                    type="text"
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                    placeholder="Optional note..."
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleStatusUpdate}
                    disabled={!newStatus}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 sm:text-sm">
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationOversight;
