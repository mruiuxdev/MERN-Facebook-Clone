import { Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Input from "../../components/input";
import axios from "axios";
import Cookies from "js-cookie";
import { DotLoader } from "react-spinners";

const LoginForm = ({ setVisible }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleLoginSubmit = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        { email, password }
      );

      setError("");
      setSuccess(data?.message);
      setLoading(false);

      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: data });

        setLogin({ email: "", password: "" });

        Cookies.set("user", JSON.stringify(data));

        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data?.message);
    }
  };

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
            onSubmit={handleLoginSubmit}
          >
            {(formik) => (
              <Form>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  onChange={handleLoginChange}
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  bottom
                />
                <button disabled={loading} type="submit" className="blue_btn">
                  {loading ? (
                    <DotLoader color="#fff" loading={loading} size={30} />
                  ) : (
                    "Login"
                  )}
                </button>

                {error && <div className="error_text">{error}</div>}
                {success && <div className="success_text">{success}</div>}
              </Form>
            )}
          </Formik>
          <Link to="/forget" className="forget_password">
            Forgotten password?
          </Link>
          <div className="sign_splitter"></div>
          <button
            className="blue_btn open_signup"
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
        </div>
        <Link to="/" className="sign_extra">
          <b>Create a page</b> for a celebrity, brand or business
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
