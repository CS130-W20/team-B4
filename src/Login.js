import React from "react";
import './Login.css';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirm_password: "",
      submitting: false,
      login: true,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { email, password } = this.state;
    if (onSubmit) {
      this.setState({ submitting: true });
      onSubmit(email, password);
    }
  };

  handleSignIn = e => {
    e.preventDefault();
    const { onSignUp } = this.props;
    const { email, password } = this.state;
    if (onSignUp) {
      this.setState({ submitting: true });
      onSignUp(email, password);
    }
  };

  handleChange = key => e => {
    this.setState({ [key]: e.target.value });
  };

  render() {
    const { email, password, confirm_password, submitting } = this.state;
    return (
      <React.Fragment>
        <Typography variant="h5" style={{ marginBottom: 24 }}>
          Login
        </Typography>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={this.state.login ? this.handleSubmit : this.handleSignIn}
        >
          <TextField variant={"outlined"} required type={"email"} label={"Email"} value={email}
            onChange={this.handleChange("email")}
          />
          <TextField variant={"outlined"} required type={"password"} label={"Password"} value={password}
            onChange={this.handleChange("password")}
          />
          {!this.state.login ?
          <TextField variant={"outlined"} required type={"password"} label={"Confirm Password"} value={confirm_password}
            onChange={this.handleChange("confirm_password")}
          /> : <div/>
           }
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
          <div onClick={()=>{this.setState({'login': !this.state.login})}}> {this.state.login ? "Don't have an account? Sign up!" : "Already have an account? Log In!"} </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
