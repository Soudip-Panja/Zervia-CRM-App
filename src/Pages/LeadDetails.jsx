import LeadDetailsCard from "../Components/LeadDetailsCard";
import CommentCard from "../Components/CommentCard";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../Components/Header";

export default function LeadDetails() {
  return (
    <>
    <Header />
      <div className="container mt-5" style={{marginBottom: "5rem"}}>
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1 className="leadDetails-heading">Lead Details</h1>
              <Link to="/leads" className="btn btn-primary">
                <ArrowLeft size={16} className="me-1" />
                Back to List
              </Link>
            </div>
            <hr />

            <div className="row py-4">
              <div className="col-md-6 mb-4 mb-md-0">
                <LeadDetailsCard />
              </div>

              <div className="col-md-6">
                <CommentCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
