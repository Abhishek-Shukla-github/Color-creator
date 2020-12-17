import React, { Component } from 'react';
import "./Palette.css";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";

export default class Palette extends Component {
    constructor(props){
        super(props);
        this.state={level:500,format:"hex"};
        this.changeLevel=this.changeLevel.bind(this);
        this.changeFormat=this.changeFormat.bind(this);
    }
    changeLevel(level){
        this.setState(()=>{
            return {level:level}
        });
    }
    changeFormat(format){
        this.setState({format:format});
    }
    render() {
        const colorBoxes=this.props.palette.colors[this.state.level].map((color)=>{
            return <ColorBox background={color[this.state.format]} name={color.name}/>
        })
        return (
            <div className="Palette">
                {/* //Navbar goes here */}
                <Navbar level={this.state.level} changeLevel={this.changeLevel} handleChange={this.changeFormat}/>
                <div className="Palette-colors">
                    {/* //Bunch of color boxes */}
                    {colorBoxes}
                </div>
                {/* //Footer */}
            </div>
        )
    }
}
