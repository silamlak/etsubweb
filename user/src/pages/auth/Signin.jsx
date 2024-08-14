import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinSchema } from "../../utils/authentication";
import {useMutation} from '@tanstack/react-query'
import { signinApi } from "../../features/auth/authApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login, loginUser } from "../../features/auth/authSlice";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import Loader from "../../components/Loader";
import {jwtDecode} from "jwt-decode";
import SEO from "../../components/SEO";


const Signin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [eyeOpen, setEyeOpen] = useState(false);
  const location = useLocation();
  const from = location?.state || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(signinSchema) });

  const mutation = useMutation({
    mutationFn: signinApi,
    onSuccess: (data) => {
      toast.success('successfully loggedin')
      dispatch(login(data.token));
      const decoded = jwtDecode(data.token);
      dispatch(loginUser(decoded.user));
      navigate(`${from}`, {replace: true})
      reset()
    },
    onError: (err) => {
      toast.error(err?.data?.msg)
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    mutation.mutate(data)
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <SEO
        title="Sign In - Etsub Printing and Advertising"
        description="Sign in to access your account on Etsub Printing and Advertising. Manage your orders, preferences, and more."
        keywords="sign in, login, Etsub Printing and Advertising, user account"
        hr="https://etsubprinting.onrender.com/sign-in"
        image="/logo.png"
      />
      <div className="w-full max-w-md p-8 space-y-4 rounded-xl overflow-hidden shadow-md bg-white dark:bg-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-center">Sign in</h2>
          <h2 className="font-bol text-center">All Fields are Required</h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 dark:bg-slate-800 text-slate-800"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-800 dark:text-slate-100"
            >
              Email
            </label>
            <div className="relative mt-1">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

              <input
                id="email"
                name="email"
                type="email"
                {...register("email")}
                className={`block w-full pl-10 pr-3 py-2 border text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-700 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
            </div>
            {errors.email && (
              <div className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-800 dark:text-slate-100"
            >
              Password
            </label>
            <div className="relative mt-1">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {eyeOpen && (
                <FaEyeSlash
                  onClick={() => setEyeOpen(false)}
                  className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              )}
              {!eyeOpen && (
                <FaEye
                  onClick={() => setEyeOpen(true)}
                  className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              )}
              <input
                id="password"
                name="password"
                type={eyeOpen ? "text" : "password"}
                {...register("password")}
                className={`block w-full pl-10 pr-3 py-2 border text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-700 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
            </div>
            {errors.password && (
              <div className="mt-2 text-sm text-red-600">
                {errors.password.message}
              </div>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <p>Sign In</p>
              {mutation.isPending && !mutation.isError && <Loader s={12} />}
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <p className="w-full text-sm -mt-2">
              {!mutation.isPending && !mutation.isError && (
                <Link to="/request/reset" className="text-blue-600">
                  Forgot Password
                </Link>
              )}
            </p>
            <p className="w-full flex text-sm -mt-2 text-slate-800 dark:text-slate-100">
              Don't Have an Account{" "}
              {!mutation.isPending && !mutation.isError && (
                <Link to="/sign-up" className="text-blue-600 ml-[2px]">
                  SignUp
                </Link>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
