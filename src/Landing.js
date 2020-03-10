import React from "react";
import Button from "@material-ui/core/Button";
import "./Landing.css";
import Fade from 'react-reveal';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import {browserHistory} from 'react-router';
import {withStyles, createMuiTheme, ThemeProvider} from '@material-ui/core';

/**
 *   @return Landing page. Default page displayed when opening the app.
 */
 export const BlueButton = withStyles({
  root: {
      backgroundColor:'#005DCB',
      fontFamily:'Raleway',
      '&:hover': {
        backgroundColor: '#0052B4',
        color: '#FFF'
    }
  },
})(Button);


class Landing extends React.Component {
  render() {
    return (
      <div>
        <img src={'/image/landing.jpg'} className="Background-img" alt=""/>
            <Fade cascade right>
            <div className="box-landing flex items-end flex-column">
              <div className="title"> Adventum </div>
              <div className="copy">Adventure, on the go</div>
                <div className="flex justify-center">
                  <BlueButton  style={{minWidth: '200px'}} color={"primary"} variant={"contained"} component={Link} to={{pathname:'/login',state:{login:true}}} >
                  Get Started
                  </BlueButton>
                </div>
                {/*<div className="mv3 flex justify-center">
                  <Button  style={{minWidth: '200px'}} variant={'contained'} component={Link} to={{pathname:'/login',state:{login:false}}} >
                    Sign Up
                  </Button>
                </div>*/}
            </div>
            </Fade>
      </div>

  );
  }
}

export default Landing;
