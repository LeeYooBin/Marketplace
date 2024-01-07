import style from "./submit-button.module.css";
import PropTypes from "prop-types";

const SubmitButton = ({ children }) => (
  <button 
    type="submit"
    className={style.submit_button}
  >
    {children}
  </button>
);

SubmitButton.propTypes = {
  children: PropTypes.node,
};

export default SubmitButton;