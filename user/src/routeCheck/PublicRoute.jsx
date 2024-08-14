import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pageCheckFun } from "../features/CheckPage/PageCheckApi";

const ProtectedRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
    const { isLoading, error } = useQuery({
      queryKey: ["check"],
      queryFn: pageCheckFun,
    });
  useEffect(() => {
  if (isAuth) {
    return navigate("/", { replace: true });
  }
  }, [navigate, isAuth])
  return children
};

export default ProtectedRoute;
