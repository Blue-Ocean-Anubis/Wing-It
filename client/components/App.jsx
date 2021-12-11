import React from 'react';
import {BrowserRouter, Route, Routes, Switch, Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHome, faSearch, faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import Home from './Home.jsx';
import UserProfile from './UserProfile.jsx';
import Cart from './Cart.jsx';


const App = () => {

  return (
    <BrowserRouter>
      <div>
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

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>

          <Route path="/user">
            <UserProfile />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/">
            <Home />
          </Route>

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;