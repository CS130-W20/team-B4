import React from 'react';
import { fireAuth } from "./fireApi";
import Home from    "./Home";
import Login from   "./Login";
import Profile from "./Profile";
import Landing from "./Landing";
import _ from "lodash";
import withAuthProtection from "./withAuthProtection";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import './App.css';


const ProtectedProfile = withAuthProtection("/landing")(Profile);
const ProtectedHome = withAuthProtection("/landing")(Home);


const Confirmation = props =>{
    return(
        <div className="flex justify-center">
            <div className="box">
                <Typography variant="h5" style={{ marginBottom: 24 }}>
                Sign up successful!
                </Typography>
                Go back to the <Link to="/landing"> landing </Link> page or view your <Link to="/profile"> profile </Link>
            </div>
        </div>)
    ;

}
const ProtectedConfirmation = withAuthProtection("/landing")(Confirmation);

class App extends React.Component {
  constructor() {
    super();
    console.log("user", fireAuth.currentUser);
    this.state = {
      me: fireAuth.currentUser,
      error: ''
    };
  }

  componentDidMount() {
    fireAuth.onAuthStateChanged(me => {
      this.setState({ me });
    });
  }

  handleSignIn = history => (email, password) => {
    return fireAuth.signInWithEmailAndPassword(email, password).then(() => {
          this.setState({error:''});
      return history.push("/profile");
  }).catch((err)=>{console.log(err.message); this.setState({error: err.message})});
  };

  handleSignUp = history => (email, password) => {
      return fireAuth.createUserWithEmailAndPassword(email, password).then(()=>{
          this.setState({error:''});
          fireAuth.signInWithEmailAndPassword(email, password).then(()=>{
              return history.push("/confirmation");
            }
          )
      }).catch((err)=>{console.log(err.message); this.setState({error: err.message})});
  }

  render() {
    const { me } = this.state;
    const email = _.get(me, "email");
    return (
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route path="/" exact
                render={props => (
                    <div>
                    <Link to="/login"> Login </Link>
                    <Link to="/landing"> landing </Link>
                    <Link to="/profile">Profile</Link>
                    <ProtectedHome {...props} me={me} displayName={email} />
                  </div>
                )}
              />
              <Route path="/login" exact
                render={({ history }) => (
                  <div style={{height:'100%', backgroundColor:'#BBB'}}>
                    <Login onSubmit={this.handleSignIn(history)}
                           onSignUp={this.handleSignUp(history)}
                            error={this.state.error}
                           />
                  </div>
                )}
              />
              <Route path="/profile" exact
                render={props => (
                  <div>
                    <Link to="/">Home</Link>
                    <ProtectedProfile {...props} me={me} displayName={email} />
                  </div>
                )}
              />
              <Route path="/landing" exact
                 render={() => (
                  <div>
                    <Landing />
                  </div>
                )}
              />
              <Route path="/confirmation" exact
                render={props => (<ProtectedConfirmation {...props}/>)}/>
            </Switch>
          </BrowserRouter>
          </div>
    );
  }
}

export default App;
