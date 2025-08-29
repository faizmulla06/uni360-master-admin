import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlassIcon,
  UserIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// Mock data for global search
const mockSearchData = {
  students: [
    { id: 1, name: "John Doe", email: "john.doe@example.com", type: "student" },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      type: "student",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      type: "student",
    },
    {
      id: 4,
      name: "Bob Wilson",
      email: "bob.wilson@example.com",
      type: "student",
    },
  ],
  applications: [
    {
      id: 1,
      studentName: "John Doe",
      university: "University of Manchester",
      program: "Computer Science MSc",
      type: "application",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      university: "Imperial College London",
      program: "Data Science MSc",
      type: "application",
    },
    {
      id: 3,
      studentName: "Alice Johnson",
      university: "University of Edinburgh",
      program: "Business MBA",
      type: "application",
    },
    {
      id: 4,
      studentName: "Bob Wilson",
      university: "Technical University of Munich",
      program: "Engineering PhD",
      type: "application",
    },
  ],
  universities: [
    {
      id: 1,
      name: "University of Manchester",
      country: "United Kingdom",
      type: "university",
    },
    {
      id: 2,
      name: "Imperial College London",
      country: "United Kingdom",
      type: "university",
    },
    {
      id: 3,
      name: "University of Edinburgh",
      country: "United Kingdom",
      type: "university",
    },
    {
      id: 4,
      name: "Technical University of Munich",
      country: "Germany",
      type: "university",
    },
  ],
};

const GlobalSearch = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    // Simulate API delay
    const searchTimeout = setTimeout(() => {
      const searchQuery = query.toLowerCase();
      const searchResults = [];

      // Search students
      mockSearchData.students.forEach((student) => {
        if (
          student.name.toLowerCase().includes(searchQuery) ||
          student.email.toLowerCase().includes(searchQuery)
        ) {
          searchResults.push(student);
        }
      });

      // Search applications
      mockSearchData.applications.forEach((application) => {
        if (
          application.studentName.toLowerCase().includes(searchQuery) ||
          application.university.toLowerCase().includes(searchQuery) ||
          application.program.toLowerCase().includes(searchQuery)
        ) {
          searchResults.push(application);
        }
      });

      // Search universities
      mockSearchData.universities.forEach((university) => {
        if (
          university.name.toLowerCase().includes(searchQuery) ||
          university.country.toLowerCase().includes(searchQuery)
        ) {
          searchResults.push(university);
        }
      });

      setResults(searchResults.slice(0, 10)); // Limit to 10 results
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleResultClick = (result) => {
    switch (result.type) {
      case "student":
        navigate(`/users/${result.id}`);
        break;
      case "application":
        navigate(`/applications/${result.id}`);
        break;
      case "university":
        navigate(`/universities`);
        break;
      default:
        break;
    }
    onClose();
  };

  const getResultIcon = (type) => {
    switch (type) {
      case "student":
        return <UserIcon className="h-5 w-5 text-blue-500" />;
      case "application":
        return <DocumentTextIcon className="h-5 w-5 text-green-500" />;
      case "university":
        return <AcademicCapIcon className="h-5 w-5 text-purple-500" />;
      default:
        return <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getResultTitle = (result) => {
    switch (result.type) {
      case "student":
        return result.name;
      case "application":
        return `${result.studentName} - ${result.university}`;
      case "university":
        return result.name;
      default:
        return "";
    }
  };

  const getResultSubtitle = (result) => {
    switch (result.type) {
      case "student":
        return result.email;
      case "application":
        return result.program;
      case "university":
        return result.country;
      default:
        return "";
    }
  };

  const getResultTypeLabel = (type) => {
    switch (type) {
      case "student":
        return "Student";
      case "application":
        return "Application";
      case "university":
        return "University";
      default:
        return "";
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20"
        onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-96 overflow-hidden"
          onClick={(e) => e.stopPropagation()}>
          {/* Search Input */}
          <div className="border-b border-gray-200 p-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search students, applications, universities..."
                className="w-full pl-10 pr-10 py-3 border-0 text-lg focus:outline-none focus:ring-0"
              />
              <button
                onClick={onClose}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Search Results */}
          <div className="max-h-80 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                <p className="mt-2 text-sm text-gray-500">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {results.map((result) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleResultClick(result)}
                    className="w-full text-left p-4 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getResultIcon(result.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {getResultTitle(result)}
                          </p>
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {getResultTypeLabel(result.type)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {getResultSubtitle(result)}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : query.trim().length >= 2 ? (
              <div className="p-4 text-center">
                <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  No results found for &ldquo;{query}&rdquo;
                </p>
              </div>
            ) : (
              <div className="p-4 text-center">
                <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Type at least 2 characters to search
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GlobalSearch;
