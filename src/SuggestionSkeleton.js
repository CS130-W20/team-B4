import React, {Component} from 'react';
import thai from "./img/thailand.png";
import TopBar from './TopBar';
import "./Suggestion.css";


export default class Suggestion extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(

            <div>
                {/*TopBar*/}
                <div className="justify-center" style={{paddingTop: 100}}>
                    <img className="suggestion-image" src={thai} alt="" width="300" height="300" />
                    {/*TODO: change image to match desired location*/}
                </div>
                <div className="suggestion-name">Emporium Thai</div>
                {/*TODO: make this text field match the desired location name"*/}
            </div>

        )
    }

}
