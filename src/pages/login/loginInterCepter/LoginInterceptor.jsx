import { Navigate, useLocation } from "react-router-dom";

const LoginInterceptor = ({ children }) => {
  const isAuthenticated = !!sessionStorage.getItem("Logined"); // 로그인 여부 확인
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default LoginInterceptor;