import useFetch from "../useFetch";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { AlertCircle } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LeadsPieChart() {
  const { data, loading, error } = useFetch(
    "https://zervia-crm-apis.vercel.app/leads"
  );

  const getChartData = () => {
    if (!data || !Array.isArray(data)) return null;

    const statusCount = {
      New: 0,
      Contacted: 0,
      Qualified: 0,
      "Proposal Sent": 0,
      Closed: 0,
    };

    data.forEach((lead) => {
      if (lead.status && statusCount.hasOwnProperty(lead.status)) {
        statusCount[lead.status]++;
      }
    });

    return {
      labels: Object.keys(statusCount),
      datasets: [
        {
          label: "Leads by Status",
          data: Object.values(statusCount),
          backgroundColor: [
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 99, 132, 0.8)",
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 99, 132, 1)",
          ],
          borderWidth: 2,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  const chartData = getChartData();

  return (
    <>
      <div className="card container">
        <div className="card-body">
          <h3 className="card-title mb-3">Leads Status Distribution</h3>
          <hr />

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
                  <span className="small fw-medium">
                    Loading Leads Pie Chart.....
                  </span>
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
                    Error Loading Pie Chart: {error.message || "Unknown error"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && chartData && (
            <div className="row">
              <div className="col-12 col-lg-8 mx-auto">
                <div style={{ height: "400px", position: "relative" }}>
                  <Pie data={chartData} options={chartOptions} />
                </div>
              </div>

              {/* Summary Cards */}
              <div className="col-12 mt-4">
                <div className="row g-3">
                  {chartData.labels.map((status, index) => (
                    <div className="col-6 col-md-4 col-lg-2" key={status}>
                      <div className="card text-center border-0 shadow-sm">
                        <div className="card-body py-3">
                          <h6 className="card-subtitle mb-2 text-muted small">
                            {status}
                          </h6>
                          <h4 className="card-title mb-0 fw-bold">
                            {chartData.datasets[0].data[index]}
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
