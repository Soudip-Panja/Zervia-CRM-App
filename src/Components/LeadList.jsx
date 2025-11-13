import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { AlertCircle, Eye, Edit, Trash2 } from "lucide-react";
import useFetch from "../useFetch";
import AddLeadAndFilter from "./AddLeadAndFilter";

export default function LeadList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || ""
  );
  const [agentFilter, setAgentFilter] = useState(
    searchParams.get("salesAgent") || ""
  );

  useEffect(() => {
    const params = {};
    if (statusFilter) params.status = statusFilter;
    if (agentFilter) params.salesAgent = agentFilter;
    setSearchParams(params);
  }, [statusFilter, agentFilter, setSearchParams]);

  let apiUrl = "https://zervia-crm-apis.vercel.app/leads";
  const params = new URLSearchParams();

  if (statusFilter) {
    params.append("status", statusFilter);
  }

  if (agentFilter) {
    params.append("salesAgent", agentFilter);
  }

  const queryString = params.toString();
  if (queryString) {
    apiUrl = `${apiUrl}?${queryString}`;
  }

  const { data, loading, error } = useFetch(apiUrl);

  const handleClearFilters = () => {
    setStatusFilter("");
    setAgentFilter("");
  };

  const handleDelete = async (leadId) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;

    try {
      const response = await fetch(
        `https://zervia-crm-apis.vercel.app/leads/${leadId}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        alert("Failed to delete lead. Try again.");
        return;
      }

      window.location.reload();
    } catch (error) {
      alert("Error deleting lead.");
      console.log(error);
    }
  };

  return (
    <>
      <div className="container" style={{ marginBottom: "5rem" }}>
        <div className="card container">
          <div className="card-body">
            <h1 className="fw-bold text-primary all-heading">
              Lead List
            </h1>

            <AddLeadAndFilter
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              agentFilter={agentFilter}
              setAgentFilter={setAgentFilter}
              handleClearFilters={handleClearFilters}
            />

            <hr />

            <div>
              {loading && (
                <div className="container mt-5">
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{ minHeight: "400px" }}
                  >
                    <div
                      className="spinner-border text-primary mb-3"
                      role="status"
                      style={{ width: "3rem", height: "3rem" }}
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div
                      className="alert alert-info text-center py-2 px-3"
                      role="alert"
                      style={{ maxWidth: "300px" }}
                    >
                      <span className="small fw-medium">Loading Leads...</span>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="container mt-5">
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{ minHeight: "400px" }}
                  >
                    <AlertCircle className="text-danger mb-3" size={48} />
                    <div
                      className="alert alert-danger text-center py-2 px-3"
                      role="alert"
                      style={{ maxWidth: "300px" }}
                    >
                      <span className="small fw-medium">
                        Error Loading Leads...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ===================== MAIN LEAD LIST SECTION ===================== */}
              {!loading && !error && data && data.length > 0 && (
                <div>
                  {/* ===== DESKTOP VIEW ===== */}
                  <div className="d-none d-lg-block">
                    <div
                      className="table-responsive"
                      style={{
                        maxHeight: "500px", // Only ~10 rows visible
                        overflowY: "auto",
                      }}
                    >
                      <table className="table mb-0">
                        <thead
                          className="table-dark"
                          style={{
                            position: "sticky",
                            top: 0,
                            zIndex: 2,
                          }}
                        >
                          <tr className="text-center">
                            <th scope="col">SNo.</th>
                            <th scope="col">NAME</th>
                            <th scope="col">SOURCE</th>
                            <th scope="col">STATUS</th>
                            <th scope="col">SALES AGENT</th>
                            <th scope="col">PRIORITY</th>
                            <th scope="col">TIME TO CLOSE</th>
                            <th scope="col">ACTION</th>
                          </tr>
                        </thead>

                        <tbody className="table-group-divider">
                          {data.map((lead, index) => (
                            <tr className="text-center" key={lead._id || index}>
                              <th scope="row">{index + 1}</th>
                              <td>{lead.name || "N/A"}</td>
                              <td>{lead.source || "N/A"}</td>
                              <td>{lead.status || "N/A"}</td>
                              <td>{lead.salesAgent?.name || "N/A"}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    lead.priority === "High"
                                      ? "text-bg-danger"
                                      : lead.priority === "Medium"
                                      ? "text-bg-primary"
                                      : "text-bg-success"
                                  }`}
                                >
                                  {lead.priority?.toUpperCase() || "N/A"}
                                </span>
                              </td>
                              <td>{lead.timeToClose}</td>
                              <td>
                                <div className="d-flex gap-2 justify-content-center">
                                  <Link to={`/leads/${lead._id}`}>
                                    <button
                                      className="btn btn-sm btn-primary px-3"
                                      title="View"
                                    >
                                      <Eye size={16} />
                                    </button>
                                  </Link>

                                  <Link to={`/leads/edit/${lead._id}`}>
                                    <button className="btn btn-sm btn-warning px-3">
                                      <Edit size={16} />
                                    </button>
                                  </Link>

                                  <button
                                    className="btn btn-sm btn-danger px-3"
                                    title="Delete"
                                    onClick={() => handleDelete(lead._id)}
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* ===== MOBILE VIEW ===== */}
                  <div
                    className="d-lg-none"
                    style={{
                      maxHeight: "600px", // Enough to show 3 leads approximately
                      overflowY: "auto",
                    }}
                  >
                    {data.map((lead, index) => (
                      <div
                        key={lead._id || index}
                        className="card mb-3 shadow-sm"
                      >
                        <div className="card-body p-3">
                          <div className="row g-2">
                            <div className="col-12">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <h6 className="mb-0 fw-bold">
                                  {index + 1}. {lead.name}
                                </h6>
                                <span
                                  className={`badge ${
                                    lead.priority === "High"
                                      ? "bg-danger"
                                      : lead.priority === "Medium"
                                      ? "bg-primary"
                                      : lead.priority === "Low"
                                      ? "bg-success"
                                      : "bg-secondary"
                                  }`}
                                >
                                  {lead.priority || "N/A"}
                                </span>
                              </div>
                            </div>

                            <div className="col-6">
                              <small className="text-muted d-block">
                                SOURCE
                              </small>
                              <span className="fw-semibold">
                                {lead.source || "N/A"}
                              </span>
                            </div>
                            <div className="col-6">
                              <small className="text-muted d-block">
                                STATUS
                              </small>
                              <span className="fw-semibold">
                                {lead.status || "N/A"}
                              </span>
                            </div>
                            <div className="col-6">
                              <small className="text-muted d-block">
                                SALES AGENT
                              </small>
                              <span className="fw-semibold">
                                {lead.salesAgent?.name || "N/A"}
                              </span>
                            </div>
                            <div className="col-6">
                              <small className="text-muted d-block">
                                TIME TO CLOSE
                              </small>
                              <span className="fw-semibold">
                                {lead.timeToClose || "N/A"}
                              </span>
                            </div>

                            <div className="col-12 mt-2">
                              <hr />
                              <div className="row g-2">
                                <div className="col-4">
                                  <Link to={`/leads/${lead._id}`}>
                                    <button className="btn btn-sm btn-primary w-100">
                                      <Eye size={16} /> View
                                    </button>
                                  </Link>
                                </div>
                                <div className="col-4">
                                  <Link to={`/leads/edit/${lead._id}`}>
                                    <button className="btn btn-sm btn-warning w-100">
                                      <Edit size={16} /> Edit
                                    </button>
                                  </Link>
                                </div>
                                <div className="col-4">
                                  <button
                                    className="btn btn-sm btn-danger w-100"
                                    onClick={() => handleDelete(lead._id)}
                                  >
                                    <Trash2 size={16} /> Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!loading && !error && (!data || data.length === 0) && (
                <p className="text-center text-muted mt-3">
                  No leads found for selected filters.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
