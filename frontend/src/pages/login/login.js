import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import "./style.scss";
import LoginInput from "../../components/loginInput";
import { useState } from "react";

const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });

  const { email, password } = login;

  console.log(login);

  const handleLoginChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setLogin({ ...login, [name]: value });
  };

  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          <div className="login_1">
            <img src="../../icons/facebook.svg" alt="facebook" />
            <span>
              Facebook helps you connect and share with the people in your life
            </span>
          </div>
          <div className="login_2">
            <div className="login_2_wrap">
              <Formik enableReinitialize initialValues={{ email, password }}>
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
        <div className="register"></div>
      </div>
    </div>
  );
};

export default Login;
