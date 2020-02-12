import React from "react";
import './Login.css';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import { withRouter } from 'react-router-dom';


const theme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      root: {
        height: 50
      },
    },
  },
});

class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      confirm_password: "",
      submitting: false,
      login: props.location.state.login,
    };
  }

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

  handleChange = key => e => {
    this.setState({ [key]: e.target.value });
  };


  render() {
    const { email, password, confirm_password, submitting } = this.state;
    console.log(this.props.error);
    return (
      <div className="login">
        <div className="box pa5">
            <Typography variant="h5" style={{ marginBottom: 24 }}>
              {this.state.login ? 'Login' : 'Signup' }
            </Typography>
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
              <Button
                type={"submit"}
                fullWidth
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
              <div onClick={()=>{this.setState({'login': !this.state.login, 'email': '', 'password': '','confirm_password':''})}}> {this.state.login ? "Don't have an account? Sign up!" : "Already have an account? Log In!"} </div>
            </form>
            </div>
      </div>
    );
  }
}

export default withRouter(Login);
