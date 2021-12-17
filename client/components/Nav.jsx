import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHome,
  faSearch,
  faStar,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "./contexts/AuthContext";

const Nav = (props) => {
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
        <FontAwesomeIcon
          icon={faHome}
          size="2x"
          color="black"
          className="nav-button"
        />
      </Link>
      <FontAwesomeIcon
        icon={faUser}
        size="2x"
        color="black"
        variant="primary"
        onClick={props.handleUserPageShow}
        className="nav-button"
      />
      <FontAwesomeIcon
        icon={faSearch}
        size="2x"
        color="black"
        variant="primary"
        onClick={props.handleShow}
        className="nav-button"
      />
      <FontAwesomeIcon
        icon={faStar}
        size="2x"
        color="black"
        className="nav-button"
        onClick={props.handleShowCart}
      />
      <Link to="/login">
        <FontAwesomeIcon
          icon={faSignOutAlt}
          onClick={handleLogout}
          size="2x"
          color="black"
          className="nav-button"
        />
      </Link>
    </nav>
  );
};

export default Nav;
