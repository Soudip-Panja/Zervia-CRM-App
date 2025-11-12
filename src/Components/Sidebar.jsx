import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const location = useLocation();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const navItems = [
    { path: "/leads", icon: Home, label: "Leads" },
    { path: "/salesAgent", icon: Users, label: "Sales Agents" },
    { path: "/reports", icon: BarChart2, label: "Reports" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div
      className={`sidebar-container ${isCollapsed ? "collapsed" : ""}`}
      style={{
        width: isCollapsed ? "80px" : "280px",
      }}
    >
      <div className="sidebar-header">
        {!isCollapsed && (
          <div className="sidebar-brand">
            <h4 className="sidebar-logo">
              <span className="logo-gradient">Zervia CRM</span>
            </h4>
            <p className="sidebar-subtitle">Sales Management</p>
          </div>
        )}
        <button
          className="sidebar-toggle-btn"
          onClick={toggleSidebar}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <ul className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <li key={item.path} className="sidebar-nav-item">
              <Link
                to={item.path}
                className={`sidebar-link ${isActive ? "active" : ""}`}
                title={isCollapsed ? item.label : ""}
              >
                <div className="sidebar-link-content">
                  <Icon className="sidebar-icon" size={22} />
                  {!isCollapsed && (
                    <span className="sidebar-label">{item.label}</span>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="sidebar-footer-copyright">
        {!isCollapsed ? (
          <p className="sidebar-copyright-text">
            © 2025 Zervia CRM.
            <br />
            All rights reserved.
          </p>
        ) : (
          <p className="sidebar-copyright-text-collapsed">©</p>
        )}
      </div>
    </div>
  );
}
