import { Form, Formik } from "formik";
import "./style.scss";
import Input from "../input";
import { useState } from "react";

const RegisterForm = () => {
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    bYear: "",
    bMonth: "",
    bDay: "",
  });

  const handleRegisterChange = (e) => {
    e.preventDefault();

    const { value, name } = e.target;

    setRegister({ ...register, [name]: value });

    console.log(register);
  };

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon"></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik enableReinitialize>
          {(formik) => (
            <Form className="register_form">
              <Input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleRegisterChange}
              />
              <Input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleRegisterChange}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                onChange={handleRegisterChange}
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleRegisterChange}
              />
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <div className="reg_grid">
                  <select name="bDay" onChange={handleRegisterChange}>
                    <option value="">15</option>
                  </select>
                  <select name="bMonth" onChange={handleRegisterChange}>
                    <option value="">15</option>
                  </select>
                  <select name="bYear" onChange={handleRegisterChange}>
                    <option value="">15</option>
                  </select>
                </div>
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <div className="reg_grid">
                  <label htmlFor="male">
                    Male <input type="radio" name="gender" id="male" />
                  </label>
                  <label htmlFor="female">
                    Female <input type="radio" name="gender" id="female" />
                  </label>
                </div>
              </div>
              <div className="reg_info">
                By clicking, sign up, you agree to our terms, data policy and
                cookie policy. You may receive notification from us and can opt
                out at any time
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
