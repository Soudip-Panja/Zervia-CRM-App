import { Link, useLocation } from "react-router-dom";
import { Home, Users, BarChart2, Settings } from "lucide-react";

export default function BottomMenu() {
  const location = useLocation();

  const navItems = [
    { path: "/leads", icon: Home, label: "Leads" },
    { path: "/salesAgent", icon: Users, label: "Agents" },
    { path: "/reports", icon: BarChart2, label: "Reports" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="bottom-menu-container">
      <div className="bottom-menu-gradient-bar"></div>
      <div className="bottom-menu-content">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`bottom-menu-item ${isActive ? "active" : ""}`}
            >
              <div className={`bottom-menu-icon-wrapper ${isActive ? "active-icon" : ""}`}>
                <Icon size={24} className="bottom-menu-icon" />
                {isActive && <div className="bottom-menu-active-dot"></div>}
              </div>
              <span className="bottom-menu-label">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="bottom-menu-footer">
        <p className="bottom-menu-footer-text">© 2025 Zervia CRM. All rights reserved.</p>
      </div>
    </div>
  );
}