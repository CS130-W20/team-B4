import React, {Component} from 'react';
import './TopBar.css';
import {fireAuth} from "./fireApi";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';

import maged from './img/maged.png';
import logout from './img/arrow_white.png';

/**
 *  Navigation bar to put at the top of each page to allow for navigation.
 */
class TopBar extends Component {
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
                             <img src={maged} className="thumbnail-img"/>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(TopBar);