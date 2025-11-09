import useFetch from "../useFetch";
import { useParams, Link } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function LeadDetails() {
  const { leadId } = useParams();
  const { data, loading, error } = useFetch(
    `https://zervia-crm-apis.vercel.app/leads/${leadId}`
  );

  console.log(data);
  return (
    <>
      <div className="container mt-5">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1>Lead Details</h1>
              <Link to="/leads" className="btn btn-primary">
                <ArrowLeft size={16} className="me-1" />
                Back to List
              </Link>
            </div>
            <hr />
            <div>
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

              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body position-relative">
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
                          <label className="form-label fw-bold text-muted">
                            Lead ID
                          </label>
                          <p className="fs-5">{data._id || "N/A"}</p>

                          <label className="form-label fw-bold text-muted">
                            Lead Name
                          </label>
                          <p className="fs-5">{data.name || "N/A"}</p>

                          <label className="form-label fw-bold text-muted">
                            Sales Agent
                          </label>
                          <p className="fs-5">
                            {data.salesAgent?.name || "N/A"}
                          </p>

                          <label className="form-label fw-bold text-muted">
                            Lead Source
                          </label>
                          <p className="fs-5">{data.source || "N/A"}</p>

                          <label className="form-label fw-bold text-muted">
                            Lead Status
                          </label>
                          <p className="fs-5">{data.status || "N/A"}</p>

                          <label className="form-label fw-bold text-muted">
                            Tags
                          </label>
                          <p className="fs-5">
                            {data.tags.join(", ") || "N/A"}
                          </p>

                          <label className="form-label fw-bold text-muted">
                            Time to Close the Lead
                          </label>
                          <p className="fs-5">
                            {data.timeToClose
                              ? `${data.timeToClose} Days`
                              : "N/A"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
