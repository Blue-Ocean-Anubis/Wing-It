import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHome,
  faSearch,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "./contexts/AuthContext";

const Nav = () => {
  const { logout } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    logout()
      .then(() => history.push("/login"))
      .catch(console.error);
  };
  return (
    <nav className="navigation">
      <Link to="/">
        <FontAwesomeIcon icon={faHome} size="3x" />
      </Link>
      <Link to="/user">
        <FontAwesomeIcon icon={faUser} size="3x" />
      </Link>
      <Link to="/search">
        <FontAwesomeIcon icon={faSearch} size="3x" />
      </Link>
      <Link to="/cart">
        <FontAwesomeIcon icon={faShoppingCart} size="3x" />
      </Link>
      <Link to="/login">
        <button onClick={handleLogout}>Logout</button>
      </Link>
    </nav>
  );
};

export default Nav;
