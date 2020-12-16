import React, { Component } from 'react';
import "./Palette.css";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";

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
                {/* //Navbar goes here */}
                <Navbar level={this.state.level} changeLevel={this.changeLevel} />
                <div className="Palette-colors">
                    {/* //Bunch of color boxes */}
                    {colorBoxes}
                </div>
                {/* //Footer */}
            </div>
        )
    }
}
