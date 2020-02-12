import React from "react";
import Button from "@material-ui/core/Button";
import "./Landing.css";
import backgr from './img/freeimg.jpg';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";


class Landing extends React.Component {
  render() {
    return (
      <div>
        <img src={backgr} className="Background-img" alt=""/>
        <div  className="box-landing pa7">
          <div className="title"> Adventum </div>
            <div className="flex justify-center">
              <Button fullWidth style={{minWidth: '200px'}} color={"primary"} variant={"contained"} component={Link} to={{pathname:'/login',state:{login:true}}} >
                Log In
              </Button>
            </div>
            <div className="mv3 flex justify-center">
              <Button fullWidth style={{minWidth: '200px'}} variant={'contained'} component={Link} to={{pathname:'/login',state:{login:false}}} >
                Sign Up
              </Button>
            </div>
        </div>
      </div>

  );
  }
}


export default Landing;
