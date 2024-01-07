import style from "./header.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";
import SearchInput from "../Inputs/SearchInput";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { ImExit } from "react-icons/im";

const Header = () => {
  const { logout } = useAuth();

  return (
    <header className={style.header}>
      <SearchInput/>
      <div className={style.buttons}>
        <Link to="/cart" className={style.icon}><FaCartShopping /></Link>
        <Link to="/user" className={style.icon}><FaUserAlt /></Link>
        <Link 
          to="/login" 
          className={style.icon}
          onClick={logout}
        >
          <ImExit />
        </Link>
      </div>
    </header>
  );
}

export default Header;