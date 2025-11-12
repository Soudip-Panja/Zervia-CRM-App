import { X, BadgeCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";

export default function AddSalesAgentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const newSalesAgentData = { name, email };

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://zervia-crm-apis.vercel.app/sales-agents",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSalesAgentData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save data.");
      }

      setIsSubmitting(false);
      setShowSuccess(true);
      setName("");
      setEmail("");

      setTimeout(() => {
        navigate("/salesAgent");
      }, 5000);
    } catch (error) {
      setIsSubmitting(false);
      alert(error.message);
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="container py-5 px-5">
        <div>
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
                  <Link to="/salesAgent">
                    <button className="btn btn-outline-danger">
                      <X size={20} strokeWidth={4} />
                    </button>
                  </Link>
                </div>
                <h3 className="card-title text-center fw-bold text-primary all-heading">
                  Add New Sales Agent
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter Sales Agent name"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="text"
                      placeholder="Enter Sales Agent email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="text-center">
                    <button className="btn btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? "Saving data..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            /* Success Modal Popup */
            <div
              className="modal show d-block"
              tabIndex="-1"
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
                      Sales Agent added successfully!
                      <br />
                      Redirecting in a moment...
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
