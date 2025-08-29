import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { addToast } from "../../store/slices/toastSlice";
import {
  UserIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  PencilIcon,
  ArrowLeftIcon,
  CreditCardIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";

// Mock student data
const mockStudentData = {
  id: 1,
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+44 7700 900123",
    dateOfBirth: "1995-05-15",
    nationality: "British",
    address: {
      street: "123 Oxford Street",
      city: "London",
      state: "England",
      zipCode: "W1C 1DE",
      country: "United Kingdom",
    },
    profilePhoto:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
  academicInfo: {
    currentEducation: "Bachelor's in Computer Science",
    institution: "University of London",
    gpa: "3.8/4.0",
    graduationYear: "2024",
    englishProficiency: {
      test: "IELTS",
      score: "7.5",
      date: "2023-08-15",
    },
  },
  applications: [
    {
      id: 1,
      university: "University of Manchester",
      program: "Computer Science MSc",
      status: "approved",
      dateSubmitted: "2024-01-15",
      documents: ["transcript", "sop", "resume", "ielts"],
    },
    {
      id: 2,
      university: "Imperial College London",
      program: "Data Science MSc",
      status: "pending",
      dateSubmitted: "2024-01-20",
      documents: ["transcript", "sop", "resume"],
    },
  ],
  documents: [
    {
      id: 1,
      name: "Academic Transcript",
      type: "transcript",
      status: "verified",
      uploadDate: "2024-01-10",
      size: "2.3 MB",
    },
    {
      id: 2,
      name: "Statement of Purpose",
      type: "sop",
      status: "verified",
      uploadDate: "2024-01-12",
      size: "1.1 MB",
    },
    {
      id: 3,
      name: "Resume/CV",
      type: "resume",
      status: "pending",
      uploadDate: "2024-01-14",
      size: "850 KB",
    },
  ],
  payments: [
    {
      id: 1,
      type: "Application Fee",
      amount: 50,
      currency: "GBP",
      status: "completed",
      date: "2024-01-15",
      university: "University of Manchester",
    },
    {
      id: 2,
      type: "Service Fee",
      amount: 500,
      currency: "GBP",
      status: "pending",
      date: "2024-01-20",
      university: "Imperial College London",
    },
  ],
  agentInfo: {
    name: "Sarah Johnson",
    email: "sarah.johnson@uni360.com",
    phone: "+44 7700 900456",
  },
  status: "active",
  registrationDate: "2023-12-01",
  lastActivity: "2024-01-16T10:30:00Z",
};

const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "verified":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-green-100 text-green-800";
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

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [student, setStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStudent(mockStudentData);
      setLoading(false);
      dispatch(
        addToast({
          type: "success",
          title: "Student data loaded",
          message: "Student details have been successfully retrieved.",
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

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Student not found
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

  const handleEditStudent = () => {
    dispatch(
      addToast({
        type: "info",
        title: "Edit mode activated",
        message: "Student editing functionality will be available soon.",
      })
    );
  };

  const tabs = [
    { id: "overview", name: "Overview", icon: UserIcon },
    { id: "applications", name: "Applications", icon: AcademicCapIcon },
    { id: "documents", name: "Documents", icon: DocumentTextIcon },
    { id: "payments", name: "Payments", icon: CreditCardIcon },
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
                  {student.personalInfo.firstName}{" "}
                  {student.personalInfo.lastName}
                </h1>
                <p className="text-sm text-gray-500">
                  Student ID: {student.id}
                </p>
              </div>
            </div>
            <button
              onClick={handleEditStudent}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit Student
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
                src={student.personalInfo.profilePhoto}
                alt={`${student.personalInfo.firstName} ${student.personalInfo.lastName}`}
              />
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {student.personalInfo.firstName} {student.personalInfo.lastName}
              </h2>
              <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <EnvelopeIcon className="h-4 w-4 mr-1" />
                  {student.personalInfo.email}
                </div>
                <div className="flex items-center">
                  <PhoneIcon className="h-4 w-4 mr-1" />
                  {student.personalInfo.phone}
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  {student.personalInfo.address.country}
                </div>
              </div>
              <div className="mt-2">
                <StatusBadge status={student.status} />
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
                    {student.personalInfo.dateOfBirth}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Nationality
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {student.personalInfo.nationality}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="text-sm text-gray-900">
                    {student.personalInfo.address.street},{" "}
                    {student.personalInfo.address.city},{" "}
                    {student.personalInfo.address.zipCode},{" "}
                    {student.personalInfo.address.country}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Registration Date
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {student.registrationDate}
                  </dd>
                </div>
              </dl>
            </motion.div>

            {/* Academic Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Academic Information
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Current Education
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {student.academicInfo.currentEducation}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Institution
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {student.academicInfo.institution}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">GPA</dt>
                  <dd className="text-sm text-gray-900">
                    {student.academicInfo.gpa}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    English Proficiency
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {student.academicInfo.englishProficiency.test}:{" "}
                    {student.academicInfo.englishProficiency.score}
                  </dd>
                </div>
              </dl>
            </motion.div>

            {/* Agent Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Assigned Agent
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="text-sm text-gray-900">
                    {student.agentInfo.name}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="text-sm text-gray-900">
                    {student.agentInfo.email}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="text-sm text-gray-900">
                    {student.agentInfo.phone}
                  </dd>
                </div>
              </dl>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">
                    {student.applications.length}
                  </div>
                  <div className="text-sm text-gray-500">Applications</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {student.documents.length}
                  </div>
                  <div className="text-sm text-gray-500">Documents</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === "applications" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Applications
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      University & Program
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Documents
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {student.applications.map((application) => (
                    <tr key={application.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {application.university}
                          </div>
                          <div className="text-sm text-gray-500">
                            {application.program}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={application.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {application.dateSubmitted}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {application.documents.length} documents
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === "documents" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Documents</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
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
                  {student.documents.map((document) => (
                    <tr key={document.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {document.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {document.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={document.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {document.uploadDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {document.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                          <DocumentArrowDownIcon className="h-4 w-4 inline" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <CheckCircleIcon className="h-4 w-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === "payments" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Payment History
              </h3>
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
                      University
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {student.payments.map((payment) => (
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
                        {payment.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.university}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;
