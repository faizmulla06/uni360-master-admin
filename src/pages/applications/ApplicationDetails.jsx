import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  DocumentTextIcon,
  UserIcon,
  AcademicCapIcon,
  MapPinIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon,
  PencilIcon,
  ChatBubbleLeftRightIcon,
  DocumentArrowDownIcon,
  EyeIcon,
  CreditCardIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

// Mock application data
const mockApplicationData = {
  id: 1,
  applicationNumber: "APP-2024-001",
  status: "pending",
  submissionDate: "2024-01-15T10:30:00Z",
  lastUpdated: "2024-01-16T14:20:00Z",
  
  student: {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+44 7700 900123",
    nationality: "British",
    profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
  
  university: {
    id: 1,
    name: "University of Manchester",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop",
    country: "United Kingdom",
    ranking: "27th in QS World Rankings",
    location: "Manchester, UK",
  },
  
  program: {
    name: "Computer Science MSc",
    duration: "12 months",
    startDate: "September 2024",
    tuitionFee: "£28,000",
    requirements: {
      gpa: "3.0 minimum",
      englishTest: "IELTS 6.5 or TOEFL 90",
      workExperience: "Not required",
    },
  },
  
  agent: {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@uni360.com",
    phone: "+44 7700 900456",
    profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=400&h=400&fit=crop&crop=face",
  },
  
  documents: [
    {
      id: 1,
      name: "Academic Transcript",
      type: "transcript",
      status: "verified",
      uploadDate: "2024-01-10T09:00:00Z",
      verifiedDate: "2024-01-11T15:30:00Z",
      size: "2.3 MB",
      required: true,
    },
    {
      id: 2,
      name: "Statement of Purpose",
      type: "sop",
      status: "verified",
      uploadDate: "2024-01-12T11:00:00Z",
      verifiedDate: "2024-01-13T10:15:00Z",
      size: "1.1 MB",
      required: true,
    },
    {
      id: 3,
      name: "Resume/CV",
      type: "resume",
      status: "pending",
      uploadDate: "2024-01-14T14:30:00Z",
      size: "850 KB",
      required: true,
    },
    {
      id: 4,
      name: "IELTS Certificate",
      type: "english_test",
      status: "verified",
      uploadDate: "2024-01-13T16:45:00Z",
      verifiedDate: "2024-01-14T09:20:00Z",
      size: "1.5 MB",
      required: true,
    },
    {
      id: 5,
      name: "Passport Copy",
      type: "passport",
      status: "missing",
      required: true,
    },
  ],
  
  timeline: [
    {
      id: 1,
      action: "Application Submitted",
      date: "2024-01-15T10:30:00Z",
      status: "completed",
      actor: "John Doe (Student)",
      description: "Initial application submitted with basic documents",
    },
    {
      id: 2,
      action: "Documents Under Review",
      date: "2024-01-15T11:00:00Z",
      status: "completed",
      actor: "Sarah Johnson (Agent)",
      description: "All submitted documents are being reviewed for completeness",
    },
    {
      id: 3,
      action: "Additional Documents Requested",
      date: "2024-01-16T09:15:00Z",
      status: "current",
      actor: "University of Manchester",
      description: "Passport copy and updated CV required for processing",
    },
    {
      id: 4,
      action: "University Review",
      date: null,
      status: "pending",
      actor: "University of Manchester",
      description: "Application will be reviewed by the admissions committee",
    },
    {
      id: 5,
      action: "Decision",
      date: null,
      status: "pending",
      actor: "University of Manchester",
      description: "Final admission decision will be communicated",
    },
  ],
  
  payments: [
    {
      id: 1,
      type: "Application Fee",
      amount: 50,
      currency: "GBP",
      status: "completed",
      date: "2024-01-15T10:30:00Z",
      paymentMethod: "Credit Card",
      transactionId: "TXN-APP-001",
    },
    {
      id: 2,
      type: "Service Fee",
      amount: 500,
      currency: "GBP",
      status: "pending",
      date: "2024-01-20T00:00:00Z",
      paymentMethod: "Bank Transfer",
      dueDate: "2024-01-25T23:59:59Z",
    },
  ],
  
  notes: [
    {
      id: 1,
      author: "Sarah Johnson",
      date: "2024-01-16T14:20:00Z",
      content: "Student needs to upload passport copy. Reminder email sent.",
      type: "internal",
    },
    {
      id: 2,
      author: "University of Manchester",
      date: "2024-01-16T09:15:00Z",
      content: "Please provide a recent passport copy and updated CV with current contact information.",
      type: "external",
    },
  ],
};

const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case "approved":
        return { color: "bg-green-100 text-green-800", icon: CheckCircleIcon };
      case "pending":
        return { color: "bg-yellow-100 text-yellow-800", icon: ClockIcon };
      case "rejected":
        return { color: "bg-red-100 text-red-800", icon: XCircleIcon };
      case "verified":
        return { color: "bg-green-100 text-green-800", icon: CheckCircleIcon };
      case "completed":
        return { color: "bg-green-100 text-green-800", icon: CheckCircleIcon };
      case "missing":
        return { color: "bg-red-100 text-red-800", icon: ExclamationTriangleIcon };
      case "current":
        return { color: "bg-blue-100 text-blue-800", icon: ClockIcon };
      default:
        return { color: "bg-gray-100 text-gray-800", icon: ClockIcon };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      <Icon className="h-3 w-3 mr-1" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setApplication(mockApplicationData);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Application not found</h2>
          <button
            onClick={() => navigate("/applications")}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Applications
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", name: "Overview", icon: DocumentTextIcon },
    { id: "documents", name: "Documents", icon: DocumentTextIcon },
    { id: "timeline", name: "Timeline", icon: ClockIcon },
    { id: "payments", name: "Payments", icon: CreditCardIcon },
    { id: "notes", name: "Notes", icon: ChatBubbleLeftRightIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/applications")}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back
              </button>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  Application #{application.applicationNumber}
                </h1>
                <p className="text-sm text-gray-500">
                  Submitted on {new Date(application.submissionDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <StatusBadge status={application.status} />
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                <PencilIcon className="h-4 w-4 mr-2" />
                Update Status
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Application Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Student Info */}
            <div className="flex items-center">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src={application.student.profilePhoto}
                alt={application.student.name}
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{application.student.name}</h3>
                <p className="text-sm text-gray-500">{application.student.email}</p>
              </div>
            </div>

            {/* University Info */}
            <div className="flex items-center">
              <img
                className="h-12 w-12 rounded-lg object-cover"
                src={application.university.logo}
                alt={application.university.name}
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{application.university.name}</h3>
                <p className="text-sm text-gray-500">{application.program.name}</p>
              </div>
            </div>

            {/* Agent Info */}
            <div className="flex items-center">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src={application.agent.profilePhoto}
                alt={application.agent.name}
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{application.agent.name}</h3>
                <p className="text-sm text-gray-500">Assigned Agent</p>
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
                  }`}
                >
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
            {/* Application Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">Application Details</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Application Number</dt>
                  <dd className="text-sm text-gray-900">{application.applicationNumber}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="text-sm text-gray-900">
                    <StatusBadge status={application.status} />
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Submission Date</dt>
                  <dd className="text-sm text-gray-900">
                    {new Date(application.submissionDate).toLocaleString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                  <dd className="text-sm text-gray-900">
                    {new Date(application.lastUpdated).toLocaleString()}
                  </dd>
                </div>
              </dl>
            </motion.div>

            {/* Program Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">Program Information</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Program</dt>
                  <dd className="text-sm text-gray-900">{application.program.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Duration</dt>
                  <dd className="text-sm text-gray-900">{application.program.duration}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                  <dd className="text-sm text-gray-900">{application.program.startDate}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Tuition Fee</dt>
                  <dd className="text-sm text-gray-900">{application.program.tuitionFee}</dd>
                </div>
              </dl>
            </motion.div>

            {/* University Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">University Information</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">University</dt>
                  <dd className="text-sm text-gray-900">{application.university.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="text-sm text-gray-900">{application.university.location}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Ranking</dt>
                  <dd className="text-sm text-gray-900">{application.university.ranking}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Country</dt>
                  <dd className="text-sm text-gray-900">{application.university.country}</dd>
                </div>
              </dl>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">Program Requirements</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Minimum GPA</dt>
                  <dd className="text-sm text-gray-900">{application.program.requirements.gpa}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">English Test</dt>
                  <dd className="text-sm text-gray-900">{application.program.requirements.englishTest}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Work Experience</dt>
                  <dd className="text-sm text-gray-900">{application.program.requirements.workExperience}</dd>
                </div>
              </dl>
            </motion.div>
          </div>
        )}

        {activeTab === "documents" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Required Documents</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Upload Date
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
                  {application.documents.map((document) => (
                    <tr key={document.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{document.name}</div>
                            <div className="text-sm text-gray-500">{document.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={document.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {document.uploadDate ? new Date(document.uploadDate).toLocaleDateString() : "Not uploaded"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {document.size || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {document.status !== "missing" && (
                            <>
                              <button className="text-indigo-600 hover:text-indigo-900">
                                <EyeIcon className="h-4 w-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900">
                                <DocumentArrowDownIcon className="h-4 w-4" />
                              </button>
                            </>
                          )}
                          {document.status === "pending" && (
                            <button className="text-green-600 hover:text-green-900">
                              <CheckCircleIcon className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === "timeline" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-6">Application Timeline</h3>
            <div className="flow-root">
              <ul className="-mb-8">
                {application.timeline.map((event, eventIdx) => (
                  <li key={event.id}>
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
                            className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                              event.status === "completed"
                                ? "bg-green-500"
                                : event.status === "current"
                                ? "bg-blue-500"
                                : "bg-gray-400"
                            }`}
                          >
                            {event.status === "completed" ? (
                              <CheckCircleIcon className="h-5 w-5 text-white" />
                            ) : event.status === "current" ? (
                              <ClockIcon className="h-5 w-5 text-white" />
                            ) : (
                              <div className="h-2 w-2 bg-white rounded-full" />
                            )}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              <span className="font-medium text-gray-900">{event.action}</span> by {event.actor}
                            </p>
                            <p className="mt-2 text-sm text-gray-700">{event.description}</p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            {event.date ? new Date(event.date).toLocaleDateString() : "Pending"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {activeTab === "payments" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Payment Information</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {application.payments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payment.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.currency} {payment.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={payment.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(payment.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.paymentMethod}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.transactionId || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === "notes" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Note</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Note Type</label>
                  <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Internal Note</option>
                    <option>External Communication</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Note Content</label>
                  <textarea
                    rows={4}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your note here..."
                  />
                </div>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                  Add Note
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Notes History</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {application.notes.map((note) => (
                  <div key={note.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {note.author.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{note.author}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(note.date).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          note.type === "internal"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {note.type}
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-700">{note.content}</p>
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

export default ApplicationDetails;
