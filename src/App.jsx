import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import UserManagement from "./pages/users/UserManagement";
import UniversityManagement from "./pages/universities/UniversityManagement";
import ApplicationOversight from "./pages/applications/ApplicationOversight";
import CommissionTracker from "./pages/commissions/CommissionTracker";
import PaymentManagement from "./pages/payments/PaymentManagement";
import ReportsAnalytics from "./pages/reports/ReportsAnalytics";
import DocumentManagement from "./pages/documents/DocumentManagement";
import AppointmentOversight from "./pages/appointments/AppointmentOversight";
import AccountSettings from "./pages/settings/AccountSettings";
import AITools from "./pages/ai/AITools";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            {/* Authentication Routes */}
            <Route
              path="/login"
              element={
                <AuthLayout>
                  <Login />
                </AuthLayout>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="universities" element={<UniversityManagement />} />
              <Route path="applications" element={<ApplicationOversight />} />
              <Route path="commissions" element={<CommissionTracker />} />
              <Route path="payments" element={<PaymentManagement />} />
              <Route path="reports" element={<ReportsAnalytics />} />
              <Route path="documents" element={<DocumentManagement />} />
              <Route path="appointments" element={<AppointmentOversight />} />
              <Route path="settings" element={<AccountSettings />} />
              <Route path="ai-tools" element={<AITools />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
