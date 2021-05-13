import "./App.css";
import { Nav, Navbar } from "react-bootstrap";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./components/Home";
import Users from "./components/Users";
import About from "./components/About";
import firebase from "./firebase";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const msg = firebase.messaging();
    msg
      .requestPermission()
      .then(() => {
        return msg.getToken();
      })
      .then((data) => {
        console.warn("Token ", data);
      });
  });
  return (
    <div className="App">
      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/about">About</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/users">Users</Link>
            </Nav.Link>
          </Nav>
        </Navbar>
        <Switch>
          <Route component={Users} path="/users"></Route>
          <Route component={About} path="/about"></Route>
          <Route component={Home} path="/"></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
