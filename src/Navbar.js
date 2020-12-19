import React, { Component } from 'react';
import Slider from "rc-slider";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "rc-slider/assets/index.css";
import "./Navbar.css";

class Navbar extends Component{
    constructor(props){
        super(props);
        this.state={
            format:"hex",
        }
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({format:e.target.value});
        this.props.handleChange(e.target.value);
    }
    render(){
        return(
            <header className="Navbar">
                <div className="logo">
                    <a href="/">Colorama</a>
                </div>
                    <span>Level: {this.props.level}</span>
                <div className="slider">
                    <Slider defaultValue={this.props.level} min={100} max={900} step={100} onAfterChange={this.props.changeLevel}/>
                </div>
                <div className="select-container">
                    <FormControl >
                        <InputLabel >Format</InputLabel>
                        <Select
                            value={this.state.format}
                        onChange={this.handleChange}
                        >
                        <MenuItem value="hex">Hex- #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB- rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA- rgba(255,255,255,0.5)</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </header>
        );
    }
}

export default Navbar;