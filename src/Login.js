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
      submitting: false
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

  handleChange = key => e => {
    this.setState({ [key]: e.target.value });
  };

  render() {
    const { email, password, submitting } = this.state;
    return (
      <React.Fragment>
        <Typography variant="h5" style={{ marginBottom: 24 }}>
          Login
        </Typography>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={this.handleSubmit}
        >
          <TextField variant={"outlined"} required type={"email"} label={"Email"} value={email}
            onChange={this.handleChange("email")}
          />
          <TextField variant={"outlined"} required type={"password"} label={"Password"} value={password}
            onChange={this.handleChange("password")}
          />
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
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
