import React, { Component } from 'react';
import ColorBox from "./ColorBox";

export default class SingleColorPalette extends Component {
    constructor(props){
        super(props);
    }
    gatherShades(palette,colorToBeFiltered){
        let shades=[];
        let allColors=this.props.palette.colors;
        for (let key in allColors){
            //return all shades of given color
            // console.log(key);
            shades=shades.concat(allColors[key].filter(color=>color.id===colorToBeFiltered));
            //console.log(shades);
        }
        return shades.slice(1);
    }
    render() {
        let shades=this.gatherShades(this.props.palette.id,this.props.colorId);
        let colorBoxes=shades.map(color=><ColorBox key={color.id} name={color.name} background={color.hex}/>)
        return (
            <div className="Palette">
                <h1>Single Color Palette</h1>
                <div className="Palette-colors">{colorBoxes}</div>
            </div>
        )
    }
}
