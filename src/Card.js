import React, {Component} from 'react';
import './Card.css';
import {Zoom, Fade} from 'react-reveal';
import TimePreference from './TimePreference.js';
import PricePreference from './PricePreference.js';



/**
 *    Represents user profile. [Currently has sample data.]
 *    [WIP] will fetch actual user data from Firebase database.
 */
export default class Card extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: 'Sam',
            quote: 'Everyday is leg day when you\'re running away from your problems',
            imgURL: 'https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-9/30726986_2114249318805986_3615377820504555520_n.jpg?_nc_cat=111&_nc_ohc=hDbAemqxCqAAX88bxBf&_nc_ht=scontent-lax3-2.xx&oh=965a3b97cf8f684a7b0bd23a40863e3f&oe=5EC04F08'
        }
    }

    render(){
        const {imgURL, name, quote} = this.state;
        return(
            <Zoom>
                <div className="pa4 ma3 flex card">
                    <div className="flex flex-column items-center" style={{width:'100%'}}>
                        <div className="profilePic" style={{backgroundImage:`url('${imgURL}')`}}/>
                        <div className="name pv2" >{name}</div>
                        <div className="quote">{quote}</div>
                        <div className="mv2 div"/>
                         <TimePreference/>
                         <PricePreference/>
                        {/*<TimeSelect/>*/}

                    </div>
                </div>
            </Zoom>
        )

    }

}
