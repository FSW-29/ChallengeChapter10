import Image from "next/image";
import switchLeft from "../../public/switch-left.svg";
import switchRight from "../../public/switch-right.svg";

export default function CarouselGameListComponent() {
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
            <div className="carousel-inner  rounded rounded-5">
              <button
                className="carousel-control-prev fw-bold text-black"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span aria-hidden="true">
                  <Image src={switchLeft} alt="" />
                </span>
                <span className="visually-hidden">Previous</span>
              </button>
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
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span aria-hidden="true">
                  <Image src={switchRight} alt="" />
                </span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
