import React, {Component} from 'react';
import './Card.css';
import {Zoom, Fade} from 'react-reveal';
import TimePreference from './TimePreference.js';
import PricePreference from './PricePreference.js';
import DistancePreference from './DistancePreference.js';
import {db} from './fireApi';
import edit from './img/edit2.png';



/**
 *    Represents user profile. [Currently has sample data.]
 *    [WIP] will fetch actual user data from Firebase database.
 */

class userData{
    constructor(obj){
        this.username    = obj.username;
        this.name        = obj.name;
        this.low         = obj.low;
        this.high        = obj.high;
        this.start_time  = obj.start_time;
        this.end_time    = obj.end_time;
        this.dist        = obj.dist;
        this.quote       = obj.quote;
        this.preferences = obj.preferences;
    }

}
const _default = {username: '',
                 name: '',
                 low: 0,
                 high:0,
                 start_time: '',
                 end_time:'',
                 dist: 0,
                 quote: '',
                 preferences: []
             }

export default class Card extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: new userData(_default),
            modify: true,
            imgURL: 'https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-9/30726986_2114249318805986_3615377820504555520_n.jpg?_nc_cat=111&_nc_ohc=hDbAemqxCqAAX88bxBf&_nc_ht=scontent-lax3-2.xx&oh=965a3b97cf8f684a7b0bd23a40863e3f&oe=5EC04F08'
        }
    }

    /**
     *    Updates preference with user entered value.
     */
    handleChange = name => e => {
        this.setState({[name]: e.target.value});
    }
    componentDidMount(props){
        db.collection("users").where('username', '==', 'samtang').get().then((querySnapshot) => {
                var doc = querySnapshot.docs[0];
                this.setState({data: new userData(doc.data())})
            });

    }

    render(){
        const {data} = this.state;
        const {imgURL, quote} = this.state;
        return(
            <Zoom>
                <div className="pa4 ma3 flex card">
                    <div className="flex flex-column items-center" style={{width:'100%'}}>
                        <div className="flex justify-end" style={{top:'-11px', position:'relative', width:'100%'}}>
                            {this.state.modify ?
                            <img className="pv1" onClick={()=>{this.setState({modify:!this.state.modify})}} src={edit} style={{width:20}}/>:  <div className="pv1 ph2" style={{borderRadius:4, border:'1px solid #888'}} onClick={()=>{this.setState({modify:!this.state.modify})}} > save </div>
                        }</div>
                        <div className="profilePic" style={{backgroundImage:`url('${imgURL}')`}}/>
                        <div className="name pv2" >{data.name}</div>
                        <div className="quote">{data.quote}</div>
                        <div className="mv2 div"/>
                        <div className="flex flex-column items-start">
                         <TimePreference   start_time={data.start_time} end_time={data.end_time} handleStartTime={this.handleChange("start_time")} handleEndTime={this.handleChange("end_time")} modify={this.state.modify}/>
                         <PricePreference  low={data.low} high={data.high}  handleLow={this.handleChange("low")} handleHigh={this.handleChange("high")} modify={this.state.modify}/>
                         <DistancePreference dist={data.dist} handleDist={this.handleChange("dist")} modify={this.state.modify}/>
                        </div>

                    </div>
                </div>
            </Zoom>
        )

    }

}
