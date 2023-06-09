import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { isLoading } from "@/redux/actions/auth.action";

const NavbarMainComponent = () => {
  const [login, setLogin] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    setLogin(JSON.parse(localStorage.getItem("dataUser")));
  }, []);

  const handleLogout = () => {
    console.info("panggilah");
    localStorage.removeItem("token");
    localStorage.removeItem("dataUser");
    dispatch(isLoading(false));
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" href={"/"}>
            <img
              srcSet={
                "https://w7.pngwing.com/pngs/87/586/png-transparent-next-js-hd-logo.png"
              }
              alt=""
              width="50"
              height="50"
            />
          </Link>
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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  href={"/home"}
                  style={{ fontSize: "18px" }}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href={"/GameList"}
                  style={{ fontSize: "18px" }}
                >
                  Game List
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav navbar-auth">
              {
                login ? (
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontSize: '18px' }}>
                      { login.usernameLogin } - { login.userTotalScoreLogin }
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><Link className="nav-link" href={'/profile'} style={{fontSize: '18px'}}>Profile</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      {/* Minta tolong rapikan logout nya */}
                      {/* hapus 3 localstorage ini */}
                      <li>
                        <a 
                          className="dropdown-item text-black"
                          onClick={handleLogout}
                        ><Link href={"/login"}>
                            Logout
                          </Link>
                        </a>

                    </li>
                    </ul>
                  </li>
                ) : (
                  <Link href={"/register"} className="btn btn-md mx-2 my-3 btn-outline-primary">
                    <b className="px-2 py-4">Register Account</b>
                  </Link>
                )
              }
              {/* <Link href={"/register"} className="btn btn-md mx-2 my-3 btn-outline-primary">
                <b className="px-2 py-4">Register Account</b>
              </Link> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarMainComponent;
