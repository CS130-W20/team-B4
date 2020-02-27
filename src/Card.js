import React, {Component} from 'react';
import './Card.css';
import {Zoom, Fade} from 'react-reveal';
import TimePreference from './TimePreference.js';
import PricePreference from './PricePreference.js';
import DistancePreference from './DistancePreference.js';
import {db, storageRef} from './fireApi';
import edit from './img/edit2.png';



/**
 *    Represents user profile. [Currently has sample data.]
 *    [WIP] will fetch actual user data from Firebase database.
 */


export default class Card extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            modify: true,
            imgURL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        }
    }

    /**
     *    Updates preference with user entered value.
     */
    handleChange = name => e => {
        this.setState({[name]: e.target.value});
    }
    componentDidMount(props){
        this.props.imgURL.then((url)=>{this.setState({imgURL: url})});
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
                            <img className="pv1" onClick={()=>{this.setState({modify:!this.state.modify})}} src={edit} style={{width:20, height:20}}/>:  <div className="pv1 ph2" style={{borderRadius:4, border:'1px solid #888'}} onClick={()=>{this.setState({modify:!this.state.modify})}} > save </div>
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
