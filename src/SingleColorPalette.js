import React, { Component } from 'react';
import ColorBox from "./ColorBox";
import Navbar  from "./Navbar";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default class SingleColorPalette extends Component {
    constructor(props){
        super(props);
        this.state={format:"hex",open:false};
        this.handleChange=this.handleChange.bind(this);
        this.handleSnackClose=this.handleSnackClose.bind(this);
    }
    handleSnackClose(event,reason){
        if(reason==="clickaway") return;
        this.setState({open:false});
    }
    handleChange(format){
        this.setState({format:format,open:true})
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
        const {format}=this.state;
        let shades=this.gatherShades(this.props.palette.id,this.props.colorId);
        let colorBoxes=shades.map(color=><ColorBox key={color.id} name={color.name} background={color[format]}/>)
        return (
            <div className="Palette">
                <Navbar showAllColor={false} handleChange={this.handleChange}/>
                <Snackbar
                    anchorOrigin={{
                     vertical: 'bottom',
                     horizontal: 'left',
                }}
                    open={this.state.open}
                    autoHideDuration={2000}
                    onClose={this.handleSnackClose}
                    message={`Color Format changed to ${this.state.format.toUpperCase()}`}
                    action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleSnackClose}>
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
                <div className="Palette-colors">{colorBoxes}</div>
            </div>
        )
    }
}
