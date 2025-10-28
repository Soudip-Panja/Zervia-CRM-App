import Profile from "../Components/Profile";

export default function Settings() {
  return (
    <>
      <div className="container py-5">
        <div
          className="card mx-auto shadow-lg overflow-hidden"
          style={{ borderRadius: "25px" }}
        >
          <div
            className="position-relative"
            style={{
              height: "150px",
              background: "linear-gradient(180deg, #7F00FF, #1C6EF2)",
            }}
          >
            <img
              src="https://shorturl.at/oLPQF"
              alt="Profile Avatar"
              className="rounded-circle border border-3 border-light shadow position-absolute start-50 translate-middle"
              width="180"
              height="180"
              style={{
                top: "100%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#fff",
              }}
            />
          </div>
          <div className="card-body text-center mt-5">
            <h3 className="mt-5">Soudip Panja</h3>
            <p className="text-muted">soudip03panja@gmail.com</p>
            <hr />

            <Profile />
          </div>
        </div>
      </div>
    </>
  );
}
