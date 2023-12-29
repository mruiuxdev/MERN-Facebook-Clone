import { Form, Formik } from "formik";
import "./style.scss";
import Input from "../input";
import * as Yup from "yup";
import { useState } from "react";

const RegisterForm = () => {
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
  });

  const { firstName, lastName, email, password, gender, bYear, bMonth, bDay } =
    register;

  const years = Array.from(
    new Array(108),
    (val, i) => new Date().getFullYear() - i
  );

  const months = Array.from(new Array(12), (val, i) => i + 1);

  const getDays = () => new Date(bYear, bMonth, 0).getDate();

  const days = Array.from(new Array(getDays()), (val, i) => i + 1);

  const handleRegisterChange = (e) => {
    e.preventDefault();

    const { value, name } = e.target;

    setRegister({ ...register, [name]: value });
  };

  const registerValidationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "Name must between 2 and 16 characters")
      .max(16, "Name must between 2 and 16 characters")
      .matches(/^[aA-zZ]+$/, "Number and special characters are not allowed"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Name must between 2 and 16 characters")
      .max(16, "Name must between 2 and 16 characters")
      .matches(/^[aA-zZ]+$/, "Number and special characters are not allowed"),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if ever need to reset your password"
      )
      .email("Enter a valid email"),
    password: Yup.string()
      .required(
        "Enter a combination of at least six number, letters and punctuation marks(such as ! and &)"
      )
      .min(6, "Password must be at least 6 characters")
      .max(36, "Password can't be more than 36 characters"),
  });

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon"></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            firstName,
            lastName,
            email,
            password,
            gender,
            bYear,
            bMonth,
            bDay,
          }}
          validationSchema={registerValidationSchema}
        >
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
                  <select
                    name="bDay"
                    value={bDay}
                    onChange={handleRegisterChange}
                  >
                    {days.map((day) => (
                      <option key={day} month={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select
                    name="bMonth"
                    value={bMonth}
                    onChange={handleRegisterChange}
                  >
                    {months.map((month) => (
                      <option value={month} key={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    name="bYear"
                    value={bYear}
                    onChange={handleRegisterChange}
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <div className="reg_grid">
                  <label htmlFor="male">
                    <span> Male</span>
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      onChange={handleRegisterChange}
                    />
                  </label>
                  <label htmlFor="female">
                    <span>Female</span>
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      onChange={handleRegisterChange}
                    />
                  </label>
                </div>
              </div>
              <div className="reg_info">
                By clicking, sign up, you agree to our{" "}
                <span>terms, data policy</span> and
                <span>cookie policy</span>. You may receive notification from us
                and can opt out at any time
              </div>
              <div className="reg_btn_wrapper">
                <button className="blue_btn signup_btn">Sign up</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
