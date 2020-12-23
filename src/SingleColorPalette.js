import React, { Component } from 'react';
import ColorBox from "./ColorBox";
import Navbar  from "./Navbar";
import PaletteFooter  from "./PaletteFooter";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {Link} from "react-router-dom";
import {withStyles} from "@material-ui/styles";


const styles={
    palette:{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
    },
    paletteColors:{
        height:"90%",
    },
    colorBox:{
        height:"50%",
        width: "20%",
        cursor: "pointer",
        margin: "0 auto",
        position: "relative",
        display: "inline-block",
        marginBottom: "-4px",
        "&:hover button" :{
            opacity:"1",
        }
    },
    blackBox:{
        backgroundColor:"black",
    },
    goBackBtn:{
        color:"white",
        width: "100px",
        height: "30px",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255, 255, 255, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        border: "none",
        textDecoration: "none",
        cursor: "pointer",
        position: "absolute",
    }
}

class SingleColorPalette extends Component {
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
        const {classes} =this.props;
        const {format}=this.state;
        let shades=this.gatherShades(this.props.palette.id,this.props.colorId);
        let colorBoxes=shades.map(color=><ColorBox key={color.hex} name={color.name} background={color[format]}/>)
        return (
            <div className={classes.palette}>
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
                <div className={`${classes.paletteColors} `}>{colorBoxes}
                <div className={`${classes.blackBox} ${classes.colorBox}`}>
                    <Link to={`/palette/${this.props.palette.id}`} className={classes.goBackBtn}>Go back</Link>
                </div>
                </div>
                <PaletteFooter palette={this.props.palette}/>
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);