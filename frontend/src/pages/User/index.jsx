import { useRef } from "react";
import { useAuth } from "../../contexts/auth.context";
import { Link } from "react-router-dom";
import style from "./user.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import UpdateInput from "../../components/Inputs/UpdateInput";
import Title from "../../components/Title";

const User = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);

  const { updateUser } = useAuth();

  const handleUpdateUsername = () => {};
  const handleUpdateEmail = () => {};
  const handleUpdatePassword = () => {};

  return (
    <main className={style.user}>
      <Link to="/home" className={style.icon}>
        <IoMdArrowRoundBack />
      </Link>
      <Title>User page</Title>
      <UpdateInput
        type={"text"}
        placeholder={"New username"}
        text={"Update username"}
        ref={usernameRef}
        action={handleUpdateUsername}
      />
      <UpdateInput
        type={"text"}
        placeholder={"New email"}
        text={"Update email"}
        ref={emailRef}
        action={handleUpdateEmail}
      />
      <UpdateInput
        type={"password"}
        placeholder={"New password"}
        text={"Update password"}
        ref={passwordRef}
        action={handleUpdatePassword}
      />
    </main>
  );
};

export default User;