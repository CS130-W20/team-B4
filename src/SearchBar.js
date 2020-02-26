import React, {Component} from 'react';
import {Fade} from 'react-reveal';
import './SearchBar.css';


export default class SearchBar extends Component{

    componentDidUpdate() {
      this.inputRef.focus();
    }
    render(){
        return(
            <div className="search flex justify-center" style={this.props.showSearch ? {backgroundColor:`rgba(0,0,0,0.5)`} : {}}>
                <Fade top collapse duration={300} when={this.props.showSearch}>
                    <input ref={(input) => {this.inputRef=input}} className="searchInput" type="text" value = {this.props.searchVal} onChange={this.props.searchChange} placeholder="Search"/>
                </Fade>
            </div>



        )
    }
}
