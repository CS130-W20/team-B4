import React from "react";
import Button from "@material-ui/core/Button";
import "./Landing.css";
import backgr from './img/freeimg.jpg';
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
        <img src={backgr} className="Background-img" alt=""/>
        <div  className="box-landing pa6 pt7">
          <div className="title"> Adventum </div>
            <div className="flex justify-center">
              <BlueButton fullWidth style={{minWidth: '200px'}} color={"primary"} variant={"contained"} component={Link} to={{pathname:'/login',state:{login:true}}} >
                Log In
              </BlueButton>
            </div>
            <div className="mv3 flex justify-center">
              <Button fullWidth style={{minWidth: '200px'}} variant={'contained'} component={Link} to={{pathname:'/login',state:{login:false}}} >
                Sign Up
              </Button>
            </div>
            {/*<div className="mv3 flex justify-center" style={{fontSize:16, color:"#1D3756", 'font-family': "Raleway"}}>or</div>
            <div className="mv3 flex justify-center" style={{fontSize:20, textDecoration:'underline', color:"#888", 'font-family': "Raleway"}}>
                 <Link style={{color:"#1D3756"}} to="/home">{'Continue as guest'}</Link>
            </div>*/}
        </div>
      </div>

  );
  }
}

export default Landing;
