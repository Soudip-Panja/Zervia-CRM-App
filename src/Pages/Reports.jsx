import LeadsDistributionPieChart from "../Components/LeadsDistributionPieChart";
import ClosedLeadDoughnutChart from "../Components/ClosedLeadDoughnutChart";
import SalesAgentCloseLeadBarGraph from "../Components/SalesAgentCloseLeadBarGraph";
import Header from "../Components/Header";
export default function Reports() {
  return (
    <>
    <Header />
      <div className="container my-5">
        <h1 className="display-5 fw-bold text-primary all-heading">Reports Overview</h1>
        <hr />
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
