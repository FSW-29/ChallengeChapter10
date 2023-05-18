import React from "react";
import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";
import firebase from "../services/firebase";
import styles from "../styles/Home.module.css"

const NavbarHomeComponent = (props) => {
  //const navigate = useNavigate();
  const router = useRouter();

  // const navigateToLanding = () => {
  //     navigate('/')
  // }

  const navigateToHome = () => {
    router.push("/home");
  };

  const navigateToProfile = () => {
    router.push("/profile");
  };

  const navigateToGameList = () => {
    router.push("/GameList");
  };

  const handleLogout = async () => {
    const auth = getAuth(firebase);
    await signOut(auth);

    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{ opacity: "70%" }}
      >
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" 
                onClick={navigateToHome}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" 
                onClick={navigateToProfile}
                >
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" 
                onClick={navigateToGameList}
                >
                  Game List
                </a>
              </li>
              {/* <li className="nav-item">
                                <a className="nav-link" >Game Detail</a>
                            </li> */}
            </ul>
            <form className="d-flex">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page">
                    Hello, {props.propsPutUsername}
                  </a>
                </li>
                <li className={styles.nav_item_create_account}>
                  <a
                    onClick={handleLogout}
                    className="nav-link active"
                    aria-current="page"
                  >
                    Logout
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

export default NavbarHomeComponent;
