import LeadsDistributionPieChart from "../Components/LeadsDistributionPieChart"
import ClosedLeadDoughnutChart from "../Components/ClosedLeadDoughnutChart"
export default function Reports() {
    return(
        <>
        <div className="container my-5">
            <h1>Reports Overview</h1>
            <LeadsDistributionPieChart />
            <ClosedLeadDoughnutChart />
        </div>
        </>
    )
}