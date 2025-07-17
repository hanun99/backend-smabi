import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import Alumni from "./pages/Alumni";
import Berita from "./pages/Berita";
import Testimoni from "./pages/Testimoni";
import Sebaran from "./pages/Sebaran";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import LoginPage from "./auth/LoginPage"; // ⬅️ Tambahkan ini

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Route Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route dalam Layout, semua diproteksi */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/alumni" element={<Alumni />} />
                  <Route path="/berita" element={<Berita />} />
                  <Route path="/testimoni" element={<Testimoni />} />
                  <Route path="/sebaran" element={<Sebaran />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/setting" element={<Setting />} />
                  <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                  />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
