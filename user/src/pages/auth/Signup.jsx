import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../utils/authentication";
import { useMutation } from "@tanstack/react-query";
import { signupApi } from "../../features/auth/authApi";
import toast from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa6";
import {  FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaUserFriends,
  FaPhoneAlt,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import Loader from "../../components/Loader";
import SEO from "../../components/SEO";

const Signup = () => {
  const navigate = useNavigate();
  const [eyeOpen, setEyeOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const mutation = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      navigate(
        `/otp`,
        { state: data },
        {
          replace: true,
        }
      );
      reset();
    },
    onError: (err) => {
      console.log(err)
      toast.error(err?.data?.msg);
    },
  });

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      ethPhone: data.ethPhone.startsWith("9")
        ? `+251${data.ethPhone}`
        : data.ethPhone,
    };
    console.log("Form data:", formattedData);
    mutation.mutate(formattedData);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900">
      <SEO
        title="Sign Up - Etsub Printing and Advertising"
        description="Create a new account with Etsub Printing and Advertising. Sign up to enjoy our premium printing services and manage your orders."
        keywords="sign up, register, Etsub Printing and Advertising, new account"
        hr="https://etsubprinting.onrender.com/sign-up"
        image="/logo.png"
      />
      <div className="flex items-center justify-center min-h-screen overflow-y-auto p-6 max-sm:p-2 text-slate-800 dark:text-slate-100">
        <div className="w-full bg-white dark:bg-slate-800 max-w-md p-8 max-sm:p-6 space-y-6 rounded-xl overflow-hidden shadow-md">
          <div>
            <h2 className="text-2xl font-bold text-center">Sign Up</h2>
            <h2 className="font-bol text-center">All Fields are Required</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium">
                First Name
              </label>
              <div className="relative mt-1">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  {...register("first_name")}
                  className={`block w-full pl-10 pr-3 py-2 border text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-700 ${
                    errors.first_name ? "border-red-500" : "border-gray-300"
                  } rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
              </div>
              {errors.first_name && (
                <div className="mt-2 text-sm text-red-600">
                  {errors.first_name.message}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="father_name"
                className="block text-sm font-medium"
              >
                Father Name
              </label>
              <div className="relative mt-1">
                <FaUserFriends className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="father_name"
                  name="father_name"
                  type="text"
                  {...register("father_name")}
                  className={`block w-full pl-10 pr-3 py-2 border text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-700 ${
                    errors.father_name ? "border-red-500" : "border-gray-300"
                  } rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
              </div>
              {errors.father_name && (
                <div className="mt-2 text-sm text-red-600">
                  {errors.father_name.message}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="ethPhone" className="block text-sm font-medium">
                Ethiopian Phone
              </label>
              <div className="relative mt-1">
                <FaPhoneAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="ethPhone"
                  name="ethPhone"
                  type="text"
                  {...register("ethPhone")}
                  className={`block w-full pl-10 pr-3 py-2 border text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-700 ${
                    errors.ethPhone ? "border-red-500" : "border-gray-300"
                  } rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
              </div>
              {errors.ethPhone && (
                <div className="mt-2 text-sm text-red-600">
                  {errors.ethPhone.message}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
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
              <label htmlFor="password" className="block text-sm font-medium">
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
              <div className="relative flex gap-2 mt-1">
                <input
                  id="agree"
                  type="checkbox"
                  {...register("agree")}
                  className={`border text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-700 ${
                    errors.agree ? "border-red-500" : "border-gray-300"
                  } rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                <label htmlFor="agree" className="ml-2 text-sm">
                  I agree to the terms and conditions
                </label>
              </div>
              {errors.agree && (
                <div className="mt-2 text-sm text-red-600">
                  {errors.agree.message}
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full flex gap-2 items-center justify-center px-4 py-2 text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <p> Sign Up</p>
                {mutation.isPending && !mutation.isError && <Loader s={12} />}
              </button>
            </div>
            <div>
              <p className="w-full flex justify-end gap-1 text-right text-sm -mt-2">
                Have an Account{" "}
                {!mutation.isPending && !mutation.isError && (
                  <Link to="/sign-in" className="text-blue-600">
                    Sign In
                  </Link>
                )}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
