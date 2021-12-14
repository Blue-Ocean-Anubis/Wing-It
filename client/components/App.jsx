
import Auth from "./auth/Index.jsx";
import React, { useState, useEffect, componentDidMount } from 'react';
import {BrowserRouter, Route, Switch, Link, useLocation, useHistory} from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHome, faSearch, faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import Home from './Home.jsx';
import UserProfile from './UserProfile.jsx';
import Cart from './Cart.jsx';
import batwing from './batwing.png';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';

const App = () => {
  // Set loading state to true initially (WELCOME PAGE STUFF)
  const [loading, setLoading] = useState(true);

    const loadData = async () => {

      // Wait for two second
      await new Promise((r) => setTimeout(r, 2500));

      // Toggle loading state
      setLoading((loading) => !loading);
    };
    useEffect(() => {

      loadData();

    }, []);
    ////////////////

  const location = useLocation();

   if(loading){
    return(
      <div className='welcome-container'>
        <div className='welcome-text'>batbook</div>
        <img className='batwing-logo' src={batwing} alt=""/>
      </div>
    );
  } else {
    return (
        <div className='app'>
          <nav className="navigation">
                <Link to="/">
                  <FontAwesomeIcon icon={faHome} size="3x"/>
                </Link>
                <Link to="/user">
                  <FontAwesomeIcon icon={faUser} size="3x"/>
                </Link>
                <Link to="/search">
                  <FontAwesomeIcon icon={faSearch} size="3x"/>
                </Link>
                <Link to="/cart">
                  <FontAwesomeIcon icon={faShoppingCart} size="3x"/>
                </Link>
          </nav>
          <Route render={({location}) => (
            <TransitionGroup>
            <CSSTransition
            key={location.key}
              timeout={300}
              classNames="fade"
              >
                <Switch location={location} key={location.pathname}>
                  <Route path="/user" component={UserProfile}>
                  </Route>
                  <Route path="/cart" component={Cart}>
                  </Route>
                  <Route exact path="/" component={Home}>
                  </Route>
                  <Route exact path="/search" component={Home}>
                  </Route>
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )} />
        </div>
    );
  }
}

export default App;
