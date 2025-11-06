import { Link, useNavigate } from "react-router-dom";
import { X, BadgeCheck } from "lucide-react";
import { useState } from "react";
import useFetch from "../useFetch";

export default function AddLeadForm() {
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    "https://zervia-crm-apis.vercel.app/sales-agents"
  );

  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [salesAgent, setSalesAgent] = useState("");
  const [status, setStatus] = useState("");
  const [tags, setTags] = useState("");
  const [timeToClose, setTimeToClose] = useState("");
  const [priority, setPriority] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newLeadData = {
      name,
      source,
      salesAgent,
      status,
      tags: tags.split(",").map((tag) => tag.trim()),
      timeToClose: Number(timeToClose),
      priority,
    };

    try {
      const response = await fetch("https://zervia-crm-apis.vercel.app/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLeadData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save data.");
      }

      setIsSubmitting(false);
      setShowSuccess(true);

      setName("");
      setSource("");
      setSalesAgent("");
      setTimeToClose("");
      setTags("");

      setTimeout(() => {
        navigate("/leads");
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      alert(error.message);
      console.error(error);
    }
  };

  return (
    <>
      <div className="container py-5 px-5">
        <div>
          {!showSuccess ? (
            <div
              className="card shadow p-3 mb-5 bg-body-tertiary rounded"
              style={{
                maxWidth: "650px",
                margin: "0 auto",
                marginTop: "150px",
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
                <h3 className="card-title text-center">Add New Lead</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name">Lead Name:</label>
                    <input
                      id="name"
                      type="text"
                      className="form-control"
                      placeholder="Enter Lead Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="source">Lead Source:</label>
                    <select
                      id="source"
                      className={`form-select ${
                        !source ? "text-secondary" : ""
                      }`}
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
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
                    <label htmlFor="salesAgent">Sales Agent:</label>
                    <select
                      id="salesAgent"
                      className={`form-select ${
                        !source ? "text-secondary" : ""
                      }`}
                      value={salesAgent}
                      onChange={(e) => setSalesAgent(e.target.value)}
                      required
                      disabled={isSubmitting}
                    >
                      <option value="" disabled>
                        Assign Sales Agent
                      </option>
                      {data &&
                        data.map((agent) => (
                          <option key={agent._id} value={agent._id}>
                            {agent.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="status">Status:</label>
                    <select
                      id="status"
                      className={`form-select ${
                        !source ? "text-secondary" : ""
                      }`}
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
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
                    <label htmlFor="tags">Tags (comma separated):</label>
                    <input
                      id="tags"
                      type="text"
                      className="form-control"
                      placeholder="e.g. High Value, Follow-up"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      disabled={isSubmitting}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="timeToClose">Time to Close (in Days)</label>
                    <input
                      id="timeToClose"
                      type="number"
                      className="form-control"
                      placeholder="Enter Estimated Days"
                      value={timeToClose}
                      onChange={(e) => setTimeToClose(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="priority">Priority:</label>
                    <select
                      id="priority"
                      className={`form-select ${
                        !source ? "text-secondary" : ""
                      }`}
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
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
                    className="btn btn-primary w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Add Lead"}
                  </button>
                </form>
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
                      Lead added successfully!
                      <br />
                      Redirecting...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
