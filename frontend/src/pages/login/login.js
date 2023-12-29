import LoginForm from "../../components/login/LoginForm";
import RegisterForm from "../../components/regiseter/RegisterForm";
import "./style.scss";

const Login = () => {
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  );
};

export default Login;
