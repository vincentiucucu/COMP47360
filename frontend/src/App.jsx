import React from "react";
import {
  BrowserRouter,
  Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/home";
import LogIn from "./pages/login";
import SignIn from "./pages/signIn";
import Services from "./pages/services";
import Planning from "./pages/planning";
import NotFound from "./pages/notFound";

function logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndlogout() {
  localStorage.clear();
  return <SignIn />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/services" element={<Services />} />
        <Route path="/planning" element={<Planning />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
