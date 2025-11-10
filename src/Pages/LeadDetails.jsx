import LeadDetailsCard from "../Components/LeadDetailsCard";
import CommentCard from "../Components/CommentCard";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function LeadDetails() {
  return (
    <>
      <div className="container mt-5">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1>Lead Details</h1>
              <Link to="/leads" className="btn btn-secondary">
                <ArrowLeft size={16} className="me-1" />
                Back to List
              </Link>
            </div>
            <hr />

            <div className="row">
              <div className="col-md-6">
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
