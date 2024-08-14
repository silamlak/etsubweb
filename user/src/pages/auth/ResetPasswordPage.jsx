// ResetPasswordPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordApi } from "../../features/auth/authApi";
import Loader from "../../components/Loader";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import SEO from "../../components/SEO";

const ResetPasswordPage = () => {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [eyeOpen, setEyeOpen] = useState(false);
  const navigate = useNavigate();

      const mutation = useMutation({
        mutationFn: resetPasswordApi,
        onSuccess: (data) => {
          toast.success("Password Reset");
          navigate("/sign-in", { replace: true });
        },
        onError: (err) => {
          toast.error(err?.data?.msg);
        },
      });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      password: newPassword,
      resetToken: code
    };
    mutation.mutate(data)
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <SEO
        title="Reset Password - Etsub Printing and Advertising"
        description="Set a new password for your account with Etsub Printing and Advertising. Follow the instructions to secure your account."
        keywords="reset password, Etsub Printing and Advertising, change password"
        hr="https://etsubprinting.onrender.com/reset/password"
        image="/logo.png"
      />
      <div className="mx-auto p-10 bg-white dark:bg-slate-800 rounded shadow">
        <h1 className="text-xl font-bold">Reset Password</h1>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="code" className="block text-sm font-medium">
              Confirmation Code
            </label>
            <div className="relative mt-1">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="code"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-700 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium">
              New Password
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
                type={eyeOpen ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-700 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex gap-3 justify-center items-center px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            <p>Reset Password</p>
            {mutation.isPending && !mutation.isError && <Loader s={12} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
