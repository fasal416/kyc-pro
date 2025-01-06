import { useSelector } from "react-redux";
import { KYCStatus } from "./KYCStatus/KYCStatus";

export const Home = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      {user.role === "user" && <KYCStatus />}
      {user.role === "admin" && <div>Admin Dashboard</div>}
    </>
  );
};
