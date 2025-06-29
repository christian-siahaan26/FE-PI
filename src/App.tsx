import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/admin/dashboard/Dashboard";
import DashboardLayout from "./layout/dashboardLayout";
import SignUpPage from "./pages/auth/signup";
import SignInPage from "./pages/auth/signin";
import { R_TOKEN } from "./utils/constants";
import { AuthProvider } from "./context/auth-context";
import AddComplaintPage from "./pages/admin/dashboardCreateComplaint/AddComplaintPage";
// import ProfilePage from "./pages/admin/dashboardProfile/Profile";
import { Toaster } from "./components/ui/sonner";
import Home from "./pages/client/Home";

function App() {
  const LoginRoute = ({ children }: { children: React.ReactNode }) => {
    if (localStorage.getItem(R_TOKEN) == undefined) {
      return children;
    } else if (localStorage.getItem(R_TOKEN) !== undefined) {
      return <Navigate to={"/dashboard"} />;
    }
  };

  const DashboardRoute = ({ children }: { children: React.ReactNode }) => {
    if (localStorage.getItem(R_TOKEN) !== null) {
      return children;
    } else if (localStorage.getItem(R_TOKEN) == null) {
      return <Navigate to={"/auth/signin"} />;
    }
  };
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/auth/signup"
            element={
              <LoginRoute>
                <SignUpPage />
              </LoginRoute>
            }
          />
          <Route
            path="/auth/signin"
            element={
              <LoginRoute>
                <SignInPage />
              </LoginRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <DashboardRoute>
                <DashboardLayout>
                  <DashboardPage />
                  <Toaster />
                </DashboardLayout>
              </DashboardRoute>
            }
          />
          <Route
            path="/dashboard/create"
            element={
              <DashboardRoute>
                <DashboardLayout>
                  <AddComplaintPage />
                  <Toaster />
                </DashboardLayout>
              </DashboardRoute>
            }
          />
          {/* <Route
            path="/dashboard/profile"
            element={
              <DashboardRoute>
                <DashboardLayout>
                  <ProfilePage />
                  <Toaster />
                </DashboardLayout>
              </DashboardRoute>
            }
          /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
