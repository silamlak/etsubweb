import * as Yup from "yup";

import cbe from "../../assets/paymentimg/cbe.webp";
import tele from "../../assets/paymentimg/Telebirr.webp";
import abi from "../../assets/paymentimg/abisinia.webp";

export const paymentMethods = [
  { id: "telebirr", name: "Telebirr", image: tele, acc: "0960909192" },
  { id: "cbe", name: "CBE", image: cbe, acc: "1000232342232" },
  { id: "abisinia", name: "Abisinia", image: abi, acc: "872367263" },
];

export const paySchema = Yup.object().shape({
  image: Yup.mixed().required("Screenshot image is required"),
  fullName: Yup.string().required("Full name is required"),
  referenceNo: Yup.string().required("Reference number is required"),
  phoneNo: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be 10 digits"),
});
