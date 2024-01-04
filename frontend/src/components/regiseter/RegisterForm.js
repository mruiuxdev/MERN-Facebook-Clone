import axios from "axios";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { DotLoader } from "react-spinners";
import * as Yup from "yup";
import Input from "../input";
import RadioGender from "../input/radioGender";
import SelectDateBirth from "../input/selectDateBirth";
import "./style.scss";

const RegisterForm = ({ setVisible }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "male",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
  });

  const [errorDate, setErrorDate] = useState("");

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

  const desktopView = useMediaQuery({ query: "(min-width: 990px)" });

  const handleRegisterSubmit = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/register`,
        { firstName, lastName, email, password, gender, bYear, bMonth, bDay }
      );

      setError("");
      setSuccess(data?.message);
      setLoading(false);

      const { message, ...rest } = data;

      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });

        Cookies.set("user", JSON.stringify(rest));

        setRegister({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          gender: "male",
          bYear: new Date().getFullYear(),
          bMonth: new Date().getMonth() + 1,
          bDay: new Date().getDate(),
        });

        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data?.message);
    }
  };

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={() => setVisible(false)}></i>
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
          onSubmit={() => {
            let currentDate = new Date();
            let selectedDate = new Date(bYear, bMonth - 1, bDay);
            let atLeast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan70 = new Date(1970 + 70, 0, 1);

            if (
              currentDate - selectedDate < atLeast14 ||
              currentDate - selectedDate > noMoreThan70
            ) {
              setErrorDate(
                "It looks you've entered the wrong info. Please make sure that you use your real date of birthday"
              );
            } else {
              setErrorDate("");
            }

            handleRegisterSubmit();
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_name">
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleRegisterChange}
                  bottom
                  className="reg_input"
                />
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleRegisterChange}
                  bottom
                  errorRight
                  className="reg_input"
                />
              </div>
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                onChange={handleRegisterChange}
                bottom
                className="reg_input"
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleRegisterChange}
                bottom
                errorRight
                className="reg_input"
              />
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <SelectDateBirth
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  errorDate={errorDate}
                  desktopView={desktopView}
                  handleRegisterChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <RadioGender handleRegisterChange={handleRegisterChange} />
              </div>
              <div className="reg_info">
                By clicking, sign up, you agree to our{" "}
                <span>terms, data policy</span> and <span>cookie policy</span>.
                You may receive notification from us and can opt out at any time
              </div>
              <div className="reg_btn_wrapper">
                <button disabled={loading} className="blue_btn signup_btn">
                  {loading ? (
                    <DotLoader color="#fff" loading={loading} size={30} />
                  ) : (
                    "Sign up"
                  )}
                </button>
              </div>

              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
