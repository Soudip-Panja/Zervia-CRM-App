import { useState } from "react";
import { User, BadgeQuestionMark } from "lucide-react";
import Profile from "../Components/Profile";
import About from "../Components/About";
import Header from "../Components/Header";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <>
    <Header />
      <div className="container py-5" style={{marginBottom: "5rem"}}>
        <div
          className="card mx-auto shadow-lg overflow-hidden"
          style={{ borderRadius: "25px" }}
        >
          <div
            className="position-relative"
            style={{
              height: "150px",
              background: "linear-gradient(180deg, #9a4dff, #4c8efc)"
            }}
          >
            <img
              src="https://rb.gy/a2n1al"
              alt="Profile Avatar"
              className="rounded-circle border border-3 border-light shadow position-absolute start-50 translate-middle"
              width="180"
              height="180"
              style={{
                top: "100%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#fff",
              }}
            />
          </div>

          <div className="card-body text-center mt-5">
            <h3 className="mt-5">Zervia CRM Settings</h3>

            <ul className="nav nav-underline justify-content-center gap-4">
              <li className="nav-item">
                <button
                  className={`nav-link d-flex align-items-center gap-1 fw-semibold ${
                    activeTab === "profile"
                      ? "active text-primary"
                      : "text-secondary"
                  }`}
                  onClick={() => setActiveTab("profile")}
                  style={{ background: "none", border: "none" }}
                >
                  <User size={25} />
                  Profile
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link d-flex align-items-center gap-1 fw-semibold ${
                    activeTab === "about"
                      ? "active text-primary"
                      : "text-secondary"
                  }`}
                  onClick={() => setActiveTab("about")}
                  style={{ background: "none", border: "none" }}
                >
                  <BadgeQuestionMark size={25} />
                  About
                </button>
              </li>
            </ul>

            <hr />

            {activeTab === "profile" && <Profile />}
            {activeTab === "about" && <About />}
          </div>
        </div>
      </div>
    </>
  );
}
