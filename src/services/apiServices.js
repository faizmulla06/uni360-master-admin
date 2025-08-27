import axios from "axios";
import {
  MOCK_USERS,
  MOCK_UNIVERSITIES,
  MOCK_APPLICATIONS,
  MOCK_COMMISSIONS,
  MOCK_PAYMENTS,
  MOCK_DOCUMENTS,
  MOCK_APPOINTMENTS,
  MOCK_NOTIFICATIONS,
  MOCK_REPORTS,
  MOCK_AI_TOOLS,
} from "../utils/mockData.js";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "http://localhost:3001/api", // Replace with your actual API URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Helper function to simulate API delay
const delay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));

// Auth API calls
export const authAPI = {
  login: async (email, password) => {
    await delay(1000);

    // Mock successful login for demo purposes
    if (email === "admin@uni360.com" && password === "admin123") {
      const mockUser = {
        id: 1,
        name: "Master Admin",
        email: "admin@uni360.com",
        role: "master_admin",
        uuid: "MADM-2024-001",
        avatar:
          "https://ui-avatars.com/api/?name=Master+Admin&background=e08d3c&color=fff",
      };

      const mockToken = "mock-jwt-token-" + Date.now();
      localStorage.setItem("token", mockToken);

      return { data: { user: mockUser, token: mockToken } };
    } else {
      throw new Error("Invalid credentials");
    }
  },

  googleLogin: async () => {
    await delay(1000);

    const mockUser = {
      id: 1,
      name: "Master Admin",
      email: "admin@uni360.com",
      role: "master_admin",
      uuid: "MADM-2024-001",
      avatar:
        "https://ui-avatars.com/api/?name=Master+Admin&background=e08d3c&color=fff",
    };

    const mockToken = "mock-jwt-token-google-" + Date.now();
    localStorage.setItem("token", mockToken);

    return { data: { user: mockUser, token: mockToken } };
  },

  logout: async () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },

  refreshToken: async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    await delay(500);

    const newToken = "mock-jwt-token-refresh-" + Date.now();
    localStorage.setItem("token", newToken);

    return { data: { token: newToken } };
  },
};

// Dashboard API calls
export const dashboardAPI = {
  getStats: async (country = "UK") => {
    await delay(1000);

    const ukData = {
      stats: {
        totalStudents: 1247,
        totalApplications: 892,
        totalUniversities: 45,
        totalRevenue: 125000,
      },
      conversionFunnel: {
        leads: 2340,
        applications: 892,
        offers: 634,
        admissions: 445,
      },
      revenueData: [
        { month: "Jan", revenue: 15000 },
        { month: "Feb", revenue: 18000 },
        { month: "Mar", revenue: 22000 },
        { month: "Apr", revenue: 19000 },
        { month: "May", revenue: 25000 },
        { month: "Jun", revenue: 26000 },
      ],
      agentPerformance: [
        {
          name: "John Smith",
          applications: 45,
          conversions: 32,
          revenue: 12000,
        },
        {
          name: "Sarah Wilson",
          applications: 38,
          conversions: 28,
          revenue: 10500,
        },
        {
          name: "Mike Johnson",
          applications: 42,
          conversions: 30,
          revenue: 11200,
        },
      ],
      notifications: MOCK_NOTIFICATIONS,
    };

    const germanyData = {
      stats: {
        totalStudents: 987,
        totalApplications: 654,
        totalUniversities: 38,
        totalRevenue: 98000,
      },
      conversionFunnel: {
        leads: 1890,
        applications: 654,
        offers: 478,
        admissions: 332,
      },
      revenueData: [
        { month: "Jan", revenue: 12000 },
        { month: "Feb", revenue: 14000 },
        { month: "Mar", revenue: 16000 },
        { month: "Apr", revenue: 15000 },
        { month: "May", revenue: 18000 },
        { month: "Jun", revenue: 19000 },
      ],
      agentPerformance: [
        {
          name: "Hans Mueller",
          applications: 35,
          conversions: 25,
          revenue: 9500,
        },
        {
          name: "Anna Schmidt",
          applications: 28,
          conversions: 20,
          revenue: 7800,
        },
        {
          name: "Klaus Weber",
          applications: 32,
          conversions: 24,
          revenue: 8900,
        },
      ],
      notifications: MOCK_NOTIFICATIONS,
    };

    return { data: country === "Germany" ? germanyData : ukData };
  },
};

