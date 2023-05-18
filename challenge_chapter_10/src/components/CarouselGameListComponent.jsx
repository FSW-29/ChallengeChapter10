import React from "react";

function CarouselGameListComponent() {
  return (
    <>
      <div id="imageSlider" className="col-12 w-100">
        <div className="d-flex flex-row w-100">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            style={{
              padding: "0 15% 0 15%",
              width: "100%",
              height: "50% !important",
            }}
            data-bs-ride="true"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active me-3"
                aria-current="true"
                aria-label="Slide 1"
                style={{ width: "10px", height: "10px", borderRadius: "100%" }}
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                className="me-3"
                aria-label="Slide 2"
                style={{ width: "10px", height: "10px", borderRadius: "100%" }}
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                className="me-3"
                aria-label="Slide 3"
                style={{ width: "10px", height: "10px", borderRadius: "100%" }}
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://images.crazygames.com/smash-karts/20201119155032/smash-karts-cover?auto=format%2Ccompress&q=45&cs=strip&ch=DPR&fit=crop"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.crazygames.com/puppet-fighter-2-player/20221123094627/puppet-fighter-2-player-cover?auto=format%2Ccompress&q=45&cs=strip&ch=DPR&fit=crop"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.crazygames.com/roboduo/20220808111036/roboduo-cover?auto=format%2Ccompress&q=45&cs=strip&ch=DPR&fit=crop"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </div>

            <button
              className="carousel-control-prev bg-dark  bg-opacity-75"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span aria-hidden="true">
                {" "}
                <img src="../assets/switch-left.svg" alt="" />
              </span>
              <span className="visually-hidden">Previous</span>
            </button>

            <button
              className="carousel-control-next bg-dark  bg-opacity-75"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span aria-hidden="true">
                <img src="../assets/switch-right.svg" alt="" />
              </span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CarouselGameListComponent;
