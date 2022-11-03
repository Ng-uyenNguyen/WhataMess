import { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import DashBoard from "../pages/DashBoard/DashBoard";
import LoginPage from "../pages/LoginPage";
// @ts-ignore 
import Plotly from "../pages/TestPlotly";

function AppRoute() {
  //@ts-ignore
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {

    if (children.type === DashBoard) {
      if (!currentUser) {
        return <Navigate to="/login" />;
      }
      return children
    }
    if (children.type === LoginPage) {

      if (currentUser) {
        return <Navigate to="/" />;
      }
      return children
    }
    return children;

  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          <ProtectedRoute>
            <LoginPage />
          </ProtectedRoute>
        } />
        <Route path="/" element={
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        }>
        </Route>
        <Route path="/plotly" element={<Plotly />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
