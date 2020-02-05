import React from "react";
import "./Landing.css";
import backgr from './img/freeimg.jpg';

class Landing extends React.Component {
  render() {
    return (
      <div>
        <img src={backgr} className="Background-img" alt=""/>
        <div className="title"> Adventum </div>
      </div>

  );
  }
}


export default Landing;
