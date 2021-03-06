import React, { useEffect } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";

const Login = () => {
  let signInErrorMessage;
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //User Login or not
  const [existUser, existLoading, existError] = useAuthState(auth);

  // Email & password login
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  // Social Login google
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  const [token] = useToken(user || googleUser || existUser);

  useEffect(() => {
    if (user || googleUser || existUser) {
      navigate(from, { replace: true });
    }
  }, [user, googleUser, existUser, from, navigate]);

  //loading for normal user, loding for google user , loding for if user signed in then navigate to home page
  if (loading || googleLoading || existLoading) {
    return <Loading></Loading>;
  }

  if (error || googleError || existError) {
    signInErrorMessage = (
      <p className="font-bold text-red-500">
        {error?.message || googleError?.message || existError?.message}
      </p>
    );
  }

  // if (user || googleUser || existUser) {
  //   navigate(from, { replace: true });
  // }

  if (token) {
    navigate("/appointment");
  }

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full max-w-xs"
                {...register("email", {
                  required: { value: true, message: "Email is Required" },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a valid Email",
                  },
                })}
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-700">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-700">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>

            {/* password */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Your password"
                className="input input-bordered w-full max-w-xs"
                {...register("password", {
                  required: { value: true, message: "Password is Required" },
                  minLength: {
                    value: 1,
                    message: "Password length must be 6 character or longer",
                  },
                })}
              />

              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-700">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-700">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            <p className="text-left mb-2">
              <Link className="text-primary" to="/resetpassword">
                Forget Password
              </Link>
            </p>
            {signInErrorMessage}
            <input
              type="submit"
              value="Login"
              className="btn w-full text-white "
            />
          </form>
          <p>
            New to Doctos portal?{" "}
            <Link className="text-primary" to="/signup">
              Create New Account
            </Link>{" "}
          </p>

          <div className="divider">OR</div>
          <button
            className="btn btn-outline "
            onClick={() => signInWithGoogle()}
          >
            Countinue With Google{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
