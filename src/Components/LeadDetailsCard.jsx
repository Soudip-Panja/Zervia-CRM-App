import useFetch from "../useFetch";
import { useParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function LeadDetailsCard() {
  const { leadId } = useParams();
  const { data, loading, error } = useFetch(
    `https://zervia-crm-apis.vercel.app/leads/${leadId}`
  );

  return (
    <>
      <div className="card shadow equal-card">
        <div
          className="card-header  text-white"
          style={{ backgroundColor: "#8514fdff" }}
        >
          <h5 className="mb-0">Lead Details</h5>
        </div>
        <div className="card-body position-relative p-4">
          {loading && (
            <div
              className="d-flex flex-column justify-content-center align-items-center text-center"
              style={{ minHeight: "100%" }}
            >
              <div
                className="spinner-border mb-3"
                role="status"
                style={{ width: "3rem", height: "3rem", color: "#8514fdff" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>

              <div
                className="alert text-center py-2 px-3"
                role="alert"
                style={{
                  maxWidth: "300px",
                  backgroundColor: "#f3e6ff",
                  color: "#8514fdff",
                  border: "1px solid #d9b3ff",
                }}
              >
                <span className="small fw-medium">
                  Loading Lead Details.....
                </span>
              </div>
            </div>
          )}

          {error && (
            <div
              className="d-flex flex-column justify-content-center align-items-center text-center"
              style={{ minHeight: "100%" }}
            >
              <AlertCircle className="text-danger mb-3" size={48} />
              <div
                className="alert alert-danger text-center py-2 px-3"
                role="alert"
                style={{ maxWidth: "300px" }}
              >
                <span className="small fw-medium">
                  Error Loading Details...
                </span>
              </div>
            </div>
          )}

          {data && (
            <div className="position-absolute top-0 end-0 m-3">
              <span
                className={`badge fs-6 px-3 py-2 ${
                  data.priority === "High"
                    ? "text-bg-danger"
                    : data.priority === "Medium"
                    ? "text-bg-primary"
                    : "text-bg-success"
                }`}
              >
                {data.priority?.toUpperCase() || "N/A"}
              </span>
            </div>
          )}

          {!loading && !error && data && (
            <div className="row">
              <label className="form-label fw-bold text-muted">Lead ID</label>
              <p className="fs-5">{data._id || "N/A"}</p>

              <label className="form-label fw-bold text-muted">Lead Name</label>
              <p className="fs-5">{data.name || "N/A"}</p>

              <label className="form-label fw-bold text-muted">
                Sales Agent
              </label>
              <p className="fs-5">{data.salesAgent?.name || "N/A"}</p>

              <label className="form-label fw-bold text-muted">
                Lead Source
              </label>
              <p className="fs-5">{data.source || "N/A"}</p>

              <label className="form-label fw-bold text-muted">
                Lead Status
              </label>
              <p className="fs-5">{data.status || "N/A"}</p>

              <label className="form-label fw-bold text-muted">Tags</label>
              <p className="fs-5">{data.tags.join(", ") || "N/A"}</p>

              <label className="form-label fw-bold text-muted">
                Time to Close the Lead
              </label>
              <p className="fs-5">
                {data.timeToClose ? `${data.timeToClose} Days` : "N/A"}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