// Users API calls
export const usersAPI = {
  getUsers: async (filters = {}) => {
    await delay(800);

    let filteredUsers = [...MOCK_USERS];

    if (filters.role) {
      filteredUsers = filteredUsers.filter(
        (user) => user.role === filters.role
      );
    }

    if (filters.status) {
      filteredUsers = filteredUsers.filter(
        (user) => user.status === filters.status
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.uuid.toLowerCase().includes(searchTerm)
      );
    }

    return {
      data: {
        users: filteredUsers,
        total: filteredUsers.length,
        currentPage: filters.page || 1,
        totalPages: Math.ceil(filteredUsers.length / (filters.limit || 10)),
      },
    };
  },

  getUser: async (id) => {
    await delay(500);
    const user = MOCK_USERS.find((u) => u.id === parseInt(id));
    if (!user) throw new Error("User not found");
    return { data: user };
  },

  createUser: async (userData) => {
    await delay(1000);
    const newUser = {
      id: MOCK_USERS.length + 1,
      ...userData,
      uuid: `${userData.role.toUpperCase().slice(0, 3)}-2024-${String(
        MOCK_USERS.length + 1
      ).padStart(3, "0")}`,
      createdAt: new Date().toISOString().split("T")[0],
      lastLogin: null,
      avatar: `https://ui-avatars.com/api/?name=${userData.name.replace(
        " ",
        "+"
      )}&background=3b82f6&color=fff`,
    };

    MOCK_USERS.push(newUser);
    return { data: newUser };
  },

  updateUser: async (id, userData) => {
    await delay(800);
    const userIndex = MOCK_USERS.findIndex((u) => u.id === parseInt(id));
    if (userIndex === -1) throw new Error("User not found");

    MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...userData };
    return { data: MOCK_USERS[userIndex] };
  },

  deleteUser: async (id) => {
    await delay(600);
    const userIndex = MOCK_USERS.findIndex((u) => u.id === parseInt(id));
    if (userIndex === -1) throw new Error("User not found");

    MOCK_USERS.splice(userIndex, 1);
    return { data: { success: true } };
  },
};

