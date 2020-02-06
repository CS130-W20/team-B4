import React, {Component} from 'react';
import './Profile.css';
import { fireAuth } from "./fireApi";
import Button from "@material-ui/core/Button";


export default class Profile extends Component{
    render(){
        return(
            <div> HI THIS IS Profile
                <Button variant={"contained"} onClick={() => fireAuth.signOut()}>
              Logout
            </Button>
            </div>
        );
    }


}
