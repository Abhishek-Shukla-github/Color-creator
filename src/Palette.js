import React, { Component } from 'react';
import "./Palette.css";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
export default class Palette extends Component {
    constructor(props){
        super(props);
        this.state={level:500,format:"hex",open:false};
        this.changeLevel=this.changeLevel.bind(this);
        this.changeFormat=this.changeFormat.bind(this);
        this.handleSnackClose=this.handleSnackClose.bind(this);
    }
    handleSnackClose(event,reason){
        if(reason==="clickaway") return;
        this.setState({open:false});
    }
    changeLevel(level){
        this.setState(()=>{
            return {level:level}
        });
    }
    changeFormat(format){
        this.setState({format:format,open:true});
    }
    render() {
        const colorBoxes=this.props.palette.colors[this.state.level].map((color)=>{
            return <ColorBox background={color[this.state.format]} name={color.name} moreUrl={`/palette/${this.props.palette.id}/${color.id}`} showFullPalette={true} key={color.hex}/>
        })
        return (
            <div className="Palette">
                {/* //Navbar goes here */}
                <Navbar level={this.state.level} changeLevel={this.changeLevel} handleChange={this.changeFormat} showAllColor/>
                <div className="Palette-colors">
                    {/* //Bunch of color boxes */}
                    {colorBoxes}
                </div>
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
                {/* //Footer */}
                <PaletteFooter palette={this.props.palette}/>
            </div>
        )
    }
}