// Universities API calls
export const universitiesAPI = {
  getUniversities: async (filters = {}) => {
    await delay(800);

    let filteredUniversities = [...MOCK_UNIVERSITIES];

    if (filters.country) {
      filteredUniversities = filteredUniversities.filter(
        (uni) => uni.country === filters.country
      );
    }

    if (filters.status) {
      filteredUniversities = filteredUniversities.filter(
        (uni) => uni.status === filters.status
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredUniversities = filteredUniversities.filter(
        (uni) =>
          uni.name.toLowerCase().includes(searchTerm) ||
          uni.location.toLowerCase().includes(searchTerm)
      );
    }

    return {
      data: {
        universities: filteredUniversities,
        total: filteredUniversities.length,
        currentPage: filters.page || 1,
        totalPages: Math.ceil(
          filteredUniversities.length / (filters.limit || 10)
        ),
      },
    };
  },

  getUniversity: async (id) => {
    await delay(500);
    const university = MOCK_UNIVERSITIES.find((u) => u.id === parseInt(id));
    if (!university) throw new Error("University not found");
    return { data: university };
  },

  createUniversity: async (universityData) => {
    await delay(1000);
    const newUniversity = {
      id: MOCK_UNIVERSITIES.length + 1,
      ...universityData,
      logo: `https://ui-avatars.com/api/?name=${universityData.name.replace(
        /\s+/g,
        "+"
      )}&background=10b981&color=fff`,
    };

    MOCK_UNIVERSITIES.push(newUniversity);
    return { data: newUniversity };
  },

  updateUniversity: async (id, universityData) => {
    await delay(800);
    const uniIndex = MOCK_UNIVERSITIES.findIndex((u) => u.id === parseInt(id));
    if (uniIndex === -1) throw new Error("University not found");

    MOCK_UNIVERSITIES[uniIndex] = {
      ...MOCK_UNIVERSITIES[uniIndex],
      ...universityData,
    };
    return { data: MOCK_UNIVERSITIES[uniIndex] };
  },

  deleteUniversity: async (id) => {
    await delay(600);
    const uniIndex = MOCK_UNIVERSITIES.findIndex((u) => u.id === parseInt(id));
    if (uniIndex === -1) throw new Error("University not found");

    MOCK_UNIVERSITIES.splice(uniIndex, 1);
    return { data: { success: true } };
  },
};

// Applications API calls
export const applicationsAPI = {
  getApplications: async (filters = {}) => {
    await delay(800);

    let filteredApplications = [...MOCK_APPLICATIONS];

    if (filters.status) {
      filteredApplications = filteredApplications.filter(
        (app) => app.status === filters.status
      );
    }

    if (filters.university) {
      filteredApplications = filteredApplications.filter(
        (app) => app.universityName === filters.university
      );
    }

    if (filters.agent) {
      filteredApplications = filteredApplications.filter(
        (app) => app.agentName === filters.agent
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredApplications = filteredApplications.filter(
        (app) =>
          app.studentName.toLowerCase().includes(searchTerm) ||
          app.applicationId.toLowerCase().includes(searchTerm) ||
          app.program.toLowerCase().includes(searchTerm)
      );
    }

    return {
      data: {
        applications: filteredApplications,
        total: filteredApplications.length,
        currentPage: filters.page || 1,
        totalPages: Math.ceil(
          filteredApplications.length / (filters.limit || 10)
        ),
      },
    };
  },

  getApplication: async (id) => {
    await delay(500);
    const application = MOCK_APPLICATIONS.find((a) => a.id === parseInt(id));
    if (!application) throw new Error("Application not found");
    return { data: application };
  },

  createApplication: async (applicationData) => {
    await delay(1000);
    const newApplication = {
      id: MOCK_APPLICATIONS.length + 1,
      applicationId: `APP-2024-${String(MOCK_APPLICATIONS.length + 1).padStart(
        3,
        "0"
      )}`,
      ...applicationData,
      submittedDate: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      status: "submitted",
      timeline: [
        {
          date: new Date().toISOString().split("T")[0],
          status: "submitted",
          note: "Application submitted successfully",
        },
      ],
    };

    MOCK_APPLICATIONS.push(newApplication);
    return { data: newApplication };
  },

  updateApplication: async (id, applicationData) => {
    await delay(800);
    const appIndex = MOCK_APPLICATIONS.findIndex((a) => a.id === parseInt(id));
    if (appIndex === -1) throw new Error("Application not found");

    MOCK_APPLICATIONS[appIndex] = {
      ...MOCK_APPLICATIONS[appIndex],
      ...applicationData,
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    return { data: MOCK_APPLICATIONS[appIndex] };
  },

  updateApplicationStatus: async (id, status, note) => {
    await delay(600);
    const appIndex = MOCK_APPLICATIONS.findIndex((a) => a.id === parseInt(id));
    if (appIndex === -1) throw new Error("Application not found");

    MOCK_APPLICATIONS[appIndex].status = status;
    MOCK_APPLICATIONS[appIndex].lastUpdated = new Date()
      .toISOString()
      .split("T")[0];
    MOCK_APPLICATIONS[appIndex].timeline.push({
      date: new Date().toISOString().split("T")[0],
      status,
      note: note || `Status updated to ${status}`,
    });

    return { data: MOCK_APPLICATIONS[appIndex] };
  },
};

// Commissions API calls
export const commissionsAPI = {
  getCommissions: async (filters = {}) => {
    await delay(800);

    let filteredCommissions = [...MOCK_COMMISSIONS];

    if (filters.status) {
      filteredCommissions = filteredCommissions.filter(
        (comm) => comm.status === filters.status
      );
    }

    if (filters.agent) {
      filteredCommissions = filteredCommissions.filter(
        (comm) => comm.agentName === filters.agent
      );
    }

    if (filters.university) {
      filteredCommissions = filteredCommissions.filter(
        (comm) => comm.universityName === filters.university
      );
    }

    return {
      data: {
        commissions: filteredCommissions,
        total: filteredCommissions.length,
        totalAmount: filteredCommissions.reduce(
          (sum, comm) => sum + comm.amount,
          0
        ),
      },
    };
  },

  getCommission: async (id) => {
    await delay(500);
    const commission = MOCK_COMMISSIONS.find((c) => c.id === parseInt(id));
    if (!commission) throw new Error("Commission not found");
    return { data: commission };
  },

  updateCommissionStatus: async (id, status) => {
    await delay(600);
    const commIndex = MOCK_COMMISSIONS.findIndex((c) => c.id === parseInt(id));
    if (commIndex === -1) throw new Error("Commission not found");

    MOCK_COMMISSIONS[commIndex].status = status;
    if (status === "paid") {
      MOCK_COMMISSIONS[commIndex].paidDate = new Date()
        .toISOString()
        .split("T")[0];
    }

    return { data: MOCK_COMMISSIONS[commIndex] };
  },
};

// Payments API calls
export const paymentsAPI = {
  getPayments: async (filters = {}) => {
    await delay(800);

    let filteredPayments = [...MOCK_PAYMENTS];

    if (filters.status) {
      filteredPayments = filteredPayments.filter(
        (pay) => pay.status === filters.status
      );
    }

    if (filters.type) {
      filteredPayments = filteredPayments.filter(
        (pay) => pay.type === filters.type
      );
    }

    if (filters.student) {
      filteredPayments = filteredPayments.filter(
        (pay) => pay.studentName === filters.student
      );
    }

    return {
      data: {
        payments: filteredPayments,
        total: filteredPayments.length,
        totalAmount: filteredPayments
          .filter((pay) => pay.status === "completed")
          .reduce((sum, pay) => sum + pay.amount, 0),
      },
    };
  },

  getPayment: async (id) => {
    await delay(500);
    const payment = MOCK_PAYMENTS.find((p) => p.id === parseInt(id));
    if (!payment) throw new Error("Payment not found");
    return { data: payment };
  },

  processRefund: async (id, amount, reason) => {
    await delay(1000);
    const payment = MOCK_PAYMENTS.find((p) => p.id === parseInt(id));
    if (!payment) throw new Error("Payment not found");

    const refund = {
      id: MOCK_PAYMENTS.length + 1,
      transactionId: `REF-${payment.transactionId}`,
      studentName: payment.studentName,
      studentId: payment.studentId,
      amount: -amount,
      currency: payment.currency,
      type: "refund",
      status: "completed",
      description: `Refund for ${payment.description}`,
      createdDate: new Date().toISOString().split("T")[0],
      completedDate: new Date().toISOString().split("T")[0],
      paymentMethod: payment.paymentMethod,
      reference: `REF-${payment.reference}`,
      refundReason: reason,
    };

    MOCK_PAYMENTS.push(refund);
    return { data: refund };
  },
};

// Documents API calls
export const documentsAPI = {
  getDocuments: async (filters = {}) => {
    await delay(800);

    let filteredDocuments = [...MOCK_DOCUMENTS];

    if (filters.status) {
      filteredDocuments = filteredDocuments.filter(
        (doc) => doc.status === filters.status
      );
    }

    if (filters.type) {
      filteredDocuments = filteredDocuments.filter(
        (doc) => doc.type === filters.type
      );
    }

    if (filters.student) {
      filteredDocuments = filteredDocuments.filter(
        (doc) => doc.studentName === filters.student
      );
    }

    return {
      data: {
        documents: filteredDocuments,
        total: filteredDocuments.length,
      },
    };
  },

  getDocument: async (id) => {
    await delay(500);
    const document = MOCK_DOCUMENTS.find((d) => d.id === parseInt(id));
    if (!document) throw new Error("Document not found");
    return { data: document };
  },

  updateDocumentStatus: async (id, status, reason = null) => {
    await delay(600);
    const docIndex = MOCK_DOCUMENTS.findIndex((d) => d.id === parseInt(id));
    if (docIndex === -1) throw new Error("Document not found");

    MOCK_DOCUMENTS[docIndex].status = status;
    if (status === "approved") {
      MOCK_DOCUMENTS[docIndex].verifiedBy = "Manual Review";
      MOCK_DOCUMENTS[docIndex].verificationDate = new Date()
        .toISOString()
        .split("T")[0];
    } else if (status === "rejected") {
      MOCK_DOCUMENTS[docIndex].rejectionReason = reason;
    }

    return { data: MOCK_DOCUMENTS[docIndex] };
  },
};

// Appointments API calls
export const appointmentsAPI = {
  getAppointments: async (filters = {}) => {
    await delay(800);

    let filteredAppointments = [...MOCK_APPOINTMENTS];

    if (filters.status) {
      filteredAppointments = filteredAppointments.filter(
        (app) => app.status === filters.status
      );
    }

    if (filters.type) {
      filteredAppointments = filteredAppointments.filter(
        (app) => app.type === filters.type
      );
    }

    if (filters.student) {
      filteredAppointments = filteredAppointments.filter(
        (app) => app.studentName === filters.student
      );
    }

    return {
      data: {
        appointments: filteredAppointments,
        total: filteredAppointments.length,
      },
    };
  },

  getAppointment: async (id) => {
    await delay(500);
    const appointment = MOCK_APPOINTMENTS.find((a) => a.id === parseInt(id));
    if (!appointment) throw new Error("Appointment not found");
    return { data: appointment };
  },

  updateAppointmentStatus: async (id, status, notes = null) => {
    await delay(600);
    const appIndex = MOCK_APPOINTMENTS.findIndex((a) => a.id === parseInt(id));
    if (appIndex === -1) throw new Error("Appointment not found");

    MOCK_APPOINTMENTS[appIndex].status = status;
    if (status === "approved") {
      MOCK_APPOINTMENTS[appIndex].approvedBy = "Admin User";
      MOCK_APPOINTMENTS[appIndex].approvedDate = new Date()
        .toISOString()
        .split("T")[0];
    }
    if (notes) {
      MOCK_APPOINTMENTS[appIndex].notes = notes;
    }

    return { data: MOCK_APPOINTMENTS[appIndex] };
  },

  createAppointment: async (appointmentData) => {
    await delay(1000);
    const newAppointment = {
      id: MOCK_APPOINTMENTS.length + 1,
      ...appointmentData,
      bookedDate: new Date().toISOString().split("T")[0],
      status: "pending",
    };

    MOCK_APPOINTMENTS.push(newAppointment);
    return { data: newAppointment };
  },
};

// Reports API calls
export const reportsAPI = {
  getConversionRates: async (period = "monthly") => {
    await delay(800);
    return {
      data:
        MOCK_REPORTS.conversionRates[period] ||
        MOCK_REPORTS.conversionRates.monthly,
    };
  },

  getRevenueAnalysis: async () => {
    await delay(800);
    return { data: MOCK_REPORTS.revenueAnalysis };
  },

  getStudentDistribution: async () => {
    await delay(600);
    return { data: MOCK_REPORTS.studentDistribution };
  },

  getCustomReport: async (filters) => {
    await delay(1000);
    return {
      data: {
        summary: "Custom report generated successfully",
        data: [],
        generatedAt: new Date().toISOString(),
        filters,
      },
    };
  },
};

// AI Tools API calls
export const aiToolsAPI = {
  getSopTemplates: async () => {
    await delay(500);
    return { data: MOCK_AI_TOOLS.sopGenerator.templates };
  },

  generateSop: async (studentData, program, university) => {
    await delay(2000);
    const generatedSop = {
      id: MOCK_AI_TOOLS.sopGenerator.recentGenerations.length + 1,
      studentName: studentData.name,
      program,
      university,
      generatedDate: new Date().toISOString().split("T")[0],
      wordCount: 850 + Math.floor(Math.random() * 200),
      status: "generated",
      content: `Generated Statement of Purpose for ${studentData.name} applying to ${program} at ${university}...`,
    };

    MOCK_AI_TOOLS.sopGenerator.recentGenerations.unshift(generatedSop);
    return { data: generatedSop };
  },

  generateAps: async (studentData, program, university) => {
    await delay(2000);
    const generatedAps = {
      id: MOCK_AI_TOOLS.apsGenerator.recentGenerations.length + 1,
      studentName: studentData.name,
      program,
      university,
      generatedDate: new Date().toISOString().split("T")[0],
      status: "generated",
      content: `Generated Academic Personal Statement for ${studentData.name}...`,
    };

    MOCK_AI_TOOLS.apsGenerator.recentGenerations.unshift(generatedAps);
    return { data: generatedAps };
  },

  getChatbotLogs: async (filters = {}) => {
    await delay(600);

    let filteredLogs = [...MOCK_AI_TOOLS.chatbotLogs];

    if (filters.category) {
      filteredLogs = filteredLogs.filter(
        (log) => log.category === filters.category
      );
    }

    if (filters.resolved !== undefined) {
      filteredLogs = filteredLogs.filter(
        (log) => log.resolved === filters.resolved
      );
    }

    return {
      data: {
        logs: filteredLogs,
        total: filteredLogs.length,
      },
    };
  },
};
