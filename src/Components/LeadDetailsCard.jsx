import useFetch from "../useFetch";
import { useParams, Link } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function LeadDetailsCard() {
  const { leadId } = useParams();
  const { data, loading, error } = useFetch(
    `https://zervia-crm-apis.vercel.app/leads/${leadId}`
  );

  return (
    <>
      <div>
        <div className="card">
          <div className="card-body position-relative">
            {loading && (
              <div className="text-center">
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2 text-danger">Loading Lead Details...</p>
              </div>
            )}
            {error && (
              <div className="text-center">
                <div className="text-danger">
                  <AlertCircle />
                </div>
                <p className="mt-2 text-danger">
                  Error Loading Lead Details...
                </p>
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

                <label className="form-label fw-bold text-muted">
                  Lead Name
                </label>
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
      </div>
    </>
  );
}
