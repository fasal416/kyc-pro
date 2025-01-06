import Button from "react-bootstrap/esm/Button";
import styles from "./Dashboard.module.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  faClock,
  faFaceFrown,
  faFaceSmile,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { InfoTile } from "../../components/InfoTile/InforTile";
import { useEffect, useState } from "react";
import { getAllUserDetails, updateKYCStatus } from "../../api/user.services";
import { Bounce, toast } from "react-toastify";
import moment from "moment-timezone";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalData, setModalData] = useState({
    kycId: null,
    status: "",
    remarks: "",
  });

  useEffect(() => {
    try {
      async function fetchDetails() {
        const response = await getAllUserDetails();
        setData(response.data);
      }
      fetchDetails();
    } catch (error) {
      toast("Error fetching User Details", {
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
  }, []);

  const handleShowModal = (kycId, status) => {
    setModalData({ kycId, status, remarks: "" });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleSubmit = async () => {
    try {
      await updateKYCStatus(
        modalData.kycId,
        modalData.status,
        modalData.remarks
      );
      toast.success(`KYC ${modalData.status} successfully`);
      setShowModal(false);

      const updatedData = data.users.map((user) => {
        if (user._id === modalData.userId) {
          return { ...user, KYCStatus: modalData.status };
        }
        return user;
      });
      setData({ ...data, users: updatedData });
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid={true}>
          <Navbar.Brand href="#home">KYC Pro</Navbar.Brand>
          <Button onClick={handleLogout} variant="danger">
            Logout
          </Button>
        </Container>
      </Navbar>
      {data ? (
        <>
          <Container className={styles.tiles} fluid={true}>
            <Row>
              <Col md="6" lg="3">
                <InfoTile
                  bg="#2e5077"
                  title="Total Users"
                  value={data.totalUsers}
                  icon={faUser}
                />
              </Col>
              <Col md="6" lg="3">
                <InfoTile
                  bg="#2e5077"
                  title="Pending"
                  value={data.pending}
                  icon={faClock}
                />
              </Col>
              <Col md="6" lg="3">
                <InfoTile
                  bg="#2e5077"
                  title="Approved"
                  value={data.approved}
                  icon={faFaceSmile}
                />
              </Col>
              <Col md="6" lg="3">
                <InfoTile
                  bg="#2e5077"
                  title="Rejected"
                  value={data.rejected}
                  icon={faFaceFrown}
                />
              </Col>
            </Row>
          </Container>
          <Container fluid={true} className={styles.users}>
            <h3 className={styles.header}>User Status</h3>
            {data.users.map((item) => (
              <div key={item._id} className={styles.userItem}>
                <div className={styles.details}>
                  <span className={styles.time}>
                    {moment(item.kyc?.createdAt || item.createdAt)
                      .tz("Asia/Dubai")
                      .format("DD-MM-YYYY hh:mm A")}
                  </span>
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.email}>{item.email}</span>
                </div>
                {!item.kyc && (
                  <div className={styles.noKyc}>KYC not Submitted</div>
                )}
                {item.kyc && item.KYCStatus === "approved" && (
                  <div className={styles.tools}>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={item.kyc.file.url}
                      className="btn btn-info"
                      variant="info"
                    >
                      View
                    </a>
                    <div className={styles.approvedBadge}>Approved</div>
                  </div>
                )}
                {item.kyc && item.KYCStatus !== "approved" && (
                  <div className={styles.tools}>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={item.kyc.file.url}
                      className="btn btn-info"
                      variant="info"
                    >
                      View
                    </a>
                    <Button
                      variant="success"
                      onClick={() => handleShowModal(item.kyc._id, "approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => handleShowModal(item.kyc._id, "rejected")}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </Container>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{modalData.status} User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Remarks</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={modalData.remarks}
                    onChange={(e) =>
                      setModalData({ ...modalData, remarks: e.target.value })
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <div>Loading Data...</div>
      )}
    </>
  );
};
