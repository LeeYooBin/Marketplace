import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";
import style from "./login.module.css";
import LoginInput from "../../components/Inputs/LoginInput";
import TogglePasswordVisibility from "../../components/Buttons/TogglePasswordVisibility";
import Title from "../../components/Title";
import SubmitButton from "../../components/Buttons/SubmitButton"
import LoginForm from "../../components/Forms/LoginForm";

const LoginPage = () => {
  const [passwordInputType, setPasswordInputType] = useState("password");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { login } = useAuth();

  const handleTogglePasswordInputType = () => {
    if (passwordInputType === "password") setPasswordInputType("text");
    else setPasswordInputType("password");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const credentials = {
      email,
      password
    }

    login(credentials);
  };

  return (
    <main className={style.login}>
      <Title>Login</Title>
      <LoginForm action={handleLogin}>
        <LoginInput type="text" placeholder="Email" ref={emailRef} />
        <LoginInput
          type={passwordInputType}
          placeholder="Password"
          ref={passwordRef}
        >
          <TogglePasswordVisibility 
            type={passwordInputType}
            action={handleTogglePasswordInputType}
          />
        </LoginInput>
        <Link to="/register" className={style.link}>Don't have an account yet?</Link>
        <SubmitButton>
          Sign in
        </SubmitButton>
      </LoginForm>
    </main>
  );
}

export default LoginPage;