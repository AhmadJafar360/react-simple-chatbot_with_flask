import React, { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaGithub, FaTwitter, FaFacebook, FaGoogle } from "react-icons/fa";

import server from "../server";

const LoginPages = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const LoginPages = async (e) => {
    e.prevenDefault();
    try {
      const post = await axios.post(`${server}/login`, {
        email: email,
        password: password,
      });
      const token = post.data.accessToken;
      sessionStorage.setItem("accessToken", token);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        setShow(true);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="box-login" onSubmit={LoginPages}>
        <MDBContainer fluid style={{ backgroundImage: "../../public/images/background.jpg" }}>
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol col="12">
              <MDBCard className="bg-dark text-white my-5 mx-auto" style={{ borderRadius: "1rem", maxWidth: "400px" }}>
                <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>
                  {msg === null ? (
                    ""
                  ) : (
                    <Modal show={show}>
                      <Modal.Header>
                        <Modal.Title>Sorry</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <div className="text-danger d-flex align-items-center">
                          <i className="fa-solid fa-circle-exclamation"></i>
                          <div className="ps-3">{msg}</div>
                        </div>
                      </Modal.Body>

                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  )}
                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    labelClass="text-white"
                    type="email"
                    placeholder="example@gmail.com"
                    label="Email address"
                    id="formControlLg"
                    size="lg"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />

                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    labelClass="text-white"
                    type="password"
                    placeholder="password"
                    label="Password"
                    id="formControlLg"
                    size="lg"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />

                  <Button variant="outline-light" size={40}>
                    Login
                  </Button>

                  <div className="d-flex flex-row mt-3 mb-5">
                    <MDBBtn tag="a" color="none" className="m-3" style={{ color: "white" }}>
                      <FaFacebook size={30} />
                    </MDBBtn>

                    <MDBBtn tag="a" color="none" className="m-3" style={{ color: "white" }}>
                      <FaGoogle size={30} />
                    </MDBBtn>

                    <MDBBtn tag="a" color="none" className="m-3" style={{ color: "white" }}>
                      <FaGithub size={30} />
                    </MDBBtn>

                    <MDBBtn tag="a" color="none" className="m-3" style={{ color: "white" }}>
                      <FaTwitter size={30} />
                    </MDBBtn>
                  </div>

                  <div>
                    <p className="mb-0">
                      <a href="/regist" class="text-white-50 fw-bold">
                        Don't have an account? Sign Up
                      </a>
                    </p>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPages;

// import Login from "../components/Login";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// import React from "react";

// function LoginPages() {
//   return (
//     <div>
//       <Navbar />
//       <Login />
//       <Footer />
//     </div>
//   );
// }

// export default LoginPages;
