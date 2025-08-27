import React from "react";
import { motion } from "framer-motion";

const ConversionFunnel = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="card h-80">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
                <div className="flex-1 h-8 bg-gray-200 rounded"></div>
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const funnelData = [
    {
      name: "Leads",
      value: data?.leads || 0,
      color: "bg-blue-500",
      width: "100%",
    },
    {
      name: "Applications",
      value: data?.applications || 0,
      color: "bg-green-500",
      width: "75%",
    },
    {
      name: "Offers",
      value: data?.offers || 0,
      color: "bg-yellow-500",
      width: "55%",
    },
    {
      name: "Admissions",
      value: data?.admissions || 0,
      color: "bg-primary-500",
      width: "35%",
    },
  ];

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Conversion Funnel
      </h3>
      <div className="space-y-4">
        {funnelData.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center">
            <div className="w-20 text-sm font-medium text-gray-700">
              {item.name}
            </div>
            <div className="flex-1 mx-4">
              <div className="relative">
                <div className="h-8 bg-gray-200 rounded-lg overflow-hidden">
                  <motion.div
                    className={`h-full ${item.color} flex items-center justify-center`}
                    initial={{ width: 0 }}
                    animate={{ width: item.width }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}>
                    <span className="text-white font-medium text-sm">
                      {item.value}
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="w-16 text-right">
              <span className="text-sm font-medium text-gray-900">
                {item.value}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Conversion Rate:</span>
          <span className="font-medium text-green-600">
            {data?.leads
              ? ((data.admissions / data.leads) * 100).toFixed(1)
              : 0}
            %
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConversionFunnel;
