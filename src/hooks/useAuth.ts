import { selectCurrentToken } from "@/features/auth/authSelectors";
import { logout } from "@/features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);

  const isAuthenticated = !!token;

  const logOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  return {
    token,
    isAuthenticated,
    logOut,
  };
};
