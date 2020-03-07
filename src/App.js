import React from 'react';
import { fireAuth,db } from "./fireApi";
import Home from    "./Home";
import Login from   "./Login";
import Profile from "./Profile";
import Landing from "./Landing";
import Suggestion from './SuggestionSkeleton'
import _ from "lodash";
import withAuthProtection from "./withAuthProtection";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import './App.css';


const ProtectedProfile = withAuthProtection("/profile")(Profile);
const ProtectedHome = withAuthProtection("/home")(Home);

/**
 *    Displays confirmation message on successful account creation.
 */
const Confirmation = props =>{
    return(
        <div className="flex justify-center">
            <div className="box">
                <Typography variant="h5" style={{ marginBottom: 24 }}>
                Sign up successful!
                </Typography>
                Go back to the <Link to="/"> landing </Link> page or view your <Link to="/profile"> profile </Link>
            </div>
        </div>)
    ;

}
const ProtectedConfirmation = withAuthProtection("/")(Confirmation);

/**
 *    Wrapper for app. Contains routing information for all pages in our app.
 *
 *    @param currentUser currently signed-in user
 */
class App extends React.Component {
  constructor() {
    super();
    console.log("user", fireAuth.currentUser);
    this.state = {
      me: fireAuth.currentUser,
      error: ''
    };
  }

  /**
   *    Updates currently logged-in user on component mount.
   *
   *    @param me currently authenticated user
   */
  componentDidMount() {
    fireAuth.onAuthStateChanged(me => {
      this.setState({ me });
    });
  }

  handleSignIn = history => (email, password) => {
    return fireAuth.signInWithEmailAndPassword(email, password).then(() => {
          this.setState({error:''});
      return history.push("/home");
  }).catch((err)=>{console.log(err.message); this.setState({error: err.message})});
  };
  clearError = () =>{
      this.setState({error:''});
  }

  handleSignUp = history => (fn, ln, username, email, password) => {
      return fireAuth.createUserWithEmailAndPassword(email, password).then(()=>{
          this.setState({error:''});
          db.collection('users').doc().set({
            username: username,
            first_name : fn,
            last_name : ln,
            email: email,
            start_time: '03:00 pm',
            end_time:   '06:00 pm',
            dist:       10,
            high:       25,
            low:        15,
            pic:        "",
            quote:      "",
            preferences:[],
          });
          fireAuth.signInWithEmailAndPassword(email, password).then(()=>{
              return history.push("/home");
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
              <Route path="/home" exact
                render={props => (
                    <div style={{backgroundColor:'#EEE', height:'100%'}}>
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
                            clearError={this.clearError}
                           />
                  </div>
                )}
              />
              <Route path="/profile" exact
                render={props => (
                  <div>
                    <ProtectedProfile {...props} me={me} displayName={email} />
                  </div>
                )}
              />
              <Route path="/" exact
                 render={() => (
                  <div>
                    <Landing />
                  </div>
                )}
              />
              <Route path="/suggestion" exact render={props=>(<Suggestion {...props}/>)}/>
              <Route path="/confirmation" exact
                render={props => (<Confirmation {...props}/>)}/>
            </Switch>
          </BrowserRouter>
          </div>
    );
  }
}

export default App;
