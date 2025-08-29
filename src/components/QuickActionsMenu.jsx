import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  UserPlusIcon,
  DocumentPlusIcon,
  AcademicCapIcon,
  CalendarIcon,
  CreditCardIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const QuickActionsMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: "add-student",
      name: "Add New Student",
      description: "Register a new student in the system",
      icon: UserPlusIcon,
      action: () => {
        navigate("/users?action=create&type=student");
        onClose();
      },
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      id: "add-application",
      name: "Create Application",
      description: "Submit a new university application",
      icon: DocumentPlusIcon,
      action: () => {
        navigate("/applications?action=create");
        onClose();
      },
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      id: "add-university",
      name: "Add University",
      description: "Register a new university partner",
      icon: AcademicCapIcon,
      action: () => {
        navigate("/universities?action=create");
        onClose();
      },
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      id: "schedule-appointment",
      name: "Schedule Meeting",
      description: "Book an appointment with a student",
      icon: CalendarIcon,
      action: () => {
        navigate("/appointments?action=create");
        onClose();
      },
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      id: "process-payment",
      name: "Process Payment",
      description: "Record or process a payment",
      icon: CreditCardIcon,
      action: () => {
        navigate("/payments?action=create");
        onClose();
      },
      color: "bg-red-500 hover:bg-red-600",
    },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-hidden"
          onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Quick Actions
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Common tasks and shortcuts
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 focus:outline-none">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Actions Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={action.id}
                    onClick={action.action}
                    className="text-left p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}>
                    <div className="flex items-start space-x-3">
                      <div
                        className={`flex-shrink-0 p-2 rounded-lg ${action.color} text-white`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900">
                          {action.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              Press{" "}
              <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Esc</kbd>{" "}
              to close
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickActionsMenu;
