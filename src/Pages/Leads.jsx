import LeadList from "../Components/LeadList";
import LeadOverViewCards from "../Components/LeadOverviewCards";
import Header from "../Components/Header";

export default function Leads() {
  return (
    <>
      <Header />
      <LeadOverViewCards />
      <LeadList />
    </>
  );
}
