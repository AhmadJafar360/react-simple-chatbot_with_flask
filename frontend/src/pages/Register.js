import React, { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    confirmPasword: "",
  });
  const [msg, setMsg] = useState(null);
  const [show, setShow] = useState(false);
  const success = "Registrasi berhasil";

  const handleClose = () => setShow(false);

  const changeHandler = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevFromData) => {
      return {
        ...prevFromData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const Register = async (e) => {
    e.prevenDefault();

    const isNumber = isFinite(formData.phone);

    if (isNumber === false) {
      setMsg("Harap diisi nomer");
      return setShow(true);
    }
    if (parseInt(formData.birtdate.slice(0, 4)) >= 2005) {
      setMsg("anda harus berusia 17 tahun");
      return setShow(true);
    }

    try {
      await axios.post("http://127.0.0.1:5000/api/data", {
        firstName: formData.firstName,
        lastName: formData.lastname,
        birtdate: formData.birthdate,
        gender: formData.gender,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        confirmPasword: formData.confirmPasword,
      });
      setMsg(success);
    } catch (error) {
      setMsg(error.response.data.msg);
      setShow(true);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="box-login" onSubmit={Register}>
        <MDBContainer fluid>
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol col="12">
              <MDBCard className="bg-dark text-white my-5 mx-auto" style={{ borderRadius: "1rem", maxWidth: "400px" }}>
                <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                  <h2 className="fw-bold text-uppercase">Sign Up</h2>
                  <p className="text-white-50 mb-5">please create a new account</p>
                  {msg === null || msg === success ? (
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
                  <MDBInput className="box-regist" placeholder="First Name" wrapperClass="mb-4 mx-5 w-100" label="First Name" size="md" id="form1" type="firstName" value={formData.firstName} onChange={changeHandler} />
                  <MDBInput className="box-regist" placeholder="Last Name" wrapperClass="mb-4 mx-5 w-100" label="Last Name" size="md" id="form2" type="lastName" value={formData.firstName} onChange={changeHandler} />
                  <MDBInput className="box-regist" placeholder="Jenis Kelamin" wrapperClass="mb-4 mx-5 w-100" label="Jenis Kelamin" size="md" id="form3" type="gender" value={formData.gender} onChange={changeHandler} />
                  <MDBInput className="box-regist" placeholder="Tanggal Lahir" wrapperClass="mb-4 mx-5 w-100" label="Tanggal Lahir" size="md" id="form4" type="date" value={formData.birthdate} onChange={changeHandler} />
                  <MDBInput className="box-regist" placeholder="Nomor" wrapperClass="mb-4 mx-5 w-100" label="Nomor Telepon" size="md" id="form5" type="number" value={formData.phone} onChange={changeHandler} />
                  <MDBInput className="box-regist" placeholder="Email" wrapperClass="mb-4 mx-5 w-100" label="Email" size="md" id="form6" type="email" value={formData.email} onChange={changeHandler} />
                  <MDBInput className="box-regist" placeholder="Kata sandi" wrapperClass="mb-4 mx-5 w-100" label="Password" size="md" id="form7" type="password" value={formData.password} onChange={changeHandler} />
                  <MDBInput className="box-regist" placeholder="Konfirmasi kata sandi" wrapperClass="mb-4 mx-5 w-100" label="Confirm password" size="md" id="form8" type="password" value={formData.confirmPasword} onChange={changeHandler} />

                  <Button variant="outline-light" size={40}>
                    Registrasi
                  </Button>
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

export default Register;

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

// import React from "react";
// import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBCheckbox } from "mdb-react-ui-kit";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const Register = () => {
//   return (
//     <div>
//       <Navbar />
//       <MDBContainer fluid className="d-flex align-items-center justify-content-center bg-image" style={{ backgroundImage: "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)" }}>
//         <div className="mask gradient-custom-3"></div>
//         <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
//           <MDBCardBody className="px-5">
//             <h2 className="text-uppercase text-center mb-5">Create an account</h2>
//             <MDBInput className="box-regist" wrapperClass="mb-4 mx-5 w-100" label="First Name" size="md" id="form1" type="firstName" />
//             <MDBInput className="box-regist" wrapperClass="mb-4 mx-5 w-100" label="Last Name" size="md" id="form2" type="lastName" />
//             <MDBInput className="box-regist" wrapperClass="mb-4 mx-5 w-100" label="Jenis Kelamin" size="md" id="form3" type="gender" />
//             <MDBInput className="box-regist" wrapperClass="mb-4 mx-5 w-100" label="Tanggal Lahir" size="md" id="form4" type="date" />
//             <MDBInput className="box-regist" wrapperClass="mb-4 mx-5 w-100" label="Nomor Telepon" size="md" id="form5" type="number" />
//             <MDBInput className="box-regist" wrapperClass="mb-4 mx-5 w-100" label="Email" size="md" id="form6" type="email" />
//             <MDBInput className="box-regist" wrapperClass="mb-4 mx-5 w-100" label="Password" size="md" id="form7" type="password" />
//             <MDBInput className="box-regist" wrapperClass="mb-4 mx-5 w-100" label="Confirm password" size="md" id="form8" type="password" />
//             <div className="d-flex flex-row justify-content-center mb-4">
//               <MDBCheckbox name="flexCheck" id="flexCheckDefault" label="I agree all statements in Terms of service" />
//             </div>
//             <MDBBtn className="mb-4 w-100 gradient-custom-4" size="lg">
//               Register
//             </MDBBtn>
//           </MDBCardBody>
//         </MDBCard>
//       </MDBContainer>
//       <Footer />
//     </div>
//   );
// };

// export default Register;
