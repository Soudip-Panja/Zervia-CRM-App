import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import BottomMenu from "./BottomMenu";

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setIsCollapsed(true);
      } else {
        setIsMobile(false);
        setIsCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <div className="d-flex flex-grow-1">
        {!isMobile && (
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        )}
        <div
          className="flex-grow-1 p-4"
          style={{
            marginLeft: !isMobile ? (isCollapsed ? "80px" : "250px") : "0",
            transition: "margin-left 0.3s ease",
          }}
        >
          <Outlet />
        </div>
      </div>

      {isMobile && <BottomMenu />}
    </div>
  );
}
