import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { pageCheckFun } from "../features/CheckPage/PageCheckApi";

const ProtectedRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location?.pathname
  const {isLoading, error} = useQuery({
    queryKey: ["check"],
    queryFn: pageCheckFun,
  });
  useEffect(() => {
    if (!isAuth) {
      navigate("/sign-in", { replace: true }, {state: path});
    }
  }, [isAuth, navigate, isLoading]);

  return children;
};

export default ProtectedRoute;
