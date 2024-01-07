import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";
import style from "./register.module.css";
import LoginInput from "../../components/Inputs/LoginInput";
import TogglePasswordVisibility from "../../components/Buttons/TogglePasswordVisibility";
import Title from "../../components/Title";
import SubmitButton from "../../components/Buttons/SubmitButton"
import LoginForm from "../../components/Forms/LoginForm";

const LoginPage = () => {
  const [passwordInputType, setPasswordInputType] = useState("password");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);

  const { register } = useAuth();

  const handleTogglePasswordInputType = () => {
    if (passwordInputType === "password") setPasswordInputType("text");
    else setPasswordInputType("password");
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const username = usernameRef.current.value;

    const credentials = {
      username,
      email,
      password
    }

    register(credentials);
  };

  return (
    <main className={style.register}>
      <Title>Register</Title>
      <LoginForm action={handleRegister}>
        <LoginInput type="text" placeholder="Username" ref={usernameRef} />
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
        <Link to="/login" className={style.link}>Already have an account?</Link>
        <SubmitButton>
          Sign up
        </SubmitButton>
      </LoginForm>
    </main>
  );
}

export default LoginPage;