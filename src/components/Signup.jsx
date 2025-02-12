import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { RxAvatar } from "react-icons/rx";
import uploadImage from "../utils/utils";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
function Signup() {
  const location = useLocation();
  const { googleLogin, user, createUser, updateUserProfile, setUser } =
    useAuth();
  const navigate = useNavigate();

  // location
  const from = location.state?.from;

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    console.log(data);

    try {
      const image_url = await uploadImage(data.image[0]);

      // console.log(name, email, password, photoURL);

      const result = await createUser(email, password);
      await updateUserProfile(name, image_url);
      await setUser({
        ...user,
        photoURL: image_url,
        displayName: name,
        email: data.email,
      });
      if (result.user) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Created account successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${err?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  //   google login
  const handleGoogleLogin = () => {
    googleLogin().then((res) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(res.user);
      navigate(from || "/");
    });
  };

  // password toggle
  const [showPass, setShowPass] = useState(false);

  return (
    <div>
      <Helmet>
        <title>Ama | Sign Up</title>
      </Helmet>
      <div className="flex h-screen  w-full ">
        <div className="bg-[#1EB7D8] h-full lg:flex md:hidden hidden relative w-[28%] ">
          <img
            className="absolute  top-0 left-0"
            src="https://i.postimg.cc/W3cg3VZ6/top-ornamate.png"
            alt=""
          />
          <img
            className="absolute w-52 left-4 bottom-10"
            src="https://i.postimg.cc/65MrhDst/door.png"
            alt=""
          />
          <img
            className="absolute w-32  right-0 bottom-24"
            src="https://i.postimg.cc/k5bWqG2g/bottom-ornamate.png"
            alt=""
          />
        </div>
        <div className="flex-1 w-full text-center flex justify-center items-center ">
          <section className="bg-white w-full dark:bg-gray-900">
            <div className="container flex items-center justify-center  px-6 mx-auto">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md"
              >
                <h1 className="mt-3 text-2xl font-semibold text-gray-800  sm:text-3xl dark:text-white">
                  Create an Account
                </h1>

                <div className="relative flex  items-center mt-8">
                  <span className="absolute">
                    <RxAvatar className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
                  </span>

                  <input
                    type="name"
                    name="name"
                    {...register("name", { required: true })}
                    required
                    className="block w-full py-3 text-gray-700 bg-white border  rounded-md px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 border-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Full Name"
                  />
                </div>
                <div className="relative flex  items-center mt-4">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>

                  <input
                    type="email"
                    name="email"
                    {...register("email", { required: true })}
                    required
                    className="block w-full py-3 text-gray-700 bg-white  rounded-md px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 border-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Email address"
                  />
                </div>
                <div className=" mt-4 max-w-xs">
                  <input
                    id="example1"
                    type="file"
                    name="image"
                    accept="image/*"
                    {...register("image", { required: true })}
                    className="mt-2 block rounded-l-md w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                  />
                </div>

                <div className="relative flex items-center mt-4">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </span>

                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    {...register("password", {
                      required: true,
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    })}
                    required
                    className="block w-full px-10 py-3 text-gray-700 bg-white rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none border-gray-300 focus:ring focus:ring-opacity-40"
                    placeholder="Password"
                  />

                  <span
                    className="absolute right-4 text-gray-500 cursor-pointer "
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? (
                      <IoMdEye size={20} />
                    ) : (
                      <IoMdEyeOff size={20} />
                    )}
                  </span>
                </div>
                {errors.password?.type === "pattern" && (
                  <p
                    className="text-xs text-left px-2 pt-2 text-red-500"
                    role="alert"
                  >
                    Password must have minimum 6 characters, at least one
                    uppercase and one lowercase letter, one number and one
                    special character
                  </p>
                )}

                <div className="mt-4">
                  <button className="w-fit px-6 py-3 text-sm font-semibold tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#1EB7D8] rounded-md hover:bg-[#1eb6d8b7] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ">
                    Sign Up
                  </button>

                  <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
                    or sign in with
                  </p>
                </div>
              </form>
            </div>
            <button
              onClick={handleGoogleLogin}
              className="flex mx-auto items-center w-fit justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>

              <span className="mx-2">Sign in with Google</span>
            </button>
            <div className="mt-6 text-center ">
              <Link
                to={"/login"}
                href="#"
                className="text-sm text-[#1EB7D8] hover:underline dark:text-blue-400"
              >
                Already have an account? Login
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Signup;
