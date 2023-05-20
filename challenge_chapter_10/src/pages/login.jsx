import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { failedLogin, isLoading, loginUser, loginWithGoogle, newLoginGoogle, newLoginUser } from "@/redux/actions/auth.action";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import firebase from "@/services/firebase";
import NavbarAuthComponent from "@/components/NavbarAuthComponent";

const Login = () => {
  // > state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiKeyLoginGoogle, setApiKeyLoginGoogle] = useState('');

  // > dispatch
  const dispatch = useDispatch();

  const {
    loginUserLoading,
    loginUserRejected,
    loginWithGooleLoading,
    loginWithGoogleFulfilled
  } = useSelector((state) =>  state.authReducer);

  // > data yang akan dikirim saat login
  const dataUser = {
    email: email,
    password: password
  };

  // > router
  const router = useRouter();

  // > hooks untuk cek user sudah login atau belum
  useEffect(() => {
    const checkAccessToken = () => {
      if (localStorage.getItem('token')) {
        router.push('/');
      }
    };
    checkAccessToken();
  }, [router]);

  const handleLogin = async (event) => {
    event.preventDefault();

    console.log("wawan ganteng")

    try {
      // > Cek inputan user
      if (!email || !password) {
        return alert("Email and password cannot be empty!");
      }

      let response = await axios.post('/api/auth/login', dataUser);
      let dataUserLogin = response.data;

      let tokenUser = dataUserLogin.profile.id;
      let usernameLogin = dataUserLogin.profile.username;
      let userTotalScoreLogin = dataUserLogin.profile.total_score;

      // console.info(tokenUser, usernameLogin, userTotalScoreLogin, '=> data user login');
      // console.info(profile, '=> hasil login guys');

      const jsonUserData = {
        usernameLogin,
        userTotalScoreLogin
      }
      localStorage.setItem("token", tokenUser);
      localStorage.setItem("dataUser", JSON.stringify(jsonUserData));
      
      dispatch(newLoginUser(dataUser));
      dispatch(failedLogin(false));
      dispatch(isLoading(false));

      setEmail('');
      setPassword('');

      // alert('Login Success');
      router.push('/home');
    } catch (error) {
      dispatch(failedLogin(error));
      dispatch(isLoading(false));
      // console.log(error);
    } finally {
      dispatch(isLoading(true));
    }
  };

  // > buat api key jika login dengan google
  // if (loginWithGoogleFulfilled.data != "" && loginWithGoogleFulfilled.data != null && typeof loginWithGoogleFulfilled.data != 'undefined' && apiKeyLoginGoogle == ''){
  //   setApiKeyLoginGoogle(loginWithGoogleFulfilled.data.id)
  //   localStorage.setItem("token", loginWithGoogleFulfilled.data.id);
  //   const { username, total_score } = loginWithGoogleFulfilled.data;
  //   const dataUserGoogle = { username, total_score };
  //   localStorage.setItem("dataUserGoogle", JSON.stringify(dataUserGoogle));
  // }

  // const loginSSO = async () => {
  //   const auth = getAuth(firebase);
  //   const provider = new GoogleAuthProvider();
  //   const loginResult = await signInWithPopup(auth, provider);
  //   // const idUser = loginResult._tokenResponse.localId;
  //   // console.info(idUser);
  //   // console.info(loginResult._tokenResponse.displayName, 'namaku ini');
  //   // console.info(loginResult._tokenResponse.email, 'emailku ini');
  //   // console.info(loginResult._tokenResponse, 'dataku ini');


  //   await dispatch(loginWithGoogle(loginResult._tokenResponse));
  //   // alert('Login Success');
  //   router.push('/home');
  // };

  const loginSSO = async () => {
    console.log("wawan biasa aja")

    try {
      const auth = getAuth(firebase);
      const provider = new GoogleAuthProvider();
      const loginResult = await signInWithPopup(auth, provider);

      // console.info(loginResult, 'hasil login dengan google');
      const idUserGoogle = loginResult._tokenResponse.localId;
      const emailUserGoogle = loginResult._tokenResponse.email;
      const fullNameUserGoogle = loginResult._tokenResponse.fullName;
      
      // > dapatin data user login google
      // console.info(loginResult, '-> hasil login result');
      // console.info(idUserGoogle, emailUserGoogle, fullNameUserGoogle, '=> dapat ni');

      const dataGoogle = {
        idUserGoogle,
        emailUserGoogle,
        fullNameUserGoogle
      }

      let response = await axios.post('/api/auth/login-google', dataGoogle);
      let dataUserLoginGoogle = response.data;

      dispatch(newLoginGoogle(dataUserLoginGoogle));

      let tokenUser = dataUserLoginGoogle.data.id;
      let usernameLogin = dataUserLoginGoogle.data.username;
      let userTotalScoreLogin = dataUserLoginGoogle.data.total_score;

      const jsonUserData = {
        usernameLogin,
        userTotalScoreLogin
      }
      localStorage.setItem("token", tokenUser);
      localStorage.setItem("dataUser", JSON.stringify(jsonUserData));

      router.push('/home');
    } catch (error) {
      dispatch(failedLogin(error));
      dispatch(isLoading(false));
      // console.log(error);
    } finally {
      dispatch(isLoading(true));
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarAuthComponent />
      <section className="h-100 bg-dark">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card card-registration my-4">
                <div className="row g-0">
                  <div className="col-xl-6 d-none d-xl-block">
                    <img
                      src="https://images.unsplash.com/photo-1542549237432-a176cb9d5e5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=814&q=80"
                      alt="Sample photo"
                      className="img-fluid"
                      style={{
                        borderTopLeftRadius: ".25rem",
                        borderBottomLeftRadius: ".25rem"
                      }}
                    />
                  </div>
                  <div className="col-xl-6 justify-content-center align-items-center">
                    <div className="card-body p-md-5 text-black">
                      <h3 className="mb-5 text-uppercase text-center">
                        Login
                      </h3>
                      {
                        loginUserRejected  ? (
                          <div className="alert alert-danger" role="alert">
                            <p>Check Again Email or Password</p>
                          </div>
                        ) : ""
                      }
                      <form onSubmit={(e) => handleLogin(e)}> 
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Email Address
                          </label>
                          <input
                            name="email"
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Your Email Address"
                            onChange={ (e) => setEmail(e.target.value) }
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                          <input
                            name="password"
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Your Password"
                            onChange={ (e) => setPassword(e.target.value) }
                          />
                        </div>
                        <div className="d-grid gap-2 mt-2">
                          <button type="submit" className="btn btn-primary">
                            {
                              loginUserLoading ? 'Login on Process....' : 'Login'
                            }
                          </button>
                          <Link
                            href={ "/register" }
                            className="btn btn-success"
                            target="__blank"
                          >
                            Dont Have Account? Signup Here
                          </Link>
                        </div>
                        <div className="or my-3 text-center">
                          <p style={{ fontSize: "14px", fontWeight: "lighter" }}>Or</p>
                        </div>
                        <div className="d-grid gap-2 mt-3">
                          <p className="btn btn-secondary" onClick={ loginSSO }>
                            {
                              loginWithGooleLoading ? 'Login on Process' : 'Login Using Google!'
                            }
                          </p>
                        </div>
                        <div className="d-grid gap-2 my-3">
                          <hr />
                          <Link
                            href={ "/reset-password" }
                            className="text-decoration-none text-center text-black"
                          >
                            Forgot the Password? Press Here
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
