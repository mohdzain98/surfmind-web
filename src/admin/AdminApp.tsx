import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import AdminAuthProvider from "./AdminAuthProvider";
import { useAdminAuth } from "./adminAuth";
import AdminLayout from "./AdminLayout";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogs from "./pages/AdminLogs";
import AdminLlmUsage from "./pages/AdminLlmUsage";
import AdminSearchMetrics from "./pages/AdminSearchMetrics";
import AdminAccounts from "./pages/AdminAccounts";
import AdminAccountsList from "./pages/AdminAccountsList";

function RequireAdmin() {
  const { authenticated } = useAdminAuth();
  const location = useLocation();

  return authenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to="/admin/login"
      replace
      state={{ from: `${location.pathname}${location.search}` }}
    />
  );
}

export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route element={<RequireAdmin />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="logs" element={<AdminLogs />} />
            <Route path="llm-usage" element={<AdminLlmUsage />} />
            <Route path="search-metrics" element={<AdminSearchMetrics />} />
            <Route path="accounts" element={<AdminAccountsList />} />
            <Route path="accounts/:accountId" element={<AdminAccounts />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminAuthProvider>
  );
}
