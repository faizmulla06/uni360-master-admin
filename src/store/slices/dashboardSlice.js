import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stats: {
    totalStudents: 0,
    totalApplications: 0,
    totalUniversities: 0,
    totalRevenue: 0,
  },
  conversionFunnel: {
    leads: 0,
    applications: 0,
    offers: 0,
    admissions: 0,
  },
  revenueData: [],
  agentPerformance: [],
  notifications: [],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchDashboardStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDashboardSuccess: (state, action) => {
      state.loading = false;
      state.stats = action.payload.stats;
      state.conversionFunnel = action.payload.conversionFunnel;
      state.revenueData = action.payload.revenueData;
      state.agentPerformance = action.payload.agentPerformance;
      state.notifications = action.payload.notifications;
    },
    fetchDashboardFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },
    updateCountryData: (state, action) => {
      // Update data based on selected country
      const { country: _country, data } = action.payload;
      state.stats = data.stats;
      state.conversionFunnel = data.conversionFunnel;
      state.revenueData = data.revenueData;
      state.agentPerformance = data.agentPerformance;
    },
  },
});

export const {
  fetchDashboardStart,
  fetchDashboardSuccess,
  fetchDashboardFailure,
  updateStats,
  updateCountryData,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
