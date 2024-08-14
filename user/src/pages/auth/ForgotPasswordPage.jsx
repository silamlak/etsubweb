// ForgotPasswordPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { requestResetApi } from "../../features/auth/authApi";
import Loader from "../../components/Loader";
import { FaEnvelope } from "react-icons/fa";
import SEO from "../../components/SEO";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

    const mutation = useMutation({
      mutationFn: requestResetApi,
      onSuccess: (data) => {
        toast.success("Reset Token Sent Check Your Email");
        navigate("/reset/password", { replace: true });
      },
      onError: (err) => {
        toast.error(err?.data?.msg);
      },
    });


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email)
    mutation.mutate({email})
  };

  return (
    <div className="w-full h-screen flex justify-center p-4 items-center bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <SEO
        title="Request Password Reset - Etsub Printing and Advertising"
        description="Request a password reset for your account with Etsub Printing and Advertising. Follow the instructions to regain access."
        keywords="password reset request, Etsub Printing and Advertising, recover account"
        hr="https://etsubprinting.onrender.com/request/reset"
        image="/logo.png"
      />
      <div className="bg-white dark:bg-slate-800 rounded p-8">
        <h1 className="text-xl text-center font-bold">Forgot Password</h1>
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col justify-center"
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <div className="relative mt-1">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-700 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex gap-3 justify-center items-center px-4 py-2 bg-blue-500 text-white rounded-xl"
          >
            <p>Send Request</p>
            {mutation.isPending && !mutation.isError && <Loader s={12} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
