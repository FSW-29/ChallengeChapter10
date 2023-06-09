import Head from "next/head";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import firebase from "@/services/firebase";
import { useRouter } from "next/router";
import { useState } from "react";
import NavbarAuthComponent from "@/components/NavbarAuthComponent";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');

  const router = useRouter();

  const auth = getAuth(firebase);

  const handleResetPassword = async (event) => {
    try {
      event.preventDefault();

      const resetPassword = await sendPasswordResetEmail(auth, email, {
        url: "http://localhost:3000/reset-password-form", // URL halaman reset password buatanmu
        handleCodeInApp: true,
      });
      // console.info(resetPassword, '=> hasil reset password page');

      alert('Reset Password Email has been Send to Your Email!');
      router.push('/login');
    } catch (error) {
      alert(`${error.message}`);
    }
  };

  return (
    <>
      <Head>
        <title>Reset Password</title>
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
                        Reset Password
                      </h3>
                      <form onSubmit={ handleResetPassword }>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">Email Address</label>
                          <input name="email" type="email" className="form-control" id="email" placeholder="Your Email Address" onChange={ (e) => setEmail(e.target.value) }  />
                        </div>
                        <div className="d-grid gap-2 mt-2">
                          <button type="submit" className="btn btn-primary">Send Email Reset Password</button>
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

export default ResetPasswordPage;
