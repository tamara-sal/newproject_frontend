// src/components/Layout.tsx
import React, { type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Hide navbar/sidebar on login/signup
  const hideNav = ["/login", "/signup"].includes(location.pathname);

  return (
    <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      
      {!hideNav && <Sidebar open={sidebarOpen} onClose={toggleSidebar} />}
      <div style={{ flexGrow: 1, paddingTop: !hideNav ? 64 : 0 }}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
