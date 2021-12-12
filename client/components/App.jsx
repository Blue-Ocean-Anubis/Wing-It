import React from "react";
import Auth from "./auth/Index.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Auth />;
  }
}

export default App;
