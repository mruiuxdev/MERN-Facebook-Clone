import LoginForm from "../../components/login/LoginForm";
import "./style.scss";

const Login = () => {
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm />
        <div className="register"></div>
      </div>
    </div>
  );
};

export default Login;
