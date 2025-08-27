import React from "react";
import { motion } from "framer-motion";
import { BellIcon, CheckIcon } from "@heroicons/react/24/outline";

const NotificationsPanel = ({ notifications, loading }) => {
  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="border-l-4 border-gray-200 pl-4">
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Latest Notifications
        </h3>
        <BellIcon className="h-6 w-6 text-gray-400" />
      </div>

      <div className="space-y-4 max-h-64 overflow-y-auto">
        {notifications?.length > 0 ? (
          notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border-l-4 pl-4 py-2 ${
                notification.read ? "border-gray-300" : "border-primary-500"
              }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p
                    className={`text-sm ${
                      notification.read
                        ? "text-gray-600"
                        : "text-gray-900 font-medium"
                    }`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.time}
                  </p>
                </div>
                {notification.read && (
                  <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0 ml-2" />
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <BellIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p>No notifications</p>
          </div>
        )}
      </div>

      {notifications?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View All Notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;
