import React,{Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
var moment = require('moment');




const theme = createMuiTheme({
  overrides: {
    MuiFormControl: {
        root:{
            minWidth: 50,
        }
    },
    InputLabel:{
        padding:'5px'
    },
    MuiFilledInput:{
        input:{
            padding:'5px 5px 5px 5px',
        }
    },
    MuiSelect:{
        root: {
            padding: '5px -15px 5px 5px',
        },
        filled:{
            '$MuiSelect-filled':{
                filled:{
                    margin:'3px',
                },
                margin:'2px',
            },
            margin:'1px',
            padding: '5px -15px 5px 5px',
            paddingRight: 0,
        },
        select:{
            MuiSelect:{
                margin:'2px',
            },
            paddingRight:'0px',
        }
    }
  },
});

export default class Preference extends Component{
    constructor(props){
        super(props);
        this.state={
            modify: true
        }
    }

    generateItems = () => {
        let l = []
        var t = moment().set({'hour':0,'minute':0})
        for(let i = 0; i<48; i++){
            l.push(<MenuItem value={t.format('hh:mm a')}>{t.format('hh:mm a')}</MenuItem>)
            t.add(30, 'm')
        }
        return l
    }

    render(){
        return(
            <div onMouseEnter={()=>{this.setState({modify:false})}}
                 onMouseLeave={()=>{this.setState({modify:true})}}>
                    <ThemeProvider theme={theme}>
                    <FormControl variant="filled" >
                        <Select defaultValue={'12:00 am'} variant="filled" IconComponent = {()=><div/>}
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          MenuProps={{
                            getContentAnchorEl: null,
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            }
                          }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {this.generateItems()}
                        </Select>
                      </FormControl>
                      </ThemeProvider>
            </div>
        )
    }
}
