import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import uiSlice from "./slices/uiSlice";
import dashboardSlice from "./slices/dashboardSlice";
import usersSlice from "./slices/usersSlice";
import universitiesSlice from "./slices/universitiesSlice";
import applicationsSlice from "./slices/applicationsSlice";
import commissionsSlice from "./slices/commissionsSlice";
import paymentsSlice from "./slices/paymentsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    dashboard: dashboardSlice,
    users: usersSlice,
    universities: universitiesSlice,
    applications: applicationsSlice,
    commissions: commissionsSlice,
    payments: paymentsSlice,
  },
});
