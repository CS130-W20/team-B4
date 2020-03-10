import React, {Component} from 'react';
import './Card.css';
import {Zoom} from 'react-reveal';
import TimePreference from './TimePreference.js';
import PricePreference from './PricePreference.js';
import DistancePreference from './DistancePreference.js';
import ActivityPreference from './ActivityPreference.js';
import edit from './img/edit2.png';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import iconPrefMap from './PreferenceMap.js';



/**
 *    Represents user profile. [Currently has sample data.]
 *    [WIP] will fetch actual user data from Firebase database.
 */


export default class Card extends Component{
    constructor(props){
        super(props);
        this.state = {
            modify: true,
            imgURL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
            displayActivityPrefs: false
        }
    }

    /**
     *    Updates preference with user entered value.
     */
    handleChange = name => e => {
        this.setState({[name]: e.target.value});
    }
    componentDidMount(props){
        if(this.props.imgURL)
            this.props.imgURL.then((url)=>{this.setState({imgURL: url})});
    }

    handlePreferenceChange = () => {};

    genActivityOptions = () => {
      const options = ['italian', 'japanese', 'chinese', 'pizza', 'mediterranean', 'mexican', 'korean', 'fast_food', 'dessert', 'american', 'vegan', 'indian', 'thai', 'juice', 'bars', 'boba', 'coffee', 'bicycle', 'boat', 'beach', 'kayaking', 'hiking', 'yoga', 'climbing', 'museum', 'cinema', 'zoo', 'arcade', 'shopping'];
      return options.map((item) => { return <div key={iconPrefMap[`${item}`]} className="ma2"> {<img src={iconPrefMap[`${item}`]} style={{'background-size': 'cover', display: 'flex', 'flex-direction': 'row', height: '30px'}}/>} <div className="label-card"> {item} </div> </div> })
    }

    render(){
        const {data} = this.props;
        const {imgURL, quote, displayActivityPrefs} = this.state;
        return(
            <Zoom opposite>
                <div className="pa4 ma3 card">
                    {!displayActivityPrefs ?
                    <div className="flex flex-column items-center" style={{width:'100%'}}>
                        <div className="flex flex-row justify-between" style={{top:'-11px', position:'relative', width:'100%', flexDirection: "row", JustifyContent: "space-between"}}>
                            <CloseIcon style={{cursor: "pointer"}} onClick={()=>{this.props.deleteCard(this.props.data)}}/>
                            {this.state.modify ?
                            <img className="pv1" onClick={()=>{this.setState({modify:!this.state.modify})}} src={edit} style={{width:20, height:20, cursor: 'pointer'}}/>:  <div className="pv1 ph2" style={{borderRadius:4, border:'1px solid #888', cursor: 'pointer'}} onClick={()=>{this.setState({modify:!this.state.modify})}} > save </div>
                            }
                        </div>
                        <div className="profilePic" style={{backgroundImage:`url('${imgURL}')`}}/>
                        <div className="name pv2" >{data.first_name}</div>
                        <div className="quote">{data.quote}</div>
                        <div className="mv2 div"/>
                        <div className="flex flex-column items-start">
                         <TimePreference   start_time={data.start_time} end_time={data.end_time} handleStartTime={this.handleChange("start_time")} handleEndTime={this.handleChange("end_time")} modify={this.state.modify} fill={true}/>
                         <PricePreference  low={data.low} high={data.high}  handleLow={this.handleChange("low")} handleHigh={this.handleChange("high")} modify={this.state.modify}/>
                         <DistancePreference dist={data.dist} handleDist={this.handleChange("dist")} modify={this.state.modify}/>
                         <ActivityPreference preferences={data.preferences} handlePreferences={this.handlePreferenceChange} modify={this.state.modify} edit={() => {this.setState({displayActivityPrefs: true})}}/>
                        </div>

                    </div>

                    :

                    <div>
                      <div className="flex flex-row">
                          <ArrowBackIcon style={{cursor: 'pointer'}} onClick={()=>{this.setState({displayActivityPrefs: false})}}/>
                          <div className="name pv2" style={{paddingLeft: '30px'}} >{data.first_name}'s Preferences</div>
                      </div>
                      <div className="flex flex-wrap items-center" style={{maxWidth: '600px'}}>
                        {this.genActivityOptions()}
                      </div>
                    </div>}
                </div>
            </Zoom>
        )

    }

}
