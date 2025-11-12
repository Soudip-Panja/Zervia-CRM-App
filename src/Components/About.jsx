import { CircleAlert } from "lucide-react";

export default function About() {
  return (
    <div className="container hover-card py-4">
      <div
        className="card border-0 shadow rounded-4"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="card-body p-5 text-white">
          <div className="d-flex justify-content-center align-items-center mb-4 flex-wrap text-center">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle me-3"
              style={{
                width: "3.2rem",
                aspectRatio: "1 / 1",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
              }}
            >
              <CircleAlert size={26} strokeWidth={2} />
            </div>

            <h2 className="mb-0 fw-bold">About Zervia CRM App</h2>
          </div>

          <p className="mb-4" style={{ lineHeight: "1.6" }}>
            Zervia CRM is a comprehensive customer relationship management
            platform designed to streamline your business operations. Our
            powerful solution helps you manage customer interactions, track
            sales pipelines, automate workflows, and gain valuable insights
            through advanced analytics.
          </p>

          <div
            className="mb-3 p-3 rounded-3 hover-card"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
          >
            <h5 className="fw-bold mb-2">Customer Management</h5>
            <p className="mb-0 opacity-75">
              Organize and track all customer data
            </p>
          </div>

          <div
            className="mb-3 p-3 rounded-3 hover-card"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
          >
            <h5 className="fw-bold mb-2">Sales Pipeline</h5>
            <p className="mb-0 opacity-75">Visualize and optimize your sales</p>
          </div>

          <div
            className="mb-4 p-3 rounded-3 hover-card"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
          >
            <h5 className="fw-bold mb-2">Analytics & Reports</h5>
            <p className="mb-0 opacity-75">Make data-driven decisions</p>
          </div>

          <div className="d-flex gap-3 flex-wrap justify-content-center justify-content-md-start">
            <button className="btn btn-light rounded-3 px-4 py-2 fw-semibold">
              Learn More
            </button>
            <button
              className="btn rounded-3 px-4 py-2 fw-semibold"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                border: "none",
              }}
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
