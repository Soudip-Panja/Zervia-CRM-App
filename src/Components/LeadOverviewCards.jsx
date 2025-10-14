import { Users, FolderOpen, BadgeCheck } from "lucide-react";

export default function LeadOverViewCards() {
  const iconComponents = {
    Users: Users,
    FolderOpen: FolderOpen,
    BadgeCheck: BadgeCheck,
  };

  const cardData = [
    {
      name: "Total Leads",
      count: 43,
      icon: "Users",
      borderColor: "border-primary",
      backgroundColor: "bg-info-subtle",
      iconBgColor: "bg-primary",
      textColor: "text-primary",
    },
    {
      name: "Open Leads",
      count: 28,
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
      count: 15,
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
