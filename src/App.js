import React from 'react';
import { fireAuth } from "./fireApi";
import Home from    "./Home";
import Login from   "./Login";
import Profile from "./Profile";
import _ from "lodash";
import Typography from "@material-ui/core/Typography";
import withAuthProtection from "./withAuthProtection";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import './App.css';


const ProtectedProfile = withAuthProtection("/login")(Profile);

class App extends React.Component {
  constructor() {
    super();
    console.log("user", fireAuth.currentUser);
    this.state = {
      me: fireAuth.currentUser
    };
  }

  componentDidMount() {
    fireAuth.onAuthStateChanged(me => {
      this.setState({ me });
    });
  }

  handleSignIn = history => (email, password) => {
    return fireAuth.signInWithEmailAndPassword(email, password).then(() => {
      return history.push("/profile");
    });
  };

  render() {
    const { me } = this.state;
    const email = _.get(me, "email");
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
                <div>
                <Link to="/login" style={{ marginRight: 16 }}>
                  Login
                </Link>
                <Link to="/public" style={{ marginRight: 16 }}>
                  Public
                </Link>
                <Link to="/profile">Profile</Link>
                <Home />
              </div>
            )}
          />
          <Route
            path="/login"
            exact
            render={({ history }) => (
              <div>
                <Link to="/">Home</Link>
                <Login onSubmit={this.handleSignIn(history)} />
              </div>
            )}
          />
          <Route
            path="/profile"
            exact
            render={props => (
              <div>
                <Link to="/">Home</Link>
                <ProtectedProfile {...props} me={me} displayName={email} />
              </div>
            )}
          />
          <Route
            path="/public"
            exact
            render={() => (
              <div>
                <Link to="/">Home</Link>
                <Typography variant="h4">
                  Public Route, anyone can see this page.
                </Typography>
              </div>
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
