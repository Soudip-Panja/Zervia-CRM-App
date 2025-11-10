import useFetch from "../useFetch";
import { AlertCircle, Send } from "lucide-react";
import { useState } from "react";

export default function CommentCard() {
  const {
    data: agentData,
    loading: agentLoading,
    error: agentError,
  } = useFetch("https://zervia-crm-apis.vercel.app/sales-agents");

  const [salesAgent, setSalesAgent] = useState("");

  return (
    <>
      <div className="card h-100">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Comments</h5>
        </div>

        <div className="card-body">
          <div className="card h-100">
            <p className="m-0">No comments yet. Be the first to comment!</p>
          </div>
        </div>

        <div className="card-footer bg-body-secondary py-4 border-top">
          {agentError ? (
            <div className="d-flex align-items-center text-danger gap-2 border rounded p-2">
              <AlertCircle size={20} />
              <span>Failed to load Sales Agents</span>
            </div>
          ) : agentLoading ? (
            <div className="d-flex align-items-center gap-2">
              <div
                className="spinner-border spinner-border-sm"
                role="status"
              ></div>
              <span>Loading agents...</span>
            </div>
          ) : (
            <select
              id="salesAgent"
              className={`form-select mb-3 ${
                !salesAgent ? "text-secondary" : ""
              }`}
              value={salesAgent}
              onChange={(e) => setSalesAgent(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Sales Agent
              </option>
              {agentData &&
                agentData.map((agent) => (
                  <option key={agent._id} value={agent._id}>
                    {agent.name}
                  </option>
                ))}
            </select>
          )}

          <div className="input-group">
            <textarea
              className="form-control"
              rows="2"
              placeholder="Write a comment..."
            ></textarea>

            <button className="btn btn-primary d-flex justify-content-center align-items-center">
              <Send />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
