import React from 'react';
import {BrowserRouter, Route, Routes, Switch, Link, useLocation, useHistory} from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHome, faSearch, faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import Home from './Home.jsx';
import UserProfile from './UserProfile.jsx';
import Cart from './Cart.jsx';

const App = () => {
  const location = useLocation();

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

export default App;