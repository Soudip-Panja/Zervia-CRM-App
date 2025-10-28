import {
  UserStar,
  UserPen,
  Mail,
  Phone,
  Settings,
  BellRing,
  LogOut,
} from "lucide-react";

export default function Profile() {
  return (
    <>
      <div className="mx-3">
        <div className="text-start">
          <div
            className="alert  mt-4  rounded-4 hover-card"
            role="alert"
            style={{
              backgroundColor: "#EBF1F9",
              border: "none",
              color: "black",
            }}
          >
            <UserPen />
            <p className="mb-0 mt-1  fw-semibold">Full Name</p>
            <p className="mb-0">Soudip Panja</p>
          </div>

          <div
            className="alert mt-4  rounded-4 hover-card"
            role="alert"
            style={{
              backgroundColor: "#EBF1F9",
              border: "none",
              color: "black",
            }}
          >
            <Mail />
            <p className="mb-0 mt-1  fw-semibold">Email</p>
            <p className="mb-0">soudip03panja@gmail.com</p>
          </div>

          <div
            className="alert mt-4   rounded-4 hover-card"
            role="alert"
            style={{
              backgroundColor: "#EBF1F9",
              border: "none",
              color: "black",
            }}
          >
            <Phone />
            <p className="mb-0 mt-1  fw-semibold">Phone</p>
            <p className="mb-0">+91 8420903019</p>
          </div>
          <br />
          <br />

          <div className="row">
            <div className="col-6">
              <div
                className="alert shadow p-3 mb-3  rounded-4 hover-card"
                role="alert"
                style={{
                  backgroundColor: "#FEFCE8",
                  border: "none",
                  color: "black",
                }}
              >
                <UserStar color="#FF8C00" />
                <p className="mb-0 mt-1  fw-semibold">Role</p>
                <p className="mb-0">Administrator</p>
              </div>
            </div>
            <div className="col-6">
              <div
                className="alert shadow p-3 mb-3  rounded-4 hover-card"
                role="alert"
                style={{
                  backgroundColor: "#E8F5E9",
                  border: "none",
                  color: "black",
                }}
              >
                <div
                  class="spinner-grow text-success"
                  role="status"
                  style={{ width: "20px", height: "20px" }}
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                <p className="mb-0 mt-1  fw-semibold">Status</p>
                <p className="mb-0">Active</p>
              </div>
            </div>
            <div className="col-6">
              <div
                className="alert shadow p-3 mb-3  rounded-4 hover-card"
                role="alert"
                style={{
                  backgroundColor: "#E3F2FD",
                  border: "none",
                  color: "black",
                }}
              >
                <Settings color="blue" />
                <p className="mb-0 mt-1  fw-semibold">Account Settings</p>
                <p className="mb-0">Manage Preference</p>
              </div>
            </div>
            <div className="col-6">
              <div
                className="alert shadow p-3 mb-3  rounded-4 hover-card"
                role="alert"
                style={{
                  backgroundColor: "#EDE9FE",
                  border: "none",
                  color: "black",
                }}
              >
                <BellRing color="purple" />
                <p className="mb-0 mt-1  fw-semibold">Account Settings</p>
                <p className="mb-0">Manage Preference</p>
              </div>
            </div>
          </div>

          <div
            className="alert shadow p-3 mb-3 d-flex flex-column align-items-center text-center rounded-4 hover-card"
            role="alert"
            style={{
              backgroundColor: "#FFE4E6",
              border: "none",
              color: "black",
            }}
          >
            <div className="d-flex align-items-center justify-content-center mb-1">
              <LogOut color="red" />
              <p className="mb-0 ms-2 fw-semibold">Sign Out</p>
            </div>
            <p className="mb-0">Leave Dashboard</p>
          </div>
        </div>
      </div>
    </>
  );
}
