import { useSelector } from "react-redux";
import { KYCStatus } from "./KYCStatus/KYCStatus";
import { Dashboard } from "./Dashboard/Dashboard";
import { UpdateKYC } from "./UpdateKYC/UpdateKYC";

export const Home = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      {user.role === "user" &&
        (user.KYCStatus === "pending" || user.KYCStatus === "approved") && (
          <KYCStatus />
        )}
      {user.role === "user" &&
        (user.KYCStatus === "unInitiated" || user.KYCStatus === "rejected") && (
          <UpdateKYC />
        )}
      {user.role === "admin" && <Dashboard />}
    </>
  );
};
