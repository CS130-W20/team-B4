import React from "react";
import './Login.css';
import backgr from './img/freeimg2.jpg';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { withRouter } from 'react-router-dom';


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
    const { email, password } = this.state;
    if (onSignUp) {
      this.setState({ submitting: true });
      onSignUp(email, password);
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
    const { email, password, confirm_password, submitting } = this.state;
    console.log(this.props.error);
    return (
        <div className="login" style={{textAlign:'left'}}>
          <div className="box pa5">
            <div style={{fontSize:20, 'font-family': 'Raleway'}}>
                <Link to="/landing" style={{textDecoration: 'none'}}>{'< Back'}</Link>
            </div>
            <div className="logo">Adventum</div>
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={this.state.login ? this.handleSubmit : this.handleSignIn}
            >
            <ThemeProvider theme={theme}>
              <TextField  style={{marginBottom: 24}} variant={"outlined"} required type={"email"} label={"Email"} value={email}
                onChange={this.handleChange("email")}
              />
              <TextField style={{marginBottom: 24}} variant={"outlined"} required type={"password"} label={"Password"} value={password}
                onChange={this.handleChange("password")}
              />
              {!this.state.login ?
              <TextField style={{marginBottom: 24}} variant={"outlined"} required type={"password"} label={"Confirm Password"} error={this.state.password != this.state.confirm_password && this.state.confirm_password != ''} helperText={this.state.password == this.state.confirm_password || this.state.confirm_password=='' ? "" : "Different from password"} value={confirm_password}
                onChange={this.handleChange("confirm_password")}
              /> : <div/>
               }
               </ThemeProvider>
               {this.props.error ? <div className="error mb3"> {this.props.error} </div> : <div/>}
               <div className="flex justify-end mt3">
              <div style={{fontSize:15, textDecoration:'underline'}} className="message ph4 mt2" onClick={()=>{this.setState({'login': !this.state.login, 'email': '', 'password': '','confirm_password':''})}}> {this.state.login ? "Don't have an account? Sign up!" : "Already have an account? Log In!"} </div>
              <Button
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
              </Button>
              </div>
            </form>
          </div>
        </div>
    );
  }
}

export default withRouter(Login);
