import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmApi } from "../../features/auth/authApi";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import OTPInput from "./OTPInput"; 
import SEO from "../../components/SEO";

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const [confirmationCode, setConfirmationCode] = useState("");
  console.log(state);

  useEffect(() => {
    if (!state) {
      navigate(-1, { replace: true });
    }
  }, [state, navigate]);

  const mutation = useMutation({
    mutationFn: confirmApi,
    onSuccess: (data) => {
      toast.success(data?.msg);
      navigate(`/sign-in`, {
        replace: true,
      });
    },
    onError: (err) => {
      toast.error(err?.data?.msg);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: state.email,
      otp: confirmationCode,
    };
    mutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 h-screen">
      <SEO
        title="OTP Verification - Etsub Printing and Advertising"
        description="Verify your OTP to complete the sign-up or password reset process on Etsub Printing and Advertising."
        keywords="OTP verification, Etsub Printing and Advertising, account verification"
        hr="https://etsubprinting.onrender.com/otp"
        image="/logo.png"
      />
      <div className="mx-auto p-4 bg-white rounded shadow dark:bg-slate-800">
        <h1 className="text-xl font-bold text-center">Confirmation</h1>
        <p className="mt-2 text-center">
          A confirmation code has been sent to <strong>{state?.email}</strong>.
        </p>
        <p className="mt-2 text-center">
          Please check your inbox (and spam/junk folder) for further
          instructions to complete your registration.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col justify-cente"
        >
          <label
            htmlFor="confirmationCode"
            className="block text-sm font-medium text-center"
          >
            Enter the 6-digit confirmation code
          </label>
          <div className="w-full mb-4 flex gap-2 justify-center mt-2">
            <OTPInput
              length={6}
              onComplete={(code) => setConfirmationCode(code)}
            />
            {confirmationCode.length === 6 && (
              <button
                type="submit"
                disabled={mutation.isLoading}
                className="flex justify-center items-center gap-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <p>Confirm</p>
                {mutation.isPending && !mutation.isError && <Loader s={12} />}
              </button>
            )}
          </div>
          {mutation.isError && (
            <p className="text-red-500 mt-2">
              {mutation.error?.data?.msg || "An error occurred"}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ConfirmationPage;
