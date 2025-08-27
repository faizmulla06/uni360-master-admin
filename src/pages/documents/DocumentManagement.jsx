import React, { useState } from "react";
import {
  DocumentTextIcon,
  FolderIcon,
  CloudArrowUpIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

const DocumentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const documentCategories = [
    { id: "all", name: "All Documents", count: 847 },
    { id: "applications", name: "Applications", count: 324 },
    { id: "transcripts", name: "Transcripts", count: 156 },
    { id: "certificates", name: "Certificates", count: 89 },
    { id: "letters", name: "Recommendation Letters", count: 134 },
    { id: "financial", name: "Financial Documents", count: 67 },
    { id: "visa", name: "Visa Documents", count: 77 },
  ];

  const documents = [
    {
      id: 1,
      name: "Application_Form_JohnSmith.pdf",
      type: "application",
      size: "2.4 MB",
      uploadDate: "2025-08-27",
      student: "John Smith",
      university: "Harvard University",
      status: "approved",
    },
    {
      id: 2,
      name: "Transcript_SarahJohnson.pdf",
      type: "transcript",
      size: "1.8 MB",
      uploadDate: "2025-08-26",
      student: "Sarah Johnson",
      university: "MIT",
      status: "pending",
    },
    {
      id: 3,
      name: "RecommendationLetter_MikeWilson.pdf",
      type: "letter",
      size: "856 KB",
      uploadDate: "2025-08-25",
      student: "Mike Wilson",
      university: "Stanford University",
      status: "reviewed",
    },
    {
      id: 4,
      name: "FinancialStatement_EmilyBrown.pdf",
      type: "financial",
      size: "1.2 MB",
      uploadDate: "2025-08-24",
      student: "Emily Brown",
      university: "Yale University",
      status: "approved",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewed":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDocumentIcon = () => {
    return DocumentTextIcon;
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.student.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || doc.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Document Management
        </h1>
        <button className="btn-primary">
          <CloudArrowUpIcon className="h-5 w-5" />
          Upload Document
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input-field"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field">
              {documentCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
            <div className="flex rounded-lg border border-gray-300">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 text-sm font-medium ${
                  viewMode === "grid"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}>
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 text-sm font-medium ${
                  viewMode === "list"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}>
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Document Categories Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {documentCategories.slice(1).map((category) => (
          <div
            key={category.id}
            className={`card cursor-pointer transition-colors hover:bg-gray-50 ${
              selectedCategory === category.id ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setSelectedCategory(category.id)}>
            <div className="text-center">
              <FolderIcon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">
                {category.name}
              </p>
              <p className="text-xs text-gray-500">{category.count} files</p>
            </div>
          </div>
        ))}
      </div>

      {/* Documents Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDocuments.map((doc) => {
            const IconComponent = getDocumentIcon();
            return (
              <div
                key={doc.id}
                className="card hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <IconComponent className="h-8 w-8 text-blue-500" />
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      doc.status
                    )}`}>
                    {doc.status}
                  </span>
                </div>
                <h3
                  className="font-medium text-gray-900 mb-2 truncate"
                  title={doc.name}>
                  {doc.name}
                </h3>
                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <p>Student: {doc.student}</p>
                  <p>University: {doc.university}</p>
                  <p>Size: {doc.size}</p>
                  <p>Uploaded: {doc.uploadDate}</p>
                </div>
                <div className="flex justify-between items-center">
                  <button className="text-blue-600 hover:text-blue-700">
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button className="text-green-600 hover:text-green-700">
                    <ArrowDownTrayIcon className="h-4 w-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-700">
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-700">
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    University
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <DocumentTextIcon className="h-5 w-5 text-blue-500 mr-3" />
                        <span className="text-sm font-medium text-gray-900">
                          {doc.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doc.student}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doc.university}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doc.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          doc.status
                        )}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doc.uploadDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-700">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-700">
                          <ArrowDownTrayIcon className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-700">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">
            No documents found
          </p>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default DocumentManagement;
