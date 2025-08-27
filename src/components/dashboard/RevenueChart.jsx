import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="card h-80">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: data?.map((item) => item.month) || [],
    datasets: [
      {
        label: "Revenue Forecast",
        data: data?.map((item) => item.revenue) || [],
        borderColor: "#e08d3c",
        backgroundColor: "rgba(224, 141, 60, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#e08d3c",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#e08d3c",
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            return `Revenue: £${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
        },
      },
      y: {
        grid: {
          color: "#f3f4f6",
        },
        ticks: {
          color: "#6b7280",
          callback: function (value) {
            return "£" + value / 1000 + "K";
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Revenue Forecast
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Monthly Revenue</span>
        </div>
      </div>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Avg Monthly Growth:</span>
            <span className="ml-2 font-medium text-green-600">+8.5%</span>
          </div>
          <div>
            <span className="text-gray-600">YTD Revenue:</span>
            <span className="ml-2 font-medium text-gray-900">
              £
              {data
                ?.reduce((sum, item) => sum + item.revenue, 0)
                .toLocaleString() || "0"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
