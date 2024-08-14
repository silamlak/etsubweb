import * as yup from "yup";

export const schema = yup.object().shape({
  quantity: yup
    .number()
    .min(1, "Quantity must be at least 1")
    .required("Quantity is required"),
  description: yup.string().required("description is required"),
  notes: yup.string().optional(),
});
export const schemaBannners = yup.object().shape({
  size1: yup
    .string()
    .matches(/^\d{0,2}$/, "Size must be numeric and up to 2 digits")
    .required("Size 1 is required"),
  size2: yup
    .string()
    .matches(/^\d{0,2}$/, "Size must be numeric and up to 2 digits")
    .required("Size 2 is required"),
  quantity: yup
    .number()
    .min(1, "Quantity must be at least 1")
    .required("Quantity is required"),
  description: yup.string().required("description is required"),
  notes: yup.string().optional(),
});
