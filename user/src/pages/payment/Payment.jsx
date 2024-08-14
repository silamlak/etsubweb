import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { VscReferences } from "react-icons/vsc";
import { FaRegUserCircle, FaRegImage } from "react-icons/fa";
import { MdOutlinePhone } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../../firebase/firebase";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { order } from "../../features/payment/paymentApi";
import { paymentMethods, paySchema } from "./paymentutils";
import SEO from "../../components/SEO";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const states = location.state;
  const [selectedMethod, setSelectedMethod] = useState("telebirr");
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    if (!states) return navigate('/product', { replace: true });
  }, [states]);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(paySchema),
    defaultValues: {
      image: null,
      fullName: "",
      referenceNo: "",
      phoneNo: "",
    },
  });

  const mutation = useMutation({
    mutationFn: order,
    onSuccess: (data) => {
      toast.success(data?.msg);
      navigate('/product', { replace: true });
    },
    onError: (err) => {
      toast.error(err?.data?.msg)
    },
  });

  const onSubmit = async (data) => {
    try {
      const images = data.image;
      setUploading(true);
      const storage = getStorage(app);
      const storageRef = ref(storage, "images/" + images.name);
      await uploadBytes(storageRef, images);
      const downloadURL = await getDownloadURL(storageRef);
      setUploading(false);

      const forms = {
        ...data,
        image: downloadURL,
        serviceId: states.serviceId,
      };
      const state = {
        paymentMethod: selectedMethod,
        deliveryAddress: {
          phone_no: data.phoneNo,
        },
        ...states,
      };

      const payload = {
        state,
        forms,
      };
      console.log(payload);
      mutation.mutate(payload);
    } catch (err) {
      console.log(err);
      toast.error("error occured");
      setUploading(false);
    }
  };

  const selectedPaymentMethod = paymentMethods.find(
    (method) => method.id === selectedMethod
  );

  return (
    <div className="max-w-4xl mx-auto p-4 flex max-md:flex-col justify-center mt-20 text-slate-800 dark:text-slate-100">
      <SEO
        title="Payment - Etsub Printing and Advertising"
        description="Complete your payment securely with Etsub Printing and Advertising. Review your order details and finalize your purchase."
        keywords="payment, Etsub Printing and Advertising, secure payment, checkout"
        hr="https://etsubprinting.onrender.com/payment"
        image="/logo.png"
      />
      <div className="w-1/3 max-md:w-full max-md:mb-4 flex flex-col space-y-4 mr-4 max-md:mr-0">
        <h1 className="text-2xl font-semibold">Payment Methods</h1>
        <div className="flex md:flex-col gap-4 overflow-x-auto">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full px-4 py-2 flex items-center justify-center space-x-2 rounded-md border ${
                selectedMethod === method.id
                  ? "bg-blue-500 text-white"
                  : "bg-slate-100 dark:bg-slate-700 text-blue-500"
              }`}
            >
              <img
                src={method.image}
                alt={method.name}
                className="w-full max-sm:h-10 h-16"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="w p-6 rounded shadow-lg bg-slate-50 dark:bg-slate-800">
        <div className="mb-4 flex flex-col items-center w-full">
          <h2 className="text-xl font-semibold">
            {selectedPaymentMethod.name} Payment Details
          </h2>
          <p>Acc. {selectedPaymentMethod.acc}</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Screenshot Image
            </label>
            <div className="relative mt-1">
              <FaRegImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setValue("image", e.target.files[0]);
                    }}
                    className="block w-full pl-10 pr-3 py-2 border text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-700 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                )}
              />
            </div>
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <div className="relative mt-1">
              <FaRegUserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="block w-full pl-10 pr-3 py-2 border text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-700 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                )}
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Reference No
            </label>
            <div className="relative mt-1">
              <VscReferences className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Controller
                name="referenceNo"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="block w-full pl-10 pr-3 py-2 border text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-700 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                )}
              />
            </div>
            {errors.referenceNo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.referenceNo.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Phone No
            </label>
            <div className="relative mt-1">
              <MdOutlinePhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Controller
                name="phoneNo"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="block w-full pl-10 pr-3 py-2 border text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-700 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                )}
              />
            </div>
            {errors.phoneNo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNo.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={uploading || mutation.isPending}
            className={`${
              uploading || mutation.isPending ? "cursor-wait" : "cursor-pointer"
            }  w-full flex gap-2 items-center justify-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md`}
          >
            <p>Pay</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
