import React, { Component } from 'react';
import "./Palette.css";
import "rc-slider/assets/index.css";
import ColorBox from "./ColorBox";
import Slider from "rc-slider";

export default class Palette extends Component {
    constructor(props){
        super(props);
        this.state={level:500};
        this.changeLevel=this.changeLevel.bind(this);
    }
    changeLevel(level){
        this.setState(()=>{
            return {level:level}
        });
    }
    render() {
        const colorBoxes=this.props.palette.colors[this.state.level].map((color)=>{
            return <ColorBox background={color.hex} name={color.name}/>
        })
        return (
            <div className="Palette">
                <Slider defaultValue={500} min={100} max={900} step={100} onAfterChange={this.changeLevel}/>
                {/* //Navbar goes here */}
                <div className="Palette-colors">
                    {/* //Bunch of color boxes */}
                    {colorBoxes}
                </div>
                {/* //Footer */}
            </div>
        )
    }
}
