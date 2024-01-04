import { useState } from "react";
import LoginForm from "../../components/login/LoginForm";
import RegisterForm from "../../components/regiseter/RegisterForm";
import "./style.scss";

const Login = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setVisible={setVisible} />
        {visible && <RegisterForm setVisible={setVisible} />}
      </div>
    </div>
  );
};

export default Login;
