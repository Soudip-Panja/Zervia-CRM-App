import useFetch from "../useFetch";

export default function SalesAgents() {
  const { data, loading, error } = useFetch(
    "https://zervia-crm-apis.vercel.app/sales-agents"
  );
  console.log(data);

  if (loading) {
    return (
      <div className="container mt-5">
        <div
          className="d-flex flex-column justify-content-center align-items-center"style={{ minHeight: "400px" }}>
          <div className="spinner-border text-primary mb-3" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="alert alert-info text-center py-2 px-3" role="alert" style={{ maxWidth: "300px" }}>
            <i className="bi bi-envelope-fill me-2"></i>
            <span className="small fw-medium">Loading Sales Agents...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1>Sales Agent</h1>
    </>
  );
}
