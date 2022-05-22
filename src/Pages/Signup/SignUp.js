import React from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import useToken from "../../hooks/useToken";
import Loading from "../Shared/Loading";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  let signUpErrorMessage;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //User Login or not
  const [existUser, existLoading, existError] = useAuthState(auth);

  // Email & password sign up
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  // Social Login google
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  const [token] = useToken(user || googleUser);

  //loading for normal user, loding for google user , loding for if user signed in then navigate to home page
  if (loading || googleLoading || existLoading || updating) {
    return <Loading></Loading>;
  }

  if (error || googleError || existError || updateError) {
    signUpErrorMessage = (
      <p className="font-bold text-red-500">
        {error?.message ||
          googleError?.message ||
          existError?.message ||
          updateError?.message}
      </p>
    );
  }

  // if (user || googleUser || existUser) {
  //   navigate(from, { replace: true });
  // }

  if (token) {
    navigate("/appointment");
  }

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    navigate("/appointment");
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full max-w-xs"
                {...register("name", {
                  required: { value: true, message: "Name is Required" },
                  //   pattern: {
                  //     value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  //     message: "Provide a valid Email",
                  //   },
                })}
              />
              <label className="label">
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-red-700">
                    {errors.name.message}
                  </span>
                )}
                {/* {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-700">
                    {errors.email.message}
                  </span>
                )} */}
              </label>
            </div>

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
            {signUpErrorMessage}
            <input
              type="submit"
              value="Sign Up"
              className="btn w-full text-white "
            />
          </form>
          <p>
            Exist user{" "}
            <Link className="text-primary" to="/login">
              Login
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

export default SignUp;
