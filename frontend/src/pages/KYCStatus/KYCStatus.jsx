import { useSelector } from "react-redux";
import CardCenter from "../../components/CardCenter/CardCenter";
import styles from "./KYCStatus.module.css";
import { useEffect, useState } from "react";
import { getKYCStatus } from "../../api/kyc.services";
import { Bounce, toast } from "react-toastify";
import { LogoutBtn } from "../../components/LogoutBtn/LogoutBtn";
import moment from "moment-timezone";

export const KYCStatus = () => {
  const { name } = useSelector((state) => state.auth.user);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await getKYCStatus();
        setStatus(response.data);
        setLoading(false);
      } catch (error) {
        toast("Error fetching KYC status", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
    fetchStatus();
  }, []);

  return (
    <CardCenter>
      <h1 className={styles.header}>Hi {name.split(" ")[0]}</h1>

      {loading ? (
        <div className={styles.kycStatus}>
          <div className={styles.title}>Loading...</div>
        </div>
      ) : (
        <div className={styles.kycStatus}>
          <div className={styles.title}>Your KYC Status</div>

          <div className={styles.timeline}>
            {status &&
              status.timeline?.map((item, index) => (
                <div
                  key={item._id}
                  className={`${styles.timelineItem} ${styles.completed}`}
                >
                  <div className={styles.content}>
                    <div className={styles.date}>
                      {moment(item.time)
                        .tz("Asia/Dubai")
                        .format("DD MMM YYYY hh:mm A")}
                    </div>
                    <div className={styles.remark}>{item.remarks}</div>
                    {index === 0 && (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={status.file.url}
                      >
                        View Submitted Document
                      </a>
                    )}
                  </div>
                </div>
              ))}
          </div>
          {status && status.status === "approved" && (
            <div className={styles.statusMessage}>
              Your KYC has been completed successfully <br />
              <strong> Your account will be activated very soon</strong>
            </div>
          )}
        </div>
      )}
      <LogoutBtn />
    </CardCenter>
  );
};
