import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

const NavbarLandingComponent = () => {
  const router = useRouter();
  //   const navigate = useNavigate();

  const navigateToRegister = () => {
    router.push("/register");
  };

  const navigateToLogin = () => {
    router.push("/login");
  };

  const navigateToGameList = () => {
    router.push("/GameList");
  };

  const navigateToLanding = () => {
    router.push("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
        <div className="container-fluid">
          <a
            className={styles.navbar_brand}
            style={{ width: "30px", height: "30px" }}
          />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className="navbar-nav me-auto mb-2 mb-lg-0 text-white fw-bold"
              style={{ cursor: "pointer" }}
            >
              <li className="nav-item">
                <a onClick={navigateToLanding} className="nav-link">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a onClick={navigateToGameList} className="nav-link">
                  Game List
                </a>
              </li>
            </ul>
            <form className="d-flex">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className={styles.nav_item_create_account}>
                  <a onClick={navigateToRegister} className="nav-link">
                    Create An Account
                  </a>
                </li>
                <li className={styles.nav_item_sign_in}>
                  <a onClick={navigateToLogin} className="nav-link">
                    Sign In
                  </a>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarLandingComponent;
