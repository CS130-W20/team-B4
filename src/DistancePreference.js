import React,{Component} from 'react';
import road from './img/road.png';
import { withStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import Fade from 'react-reveal'


const DistanceSelect = withStyles({
  root: {
      fontFamily:'Raleway',
      fontSize:15,
      width:55,
      border: 0,
      padding: 5,
  },
  input:{
      padding:5,
  }
})(FilledInput);

/**
 *    Represents user's preferred distance.
 *
 *    Default: start and end distances are unfocused
 *    @param dist current preferred distance
 *    @param handleDist handles user changes to dist text field
 *    @param modify whether write permissions are granted
 */
export default class DistancePreference extends Component{
    constructor(props){
        super(props);
        this.state={
            modifyStart: false,
            modifyEnd: false,
        }
    }


    render(){
        let {dist, handleDist} = this.props;
        let {modifyStart, modifyEnd} = this.state;
        return(
            <div className="flex mb2 pb2" style={{borderBottom:'1px solid #CCC', width:'100%'}}>
                <img className="mr2 pt1"  src={road} style={{width:24, height:24}} />
                <div className="mh2 pt2"> &lt;   </div>
                <div onMouseEnter={()=>{this.setState({modifyStart:false})}}
         onMouseLeave={()=>{this.setState({modifyStart:false})}}>
                    {this.props.modify ? <div style={{fontSize:15, padding:'6px 8.5px 0px 8.5px'}}>{dist} mil</div>:
                    <div className="flex flex-row">
                    <DistanceSelect type='number' variant="filled" iconcomponent = {<div/>}
                      value={dist}
                      onChange={handleDist}
                      menuprops={{
                        getContentAnchorEl: null,
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        }
                      }}
                    >
                    </DistanceSelect><div className="mt2 ml2">mil </div>
                    </div>
                }
                </div>
            </div>
        )
    }
}
