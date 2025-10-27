import useFetch from "../useFetch";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { AlertCircle } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ClosedLeadDoughnutChart() {
  const { data, loading, error } = useFetch(
    "https://zervia-crm-apis.vercel.app/leads"
  );

  const getChartData = () => {
    if (!data || !Array.isArray(data)) return null;

    let closed = 0;
    let others = 0;

    for (let i = 0; i < data.length; i++) {
      if (data[i].status === "Closed") {
        closed++;
      } else {
        others++;
      }
    }

    return {
      labels: ["Closed Leads", "Other Leads"],
      datasets: [
        {
          label: "Closed Leads vs Total Leads",
          data: [closed, others],
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 2,
        },
      ],
    };
  };

  const chartData = getChartData();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          padding: 15,
          boxWidth: 25,
          boxHeight: 25,
          font: {
            size: 16,
            weight: "bold",
          },
          generateLabels: function (chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const meta = chart.getDatasetMeta(0);
                const style = meta.controller.getStyle(i);
                const value = data.datasets[0].data[i];

                return {
                  text: `${label}: ${value}`,
                  fillStyle: style.backgroundColor,
                  strokeStyle: style.borderColor,
                  lineWidth: style.borderWidth,
                  hidden: false,
                  index: i,
                };
              });
            }
            return [];
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

  return (
    <>
      <div className="card container shadow p-3 mb-5 bg-body-tertiary rounded hover-card">
        <div className="card-body">
          <h3 className="card-title mb-3 text-center">
            Closed Leads Overview
          </h3>
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
                    Loading Closed Leads Chart...
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
                    Error Loading Chart: {error.message || "Unknown error"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && chartData && (
            <div className="row py-4">
              <div className="col-12">
                <div style={{ height: "400px", position: "relative" }}>
                  <Doughnut data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}