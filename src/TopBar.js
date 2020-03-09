import React, {Component} from 'react';
import './TopBar.css';
import {fireAuth} from "./fireApi";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';

import maged from './img/maged.png';
import logout from './img/arrow_white.png';
import {db, storageRef} from './fireApi';

import userData from './Home.js';

/**
 *  Navigation bar to put at the top of each page to allow for navigation.
 */
class TopBar extends Component {

    constructor(props){
      super(props);
      this.state={
          imgURL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
          currentUserData: null,
          isLoggedIn: false
      }
    }

    getURL = (p) => storageRef.child(p).getDownloadURL();

    componentWillMount(){
      if(fireAuth.currentUser !== null) {
          this.state.isLoggedIn = true;
          db.collection("users").get().then((querySnapshot) => {
                  querySnapshot.forEach((doc)=>{
                      var curData = new userData(doc.data());
                      if(curData.props.email !== undefined && curData.props.email == fireAuth.currentUser.email){
                          if(curData.props.pic){
                              this.getURL(curData.props.pic).then((url)=>{this.setState({imgURL: url, currentUserData: curData})});
                          }
                      }
                    });
              });
        }
    }


    render() {
        return (
                <div className="topbar full-width-div">
                    <div style={{float: 'left', marginLeft: '2%', marginTop: '0.35%'}}>
                        <div className='topbar-logo' style={{ textDecoration: 'none', color: '#FFFFFF' }} onClick={()=>{this.props.toMainSession()}}>
                          {'Adventum'}
                        </div>
                    </div>
                    <div style={{float: 'right', marginRight: '2%', marginTop: '1%'}} onClick={() => fireAuth.signOut()}>
                        <Link to="/">
                          <img src={logout} className='logout-img'/>
                        </Link>
                    </div>
                    <div style={{float: 'right', marginRight: '2%', marginTop: '0.25%'}}>
                    {this.state.isLoggedIn ?
                        <img src={this.state.imgURL} className="thumbnail-img-top" onClick={()=>{this.props.toProfile()}}/>
                       :
                        <div style={{marginTop: '20%'}}>
                          <Link className='topbar-signup' to={{pathname: "/login", state:{login:false}}} style={{ textDecoration: 'none', color: '#FFFFFF' }}>
                          {"Sign Up"}
                          </Link>
                        </div>
                    }
                    </div>
                </div>
        );
    }
}

export default withRouter(TopBar);
