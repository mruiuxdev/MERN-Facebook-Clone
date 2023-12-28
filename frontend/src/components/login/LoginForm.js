import { Form, Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../../components/input";

const LoginForm = () => {
  const [login, setLogin] = useState({ email: "", password: "" });

  const { email, password } = login;

  const handleLoginChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setLogin({ ...login, [name]: value });
  };

  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="facebook" />
        <span>
          Facebook helps you connect and share with the people in your life
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{ email, password }}
            validationSchema={loginValidationSchema}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="email"
                  name="email"
                  placeholder="Email address"
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  bottom
                />
                <button type="submit" className="blue_btn">
                  Login
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/forget" className="forget_password">
            Forgotten password?
          </Link>
          <div className="sign_splitter"></div>
          <button className="blue_btn open_signup">Create Account</button>
        </div>
        <Link to="/" className="sign_extra">
          <b>Create a page</b> for a celebrity, brand or business
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
