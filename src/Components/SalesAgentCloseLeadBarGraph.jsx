import useFetch from "../useFetch";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { AlertCircle } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function SalesAgentCloseLeadBarGraph() {
  const {
    data: leadsData,
    loading: leadsLoading,
    error: leadsError,
  } = useFetch("https://zervia-crm-apis.vercel.app/leads");

  console.log(leadsData);

  const {
    data: agentsData,
    loading: agentsLoading,
    error: agentsError,
  } = useFetch("https://zervia-crm-apis.vercel.app/sales-agents");

  const loading = leadsLoading || agentsLoading;
  const error = leadsError || agentsError;

  const getChartData = () => {
    if (
      !leadsData ||
      !Array.isArray(leadsData) ||
      !agentsData ||
      !Array.isArray(agentsData)
    ) {
      return null;
    }

    const agentClosedLeads = {};
    agentsData.forEach((agent) => {
      const agentId = agent._id;
      agentClosedLeads[agentId] = {
        name: agent.name,
        count: 0,
      };
    });

    leadsData.forEach((lead) => {
      if (lead.status === "Closed" && lead.salesAgent) {
        const salesAgentId = lead.salesAgent._id;
        if (agentClosedLeads[salesAgentId]) {
          agentClosedLeads[salesAgentId].count++;
        }
      }
    });

    const labels = Object.values(agentClosedLeads).map((agent) => {
      const nameParts = agent.name.split(" ");
      if (nameParts.length >= 2) {
        return [nameParts[0], nameParts.slice(1).join(" ")];
      }
      return agent.name;
    });
    const counts = Object.values(agentClosedLeads).map((agent) => agent.count);

    const colors = labels.map((_, index) => {
      const hue = (index * 137.5) % 360;
      return `hsla(${hue}, 70%, 60%, 0.8)`;
    });

    const borderColors = labels.map((_, index) => {
      const hue = (index * 137.5) % 360;
      return `hsla(${hue}, 70%, 50%, 1)`;
    });

    return {
      labels: labels,
      datasets: [
        {
          label: "Closed Leads",
          data: counts,
          backgroundColor: colors,
          borderColor: borderColors,
          borderWidth: 2,
        },
      ],
    };
  };

  const chartData = getChartData();

  if (chartData) {
    console.log("Chart Data:", chartData);
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.parsed.y || 0;
            return `Closed Leads: ${value}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        suggestedMax: 20,
        ticks: {
          stepSize: 5,
          callback: function (value) {
            if (value % 5 === 0) {
              return value;
            }
          },
        },
        title: {
          display: true,
          text: "Number of Closed Leads",
          font: {
            size: 15,
            weight: "bold",
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Sales Agents",
          font: {
            size: 15,
            weight: "bold",
          },
        },
        ticks: {
          maxRotation: 60,
          minRotation: 60,
        },
      },
    },
  };

  return (
    <>
      <div className="card container shadow p-3 mb-5 bg-body-tertiary rounded hover-card">
        <div className="card-body">
          <h3 className="card-title mb-3 text-center">
            Leads Closed by Sales Agent
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
                    Error Loading Bar Graph: {error.message || "Unknown error"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && chartData && (
            <div className="row">
              <div className="col-12 col-lg-10 mx-auto">
                <div style={{ height: "400px", position: "relative" }}>
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
