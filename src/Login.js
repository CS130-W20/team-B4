import React from "react";
import './Login.css';
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Switch, Route, Link } from "react-router-dom";
import Fade from 'react-reveal';
import {Typography, IconButton} from "@material-ui/core";
import firebase from 'firebase';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { withRouter } from 'react-router-dom';
import {BlueButton} from './Landing';


const theme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      root: {
        height: 50,
	background: 'white'
      },
    },
  },
});

/**
 *    Login/Signup screen. Users can authenticate credentials here, or create
 *    a new account.
 *
 *    @param login determines whether to display "Sign Up" or "Log In" screen
 */
class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      first_name: "",
      email: "",
      password: "",
      confirm_password: "",
      submitting: false,
      login: props.location.state ? props.location.state.login : true,
    };
  }

  /**
   *    Signs in to an already-created user account.
   *
   *    @param email email associated with the account
   *    @param password password associated with the account
   */
  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { email, password } = this.state;
    if (onSubmit) {
      this.setState({ submitting: true });
      onSubmit(email, password);
      this.setState({ submitting: false });
    }
  };

  /**
   *    Creates a new user account.
   *
   *    @param email email to be associated with the account
   *    @param password password to be associated with the account
   */
  handleSignIn = e => {
    e.preventDefault();
    const { onSignUp } = this.props;
    const { email, password,username, first_name, last_name} = this.state;
    if (onSignUp) {
      this.setState({ submitting: true });
      onSignUp(first_name, last_name, username, email, password);
      this.setState({ submitting: false });
    }
  };

  /**
  *     Updates state with user entered info (email/password)
  */
  handleChange = key => e => {
    this.setState({ [key]: e.target.value });
  };

  render() {
    const { email, password, confirm_password, first_name, last_name, username, submitting} = this.state;
    console.log(this.props.error);
    return (
        <div className="login" style={{textAlign:'left'}}>
          <div className="box pa5">
            <div className="logo" style={{textAlign:"left"}}>{this.state.login ? "Login" : "Signup"}</div>
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={this.state.login ? this.handleSubmit : this.handleSignIn}
            >
            {this.state.login ? <div style={{marginBottom: 27}}>
                <BlueButton
                    variant={"contained"}
                    fullWidth
                    color={"primary"}
                    startIcon={<img className="pv1" style={{height:30}} src={'/image/google_icon.png'} />}
                    onClick={this.props.googleSignIn}>
                    Log in with Google
                </BlueButton>
            </div> : <div/>}
            <ThemeProvider theme={theme}>
              {!this.state.login ?
                  <div> <TextField style={{marginRight: 55, marginBottom:24}} variant={"outlined"} required type={"name"}
                    label={"First Name"} value={first_name} onChange={this.handleChange("first_name")}/>
                    <TextField style={{marginBottom:24}} variant={"outlined"} required type={"name"}
                    label={"Last Name"} value={last_name} onChange={this.handleChange("last_name")}/>
                    </div>: <div/>
              }
              {!this.state.login ?
                  <TextField style={{marginBottom:24}} variant={"outlined"} required type={"name"}
                    label={"username"} value={username} onChange={this.handleChange("username")}/> : <div/>
              }
              <TextField  style={{marginBottom: 24}} variant={"outlined"} required type={"email"} label={"Email"} value={email}
                onChange={this.handleChange("email")}
              />
              <TextField style={{marginBottom: 24}} variant={"outlined"} required type={"password"} label={"Password"} value={password}
                onChange={this.handleChange("password")}
              />
              {!this.state.login ?
              <TextField style={{marginBottom: 24}} variant={"outlined"} required type={"password"} label={"Confirm Password"} error={this.state.password !== this.state.confirm_password && this.state.confirm_password !== ''} helperText={this.state.password === this.state.confirm_password || this.state.confirm_password==='' ? "" : "Different from password"} value={confirm_password}
                onChange={this.handleChange("confirm_password")}
              /> : <div/>
               }
               </ThemeProvider>
               <Fade collapse when={this.props.error}><div className="error mb3">{this.props.error} </div> </Fade>
               <div className="flex justify-end mt3" style={{height:40}}>
               <div style={{position:'relative', top:-2}}>
                  <IconButton
                    variant={"contained"}
                    color={"primary"}
                    onClick={()=>{this.setState({view:false})}}>
                        <Link to="/" style={{textDecoration: 'none', color:'inherit'}}><ArrowBackIcon/></Link>
                  </IconButton>
              </div>
              <div style={{fontSize:15, textDecoration:'underline', marginTop:'12px', paddingRight:'15px'}} className="message" onClick={()=>{this.props.clearError(); this.setState({'login': !this.state.login, 'email': '', 'password': '','confirm_password':''})}}> {this.state.login ? "Don't have an account? Sign up!" : "Already have an account? Log In!"} </div>
              <BlueButton
                type={"submit"}
                variant={"contained"}
                color={"primary"}
              >
                {submitting ? (
                  <CircularProgress
                    style={{ color: "#fff" }}
                    color={"inherit"}
                    size={16}
                  />
              ) : (this.state.login ? "Login" : "Sign up"
                )}
              </BlueButton>
              </div>
            </form>
          </div>
        </div>
    );
  }
}

export default withRouter(Login);
