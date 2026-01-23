import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Toaster position="top-right" reverseOrder={false} />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
