import useFetch from "../useFetch";
import { AlertCircle, UserRoundPlus } from "lucide-react";
import "../styles.css";

export default function SalesAgents() {
  const { data, loading, error } = useFetch(
    "https://zervia-crm-apis.vercel.app/sales-agents"
  );

  const getInitials = (name) => {
    if (!name) return "A";
    const names = name.trim().split(" ");
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  const bootstrapColors = [
    "primary",
    "danger",
    "success",
    "warning",
    "info",
    "secondary",
    "dark",
  ];

  console.log(data);

  if (loading) {
    return (
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
            <span className="small fw-medium">Loading Sales Agents...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
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
            <span className="small fw-medium">Error Loading Sales Agents</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="display-4 fw-bold text-primary salesAgent-heading">
              Sales Agents
            </h1>
            <p className="text-muted fs-5 mb-0">
              Meet our <span className="fw-semibold text-dark">talented</span>{" "}
              and
              <span className="fw-semibold text-dark"> dedicated</span> sales
              team.
            </p>
          </div>

          <div className="col-12 col-md-6 text-md-end g-3">
            <button className="btn btn-primary btn-lg shadow w-100 w-md-auto">
              <span className="me-2">
                <UserRoundPlus color="#ffffff" />
              </span>
              Create Sales Agent
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row g-4">
          {data &&
            data.length > 0 &&
            data.map((agent, index) => {
              const colorClass =
                bootstrapColors[index % bootstrapColors.length];
              return (
                <div
                  className="col-12 col-md-6 col-lg-4 col-xl-3"
                  key={agent.id || index}
                >
                  <div
                    className={`card h-100 shadow-sm border-${colorClass} border-3 hover-card`}
                  >
                    <div className="card-body text-center p-4">
                      <div className="mb-3">
                        <div
                          className={`rounded-circle bg-${colorClass} d-inline-flex align-items-center justify-content-center`}
                          style={{ width: "100px", height: "100px" }}
                        >
                          <span className="text-white fw-bold fs-1">
                            {getInitials(agent.name)}
                          </span>
                        </div>
                      </div>
                      <h5 className="card-title fw-bold mb-3">
                        {agent.name || "N/A"}
                      </h5>

                      <div className={`alert alert-${colorClass}`} role="alert">
                        {agent.email}
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
