import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import style from "./update.module.css";

const UpdateInput = forwardRef(({ type, placeholder, text, action }, ref) => (
  <form 
    className={style.form}
  >
    <p className={style.text}>{text}</p>
    <input
      type={type}
      placeholder={placeholder}
      ref={ref}
      className={style.input}
    />
    <button 
      type="submit"
      className={style.button}
      onClick={action}
    >
      Update
    </button>
  </form>
));

UpdateInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
};

export default UpdateInput;
