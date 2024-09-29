import { useEffect } from "react";
import { useAuth } from "../contexts/auth.context";
import { useNavigate } from "react-router-dom";

function SignOut() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/");
  }, []);
}

export default SignOut;
