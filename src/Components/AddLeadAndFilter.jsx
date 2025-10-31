import { useState } from "react";
import useFetch from "../useFetch";
import { FilePlus } from "lucide-react";

export default function AddLeadAndFilter() {
    const { data, loading, error } = useFetch(
        "https://zervia-crm-apis.vercel.app/sales-agents"
    );

    const statusOptions = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed'];
    
    const [statusFilter, setStatusFilter] = useState('');
    const [agentFilter, setAgentFilter] = useState('');

    const handleClearFilters = () => {
        setStatusFilter('');
        setAgentFilter('');
    };


    const getFilterClass = (isDisabled, hasValue) => {
        if (isDisabled) {
            return 'form-select border-danger border-2 bg-danger bg-opacity-10';
        }
        if (hasValue) {
            return 'form-select border-success border-2 bg-success bg-opacity-10';
        }
        return 'form-select';
    };

    return (
        <>
            <div>
                <div className="card">
                    <div className="card-body">
                        <div className="row align-items-center g-3">
                            <div className="col-md-4">
                                <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2">
                                    <FilePlus size={20} />
                                    Add Lead
                                </button>
                            </div>
                            <div className="col-md-8">
                                <div className="row g-2 align-items-center">
                                    <div className="col-sm-5">
                                        <select 
                                            id="statusFilter"
                                            className={getFilterClass(agentFilter !== '', statusFilter !== '')}
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                            disabled={agentFilter !== ''}
                                        >
                                            <option value="" disabled>Filter by Status</option>
                                            {statusOptions.map((status, index) => (
                                                <option key={index} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-sm-5">
                                        <select 
                                            id="agentFilter"
                                            className={getFilterClass(statusFilter !== '', agentFilter !== '')}
                                            value={agentFilter}
                                            onChange={(e) => setAgentFilter(e.target.value)}
                                            disabled={loading || statusFilter !== ''}
                                        >
                                            <option value="" disabled>
                                                {loading ? 'Loading...' : 'Filter by Sales Agent'}
                                            </option>
                                            {error && <option disabled>Error loading agents</option>}
                                            {data && data.map((agent) => (
                                                <option key={agent.id} value={agent.id}>
                                                    {agent.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-sm-2">
                                        <button 
                                            className="btn btn-outline-danger w-100"
                                            onClick={handleClearFilters}
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}