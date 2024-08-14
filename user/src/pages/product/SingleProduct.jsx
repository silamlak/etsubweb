import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getSingleProductFun } from "../../features/product/productApi";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, schemaBannners } from "../../utils/purchaseValidation";
import Loader from "../../components/Loader";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";

const SingleProduct = () => {
  const location = useLocation()
const { productName } = useParams();
  const id = location.state
  const navigate = useNavigate()
  useEffect(() => {
    if (!id) {
      navigate('/product')
      }
  }, [id])
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product_detail", id],
    queryFn: () => getSingleProductFun(id),
    enabled: !!id,
  });
  console.log(data);
  const validationSchema =
    data?.category === "Banners" ? schemaBannners : schema;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      size1: "",
      size2: "",
      quantity: 1,
      description: "",
      notes: "",
    },
  });

  const onSubmit = (formData) => {
    let price 
    if(data?.discount){
      price = data?.discountPrice * formData.quantity;
    }else{
      price = data?.price * formData.quantity;
    }
    const singlePrice = data?.discount ? data?.discountPrice : data?.price
    const payload = {
      serviceId: id,
      name: data?.name,
      category: data?.category,
      totalPrice: price,
      price: singlePrice,
      ...formData
    };
    // console.log("Submitting", payload);
    navigate("/payment", {state: payload});
  };

  const errorMessages = Object.values(errors).map((error) => (
    <p key={error.message} className="text-red-500 text-sm mt-1">
      {error.message}
    </p>
  ));

  if (isLoading) return (
    <div className="max-w-[1600px] flex justify-center mx-auto p-4 mt-20 text-slate-800 dark:text-slate-100">
     <Loader />
    </div>
  );
  if (isError) return (
    <div className="max-w-[1600px] flex justify-center mx-auto p-4 mt-20 text-slate-800 dark:text-slate-100">
      Error loading product details.
    </div>
  );

  return (
    <div className="max-w-[1600px] mx-auto p-4 mt-20 text-slate-800 dark:text-slate-100">
      <ScrollToTop />
      <SEO
        title={`Product Detail - Etsub Printing and Advertising`}
        description={`Explore the product details at Etsub Printing and Advertising.`}
        keywords={`product details, Etsub Printing and Advertising`}
        hr={`https://etsubprinting.onrender.com/product/${productName}`}
        image="/logo.png"
      />
      <div className="flex max-w-[1600px] justify-center max-sm:items-center gap-10 items-start max-sm:flex-col">
        <div>
          <img
            src={data?.s_img}
            alt={data?.name}
            className="w-[500px] h-[400px] max-md:w-[300px] max-md:h-[300px] object-fill"
          />
        </div>
        <div className="">
          <p className="text-2xl font-semibold">{data?.name}</p>
          <div className="mt-6">
            {data?.discount ? (
              <div className="flex items-center gap-4">
                <p className="text-3xl text-red-500 font-semibold">
                  {data?.discountPrice}
                  <span className="text-sm"> ETB</span>
                </p>
                <p className="text-xl line-through text-gray-500">
                  {data?.price}
                  <span className="text-sm"> ETB</span>
                </p>
              </div>
            ) : (
              <p className="text-2xl font-semibold">
                {data?.price}
                <span className="text-sm"> ETB</span>
              </p>
            )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="flex gap-4 items-center">
              {data?.category === "Banners" && (
                <div className="flex gap-4 items-center">
                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 dark:text-gray-300">
                      Size 1
                    </label>
                    <Controller
                      name="size1"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          maxLength="2"
                          {...field}
                          className="p-2 w-10 h-10 rounded border focus:outline-none focus:border border-blue-500 bg-slate-100 dark:bg-slate-700"
                        />
                      )}
                    />
                  </div>
                  <p className="text-xl">*</p>
                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 dark:text-gray-300">
                      Size 2
                    </label>
                    <Controller
                      name="size2"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          maxLength="2"
                          {...field}
                          className="p-2 w-10 h-10 rounded border focus:outline-none focus:border border-blue-500 bg-slate-100 dark:bg-slate-700"
                        />
                      )}
                    />
                  </div>
                </div>
              )}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 dark:text-gray-300">
                  Quantity
                </label>
                <Controller
                  name="quantity"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="number"
                      min="1"
                      {...field}
                      className="p-2 w-20 h-10 rounded border focus:outline-none focus:border border-blue-500 bg-slate-100 dark:bg-slate-700"
                    />
                  )}
                />
              </div>
            </div>
            <div>
              <div className="mb-4 max-w-[300px]">
                <label className="block text-sm text-gray-600 dark:text-gray-300">
                  Description
                </label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      className="p-2 w-full max-h-[200px] rounded border focus:outline-none focus:border border-blue-500 bg-slate-100 dark:bg-slate-700"
                    />
                  )}
                />
              </div>
              <div className="mb-4 max-w-[300px]">
                <label className="block text-sm text-gray-600 dark:text-gray-300">
                  <span className="text-red-500 text-lg mr-[2px]">!</span> Note
                </label>
                <Controller
                  name="notes"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      className="p-2 w-full max-h-[100px] rounded border focus:outline-none focus:border border-blue-500 bg-slate-100 dark:bg-slate-700"
                    />
                  )}
                />
              </div>
            </div>
            <div className="mb-4">
              {errorMessages.length > 0 && (
                <div className="mb-4">{errorMessages}</div>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
