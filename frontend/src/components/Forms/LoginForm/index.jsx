import PropTypes from "prop-types";
import style from "./login-form.module.css";

const LoginForm = ({ children, action }) => (
  <form 
    className={style.form}
    onSubmit={action}
  >
    {children}
  </form>
);

LoginForm.propTypes = {
  children: PropTypes.node,
  action: PropTypes.func
};

export default LoginForm;