import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

const NavbarMainComponent = () => {
  const [username, setUsername] = useState('');
  const [totalPoint, setTotalPoint] = useState('');

  const { loginUserFulfilled, loginWithGoogleFulfilled } = useSelector((state) => state.authReducer);

  if (loginUserFulfilled.profile != "" && loginUserFulfilled.profile != null && typeof loginUserFulfilled.profile != 'undefined' && username == ''){
    setUsername(loginUserFulfilled.profile.username);
    setTotalPoint(loginUserFulfilled.profile.total_score);
  }
  if (loginWithGoogleFulfilled.data != "" && loginWithGoogleFulfilled.data != null && typeof loginWithGoogleFulfilled.data != 'undefined' && username == ''){
    setUsername(loginWithGoogleFulfilled.data.username);
    setTotalPoint(loginWithGoogleFulfilled.data.total_score);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img srcSet={"https://w7.pngwing.com/pngs/87/586/png-transparent-next-js-hd-logo.png"} alt="" width="50" height="50" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mx-4">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#" style={{ fontSize: '18px' }}>Home</a>
              </li> 
              <li className="nav-item">
                <a className="nav-link" href="#" style={{ fontSize: '18px' }}>List Game</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontSize: '18px' }}>
                  Category Game
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
            <ul className="navbar-nav navbar-auth">
              {
                loginUserFulfilled || loginWithGoogleFulfilled ? (
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontSize: '18px' }}>
                      {username} - {totalPoint}
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><a className="dropdown-item text-black">Profile</a></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><a className="dropdown-item text-black">Logout</a></li>
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
}

export default NavbarMainComponent;
