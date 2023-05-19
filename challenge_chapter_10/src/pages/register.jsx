import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/actions/auth.action";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import NavbarAuthComponent from "@/components/NavbarAuthComponent";

const Register = () => {
  // > state
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [biodata, setBiodata] = useState('');
  const [city, setCity] = useState('');
  const [socialMedia, setSocialMedia] = useState('');

  const dataUser = {
    email: email,
    username: username,
    password: password,
    biodata: biodata,
    city: city,
    total_score: 0,
    socialMedia: socialMedia
  };

  // > hooks untuk cek user sudah login atau belum
  let i = 0;
  useEffect(() => {
    if (i === 0) {
      const checkAccessToken = () => {
        if (localStorage.getItem('token')) {
          router.push('/');
        }
      };
      checkAccessToken();
      i++;
    }
  }, [i]);

  // > dispatch
  const dispatch = useDispatch();
  // > selecttor
  const {
    registerUserLoading
  } = useSelector((state) => state.authReducer);

  // > router
  const router = useRouter();

  const handleRegister = async (event) => {
    event.preventDefault();

    // > cek inputan user
    // > Cek inputan user
    if (!email || !username || !password || !biodata || !city || !socialMedia) {
      return alert("Check Again Your Register Form!");
    }
    
    await dispatch(registerUser(dataUser));

    setEmail('');
    setUsername('');
    setPassword('');
    setBiodata('');
    setCity('');
    setSocialMedia('');

    alert('Register Success');

    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarAuthComponent />
      <section className="h-100 bg-dark mt-3">
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
                        Register New User
                      </h3>
                      <form onSubmit={ handleRegister }>
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
                            value={ email }
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="username" className="form-label">
                            Username
                          </label>
                          <input
                            name="username"
                            type="username"
                            className="form-control"
                            id="username"
                            placeholder="Your Username"
                            value={ username }
                            onChange={(e) => setUsername(e.target.value)}
                            required
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
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="biodata" className="form-label">
                            Biodata
                          </label>
                          <textarea
                            name="biodata"
                            className="form-control"
                            id="biodata"
                            rows="3"
                            placeholder="Your Biodata"
                            required
                            value={ biodata }
                            onChange={(e) => setBiodata(e.target.value)}
                          ></textarea>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="city" className="form-label">
                            City
                          </label>
                          <input
                            name="city"
                            type="city"
                            className="form-control"
                            id="city"
                            placeholder="Your Hometown"
                            value={ city }
                            onChange={(e) => setCity(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="social_media" className="form-label">
                            Instagram URL
                          </label>
                          <input
                            name="social_media"
                            type="social_media"
                            className="form-control"
                            id="social_media"
                            placeholder="Your Instagram URL"
                            value={ socialMedia }
                            onChange={(e) => setSocialMedia(e.target.value)}
                            required
                          />
                        </div>
                        <div className="d-grid gap-2 mt-2">
                          <button type="submit" className="btn btn-primary">
                            {
                              registerUserLoading ? 'Register on Process...' : 'Register'
                            }
                          </button>
                          <Link
                            href={ "/login" }
                            className="btn btn-success"
                            target="__blank"
                          >
                            Have Account? Login Here
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

export default Register;
