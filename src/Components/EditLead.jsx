import { Link, useNavigate, useParams } from "react-router-dom";
import { X, BadgeCheck, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import useFetch from "../useFetch";
import Header from "./Header";

export default function EditLead() {
  const { leadId } = useParams();
  const navigate = useNavigate();

  const {
    data: leadData,
    loading,
    error,
  } = useFetch(`https://zervia-crm-apis.vercel.app/leads/${leadId}`);

  const {
    data: agentData,
    loading: agentLoading,
    error: agentError,
  } = useFetch("https://zervia-crm-apis.vercel.app/sales-agents");

  const [form, setForm] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    tags: "",
    timeToClose: "",
    priority: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (leadData) {
      setForm({
        name: leadData.name || "",
        source: leadData.source || "",
        salesAgent: leadData.salesAgent?._id || "",
        status: leadData.status || "",
        tags: leadData.tags?.join(", ") || "",
        timeToClose: leadData.timeToClose || "",
        priority: leadData.priority || "",
      });
    }
  }, [leadData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedLead = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()),
      timeToClose: Number(form.timeToClose),
    };

    try {
      const response = await fetch(
        `https://zervia-crm-apis.vercel.app/leads/${leadId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedLead),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update lead.");
      }

      setIsSubmitting(false);
      setShowSuccess(true);

      setTimeout(() => {
        navigate("/leads");
      }, 3000);
    } catch {
      setIsSubmitting(false);
      alert("Error updating lead.");
    }
  };

  return (
    <>
    <Header />
      <div className="container py-5 px-5">
        {!showSuccess ? (
          <div
            className="card shadow p-3 mb-5 bg-body-tertiary rounded"
            style={{
              maxWidth: "650px",
              margin: "0 auto",
            }}
          >
            <div className="card-body">
              <div className="text-end">
                <Link to="/leads">
                  <button className="btn btn-outline-danger">
                    <X size={20} strokeWidth={4} />
                  </button>
                </Link>
              </div>

              <h3 className="card-title text-center fw-bold text-primary all-heading">Edit Lead</h3>

              {loading && (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary"></div>
                  <p className="mt-2 text-primary">Loading Lead...</p>
                </div>
              )}

              {error && (
                <div className="text-center text-danger py-4">
                  <AlertCircle size={24} />
                  <p>Error loading lead!</p>
                </div>
              )}

              {!loading && !error && (
                <form onSubmit={handleUpdate}>
                  <div className="mb-3">
                    <label className="form-label">Lead Name:</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={form.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Lead Source:</label>
                    <select
                      name="source"
                      className={`form-select ${
                        !form.source ? "text-secondary" : ""
                      }`}
                      value={form.source}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    >
                      <option value="" disabled>
                        Select Lead Source
                      </option>
                      <option>Website</option>
                      <option>Referral</option>
                      <option>Cold Call</option>
                      <option>Advertisement</option>
                      <option>Email</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Sales Agent:</label>
                    {agentError ? (
                      <div className="d-flex align-items-center text-danger gap-2 border rounded p-2">
                        <AlertCircle size={20} />
                        <span>Failed to load agents</span>
                      </div>
                    ) : agentLoading ? (
                      <div className="d-flex align-items-center gap-2">
                        <div className="spinner-border spinner-border-sm"></div>
                        <span>Loading agents...</span>
                      </div>
                    ) : (
                      <select
                        name="salesAgent"
                        className={`form-select ${
                          !form.salesAgent ? "text-secondary" : ""
                        }`}
                        value={form.salesAgent}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                      >
                        <option value="" disabled>
                          Assign Sales Agent
                        </option>
                        {agentData?.map((agent) => (
                          <option key={agent._id} value={agent._id}>
                            {agent.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Status:</label>
                    <select
                      name="status"
                      className={`form-select ${
                        !form.status ? "text-secondary" : ""
                      }`}
                      value={form.status}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    >
                      <option value="" disabled>
                        Select Lead Status
                      </option>
                      <option>New</option>
                      <option>Contacted</option>
                      <option>Qualified</option>
                      <option>Proposal Sent</option>
                      <option>Closed</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Tags (comma separated):
                    </label>
                    <input
                      type="text"
                      name="tags"
                      className="form-control"
                      value={form.tags}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Time to Close (in Days)
                    </label>
                    <input
                      type="number"
                      name="timeToClose"
                      className="form-control"
                      value={form.timeToClose}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Priority:</label>
                    <select
                      name="priority"
                      className={`form-select ${
                        !form.priority ? "text-secondary" : ""
                      }`}
                      value={form.priority}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    >
                      <option value="" disabled>
                        Select Lead Priority
                      </option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>

                  <button
                    className="btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner-border spinner-border-sm"></div>
                        Updating Lead...
                      </>
                    ) : (
                      "Update Lead"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        ) : (
          <div
            className="modal show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center py-5">
                  <div className="mb-3">
                    <BadgeCheck size={64} className="text-success" />
                  </div>
                  <h4 className="mb-3">Success!</h4>
                  <p className="text-muted">
                    Lead updated successfully!
                    <br />
                    Redirecting...
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
