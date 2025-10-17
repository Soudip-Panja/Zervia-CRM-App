import { Users, FolderOpen, BadgeCheck, AlertCircle } from "lucide-react";
import useFetch from "../useFetch";

export default function LeadOverViewCards() {
  const {
    data: leads,
    loading,
    error,
  } = useFetch("https://zervia-crm-apis.vercel.app/leads");

  const iconComponents = {
    Users: Users,
    FolderOpen: FolderOpen,
    BadgeCheck: BadgeCheck,
  };

  const totalLeads = leads ? leads.length : 0;
  const openLeads = leads
    ? leads.filter((lead) => lead.status !== "Closed").length
    : 0;
  const closedLeads = leads
    ? leads.filter((lead) => lead.status === "Closed").length
    : 0;

  const cardData = [
    {
      name: "Total Leads",
      count: totalLeads,
      icon: "Users",
      borderColor: "border-primary",
      backgroundColor: "bg-info-subtle",
      iconBgColor: "bg-primary",
      textColor: "text-primary",
    },
    {
      name: "Open Leads",
      count: openLeads,
      icon: "FolderOpen",
      borderColor: "",
      backgroundColor: "",
      iconBgColor: "#fd7e14",
      textColor: "#fd7e14",
      customStyle: {
        borderColor: "#fd7e14",
        backgroundColor: "#fff3e0",
      },
    },
    {
      name: "Closed Leads",
      count: closedLeads,
      icon: "BadgeCheck",
      borderColor: "border-success",
      backgroundColor: "bg-success-subtle",
      iconBgColor: "bg-success",
      textColor: "text-success",
    },
  ];

  return (
    <>
      <div className="container py-5">
        <div className="card container">
          <div className="card-body">
            <h1 className="mb-3">Leads Overview</h1>
            <hr />

            <div className="row g-4 mt-2">
              {cardData.map((card, index) => {
                const isCustomColor = card.customStyle;
                const IconComponent = iconComponents[card.icon];
                return (
                  <div key={index} className="col-md-4">
                    <div
                      className={`card rounded-4 border-3 ${
                        !isCustomColor
                          ? `${card.borderColor} ${card.backgroundColor}`
                          : ""
                      }`}
                      style={isCustomColor ? card.customStyle : {}}
                    >
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between">
                          <div
                            className={`rounded-circle d-flex align-items-center justify-content-center ${
                              !isCustomColor ? card.iconBgColor : ""
                            }`}
                            style={{
                              width: "80px",
                              height: "80px",
                              ...(isCustomColor && {
                                backgroundColor: card.iconBgColor,
                              }),
                            }}
                          >
                            <IconComponent size={48} className="text-white" />
                          </div>
                          <div className="text-end">
                            <h4
                              className={`mb-1 ${
                                !isCustomColor ? card.textColor : ""
                              }`}
                              style={
                                isCustomColor ? { color: card.textColor } : {}
                              }
                            >
                              {card.name}
                            </h4>
                            {error ? (
                              <div className="d-flex align-items-center justify-content-end">
                                <AlertCircle
                                  size={32}
                                  className={
                                    !isCustomColor ? card.textColor : ""
                                  }
                                  style={
                                    isCustomColor
                                      ? { color: card.textColor }
                                      : {}
                                  }
                                />
                              </div>
                            ) : loading ? (
                              <div
                                className={`spinner-border ${
                                  !isCustomColor ? card.textColor : ""
                                }`}
                                style={
                                  isCustomColor ? { color: card.textColor } : {}
                                }
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            ) : (
                              <h1
                                className={`mb-0 fw-bold ${
                                  !isCustomColor ? card.textColor : ""
                                }`}
                                style={
                                  isCustomColor ? { color: card.textColor } : {}
                                }
                              >
                                {card.count}
                              </h1>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
