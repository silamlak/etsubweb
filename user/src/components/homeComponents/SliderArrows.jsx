import React from "react";
import {
  IoArrowForwardCircleOutline,
  IoArrowBackCircleOutline,
} from "react-icons/io5";

export function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="dark:text-gray-100 cursor-pointer text-slate-700 bg-slate-100 rounded-full dark:bg-slate-900 p-2 absolute z-40 top-1/2 transform -translate-y-1/2 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
      onClick={onClick}
    >
      <IoArrowForwardCircleOutline size={20} />
    </div>
  );
}

export function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="dark:text-gray-100 cursor-pointer text-slate-700 bg-slate-100  dark:bg-slate-900 p-2 rounded-full absolute z-40 top-1/2 transform -translate-y-1/2 left-3 opacity-0 group-hover:opacity-100 transition-opacity"
      onClick={onClick}
    >
      <IoArrowBackCircleOutline size={20} />
    </div>
  );
}
