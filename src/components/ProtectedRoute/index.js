import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../../hooks/useSession";

export const ProtectedRoute = () => {
  const [showOutlet, setShowOutlet] = useState(true);
  const { getUser } = useSession();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    const user = getUser();
    if (session) {
      if (user === null) {
        setShowOutlet(false);
      } else {
        setShowOutlet(true);
      }
    } else {
      setShowOutlet(false);
    }
  }, [getUser]);

  return showOutlet ? <Outlet /> : <Navigate to="/login" />;
};
