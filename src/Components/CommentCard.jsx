import useFetch from "../useFetch";
import { AlertCircle, Send, UserStar } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function CommentCard() {
  const { leadId } = useParams();

  const {
    data: agentData,
    loading: agentLoading,
    error: agentError,
  } = useFetch("https://zervia-crm-apis.vercel.app/sales-agents");

  const {
    data: commentData,
    loading: commentLoading,
    error: commentError,
  } = useFetch(
    `https://zervia-crm-apis.vercel.app/comments/${leadId}/comments`
  );

  console.log(commentData);

  const [salesAgent, setSalesAgent] = useState("");
  const [commentText, setCommentText] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handlePostComment = async () => {
    if (!salesAgent) {
      alert("Select Sales Agent");
      return;
    }

    if (!commentText.trim()) {
      alert("Comment is missing");
      return;
    }

    try {
      const response = await fetch(
        `https://zervia-crm-apis.vercel.app/comments/${leadId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            author: salesAgent,
            commentText,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();

        const msg =
          errorData?.error ||
          errorData?.message ||
          "Failed to post comment. Unknown error.";

        alert("❌ " + msg);
        return;
      }

      setSuccessMsg("✅ Comment posted successfully!");
      setCommentText("");
      setSalesAgent("");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.log(error);
      setErrorMsg("❌ Error posting comment");
      setTimeout(() => setErrorMsg(""), 3000);
    }
  };

  return (
    <>
      <div className="card h-90">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Comments</h5>
        </div>

        {/* Display Comments */}
        <div className="card-body">
          {commentLoading && (
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
                  <span className="small fw-medium">
                    Loading Lead Comments.....
                  </span>
                </div>
              </div>
            </div>
          )}

          {commentError && (
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
                    Error Loading Comments: {error.message || "Unknown error"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {!commentLoading && !commentError && commentData && (
            <div>
              {commentData.map((comment) => (
                <div
                  key={comment._id}
                  className="shadow hover-card p-3 mb-3 bg-body-tertiary rounded border rounded p-2 mb-2"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <strong className="d-flex align-items-center gap-1">
                      <UserStar size={20} />
                      {comment.author.toUpperCase()}
                    </strong>

                    <span
                      className="text-secondary"
                      style={{ fontSize: "12px" }}
                    >
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <hr className="mt-1 mb-2" />

                  <p className="m-0">{comment.commentText}</p>
                </div>
              ))}
            </div>
          )}
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
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>

            <button
              className="btn btn-primary d-flex justify-content-center align-items-center"
              onClick={handlePostComment}
            >
              <Send />
            </button>
          </div>
          <div>
            {successMsg && <p className="text-success mt-2">{successMsg}</p>}
            {errorMsg && <p className="text-danger mt-2">{errorMsg}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
