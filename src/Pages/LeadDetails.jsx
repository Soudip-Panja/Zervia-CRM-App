import useFetch from "../useFetch";
import { useParams } from "react-router-dom";

export default function LeadDetails() {
  const { data, loading, error } = useFetch(`https://zervia-crm-apis.vercel.app/leads/${leadId}`);
  return (
    <>
      <h1>Lead Details</h1>
    </>
  );
}
