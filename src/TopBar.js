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
          imgURL: null,
          currentUserData: null,
      }
    }

    getURL = (p) => storageRef.child(p).getDownloadURL();

    componentWillMount(){
      db.collection("users").get().then((querySnapshot) => {
              querySnapshot.forEach((doc)=>{
                  var curData = new userData(doc.data());
                  if(curData.props.email !== undefined && curData.props.email == fireAuth.currentUser.email){
                    this.getURL(curData.props.pic).then((url)=>{this.setState({imgURL: url, currentUserData: curData})});
                  }
                });
          });
    }


    render() {
        return (
            <div>
                <div className="topbar full-width-div">
                    <div style={{float: 'left', marginLeft: '2%', marginTop: '0.35%'}}>
                        <Link to="/" style={{ textDecoration: 'none', color: '#FFFFFF' }}>
                          {'Adventum'}
                        </Link>
                    </div>
                    <div style={{float: 'right', marginRight: '2%', marginTop: '1%'}} onClick={() => fireAuth.signOut()}>
                        <Link to="/landing">
                          <img src={logout} className='logout-img'/>
                        </Link>
                    </div>
                    <div style={{float: 'right', marginRight: '2%', marginTop: '0.25%'}}>
                        <Link to="/profile">
                             <img src={this.state.imgURL} className="thumbnail-img-top"/>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(TopBar);
