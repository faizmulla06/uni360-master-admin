import React, { useState } from "react";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  AcademicCapIcon,
  VideoCameraIcon,
  PhoneIcon,
  MapPinIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const AppointmentOversight = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [viewMode, setViewMode] = useState("list");
  const [filterStatus, setFilterStatus] = useState("all");

  const appointmentStats = [
    {
      name: "Today's Appointments",
      value: "12",
      change: "+3",
      icon: CalendarIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      name: "Pending Confirmations",
      value: "5",
      change: "-1",
      icon: ClockIcon,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      name: "Completed Today",
      value: "8",
      change: "+2",
      icon: CheckCircleIcon,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      name: "Cancelled Today",
      value: "2",
      change: "+1",
      icon: XCircleIcon,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ];

  const appointments = [
    {
      id: 1,
      title: "University Consultation",
      student: "John Smith",
      counselor: "Dr. Sarah Johnson",
      university: "Harvard University",
      date: "2025-08-27",
      time: "10:00 AM",
      duration: "60 min",
      type: "video",
      status: "confirmed",
      location: "Online - Zoom",
    },
    {
      id: 2,
      title: "Application Review",
      student: "Emily Brown",
      counselor: "Prof. Michael Davis",
      university: "MIT",
      date: "2025-08-27",
      time: "2:00 PM",
      duration: "45 min",
      type: "phone",
      status: "pending",
      location: "Phone Call",
    },
    {
      id: 3,
      title: "Visa Interview Prep",
      student: "Alex Wilson",
      counselor: "Ms. Lisa Chen",
      university: "Stanford University",
      date: "2025-08-27",
      time: "4:30 PM",
      duration: "90 min",
      type: "in-person",
      status: "confirmed",
      location: "Office 201, Main Building",
    },
    {
      id: 4,
      title: "Career Guidance",
      student: "Maria Garcia",
      counselor: "Dr. Robert Kim",
      university: "Yale University",
      date: "2025-08-28",
      time: "11:00 AM",
      duration: "60 min",
      type: "video",
      status: "cancelled",
      location: "Online - Teams",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return VideoCameraIcon;
      case "phone":
        return PhoneIcon;
      case "in-person":
        return MapPinIcon;
      default:
        return CalendarIcon;
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    if (filterStatus === "all") return true;
    return appointment.status === filterStatus;
  });

  const upcomingAppointments = appointments.filter(
    (apt) =>
      apt.status === "confirmed" &&
      new Date(apt.date + " " + apt.time) > new Date()
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Appointments Oversight
        </h1>
        <button className="btn-primary">
          <PlusIcon className="h-5 w-5" />
          Schedule Appointment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {appointmentStats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">
                  {stat.change} from yesterday
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar and Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Date Selector */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Select Date
            </h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input-field w-full"
            />
          </div>

          {/* Quick Stats */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Quick Overview
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Total Appointments
                </span>
                <span className="font-semibold text-gray-900">
                  {appointments.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Upcoming</span>
                <span className="font-semibold text-blue-600">
                  {upcomingAppointments.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Success Rate</span>
                <span className="font-semibold text-green-600">94.2%</span>
              </div>
            </div>
          </div>

          {/* Filter Options */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Filter by Status
            </h3>
            <div className="space-y-2">
              {["all", "confirmed", "pending", "cancelled", "completed"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      filterStatus === status
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Appointments ({filteredAppointments.length})
              </h3>
              <div className="flex items-center space-x-2">
                <select
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value)}
                  className="input-field">
                  <option value="list">List View</option>
                  <option value="grid">Grid View</option>
                </select>
              </div>
            </div>

            {viewMode === "list" ? (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => {
                  const TypeIcon = getTypeIcon(appointment.type);
                  return (
                    <div
                      key={appointment.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <TypeIcon className="h-5 w-5 text-blue-500" />
                          <h4 className="font-medium text-gray-900">
                            {appointment.title}
                          </h4>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            appointment.status
                          )}`}>
                          {appointment.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <UserIcon className="h-4 w-4 mr-2" />
                            Student: {appointment.student}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <UserIcon className="h-4 w-4 mr-2" />
                            Counselor: {appointment.counselor}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <AcademicCapIcon className="h-4 w-4 mr-2" />
                            University: {appointment.university}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            Date: {appointment.date}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <ClockIcon className="h-4 w-4 mr-2" />
                            Time: {appointment.time} ({appointment.duration})
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPinIcon className="h-4 w-4 mr-2" />
                            Location: {appointment.location}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-700 p-2">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-700 p-2">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAppointments.map((appointment) => {
                  const TypeIcon = getTypeIcon(appointment.type);
                  return (
                    <div
                      key={appointment.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <TypeIcon className="h-5 w-5 text-blue-500" />
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            appointment.status
                          )}`}>
                          {appointment.status}
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        {appointment.title}
                      </h4>
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <p>{appointment.student}</p>
                        <p>
                          {appointment.date} at {appointment.time}
                        </p>
                        <p>{appointment.duration}</p>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-700">
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
            )}

            {filteredAppointments.length === 0 && (
              <div className="text-center py-12">
                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  No appointments found
                </p>
                <p className="text-gray-600">
                  Try adjusting your filter criteria or schedule a new
                  appointment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentOversight;
