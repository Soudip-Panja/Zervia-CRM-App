import LeadsDistributionPieChart from "../Components/LeadsDistributionPieChart";
import ClosedLeadDoughnutChart from "../Components/ClosedLeadDoughnutChart";
import SalesAgentCloseLeadBarGraph from "../Components/SalesAgentCloseLeadBarGraph";
export default function Reports() {
  return (
    <>
      <div className="container my-5">
        <h1>Reports Overview</h1>
        <SalesAgentCloseLeadBarGraph />
        <div className="row">
          <div className="col-md-6">
            <LeadsDistributionPieChart />
          </div>
          <div className="col-md-6">
            <ClosedLeadDoughnutChart />
          </div>
        </div>
      </div>
    </>
  );
}
