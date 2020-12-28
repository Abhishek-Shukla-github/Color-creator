import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import PaletteMetaForm from "./PaletteMetaForm";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const drawerWidth = 380;
const styles =theme=>({
  root:{
    display:"flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    height:"64px",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  navBtns:{
    marginRight:"1rem",
    "& a":{
      textDecoration:"none",
    }
  },
  button:{
    margin:"0 0.5rem",
  },
})

class PaletteFormNavbar extends Component {
    constructor(props){
        super(props);
        this.state={
            newPaletteName:"",
            isFormOpen:false,
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleFormOpen=this.handleFormOpen.bind(this);
        this.handleFormClose=this.handleFormClose.bind(this);
    }
    componentDidMount(){
        ValidatorForm.addValidationRule("isPaletteNameUnique",value=>
        this.props.palettes.every(
        ({paletteName})=>paletteName.toLowerCase() !== value.toLowerCase()
        )
      );
    };
    handleFormOpen(){
      this.setState({isFormOpen:true});
    }
    handleFormClose(){
      this.setState({isFormOpen:false});
    }
    handleChange(e){
        this.setState({[e.target.name] : e.target.value});
    }
    render() {
        const {classes,open,handleDrawerOpen,handleSubmit}=this.props;
        return (
            <div className={classes.root}>
            <AppBar color="default"
              position='fixed'
              className={classNames(classes.appBar, {
                [classes.appBarShift]: open
              })}
            >
              <Toolbar disableGutters={!open}>
                <IconButton
                  color='inherit'
                  aria-label='Open drawer'
                  onClick={handleDrawerOpen}
                  className={classNames(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant='h6' color='inherit' noWrap>
                  Create Palette
                </Typography>
              </Toolbar>
              {/* PaletteName Validation */}
              <div className={classes.navBtns}>
                  <Link to="/">
                  <Button className={classes.button} variant="contained" color="secondary" type="submit"
                  >Go Back</Button>
                  </Link>
                  <Button className={classes.button} variant="contained" color="primary" onClick={this.handleFormOpen}>Save</Button>
                </div>
            </AppBar>
            {this.state.isFormOpen && <PaletteMetaForm handleSubmit={handleSubmit} handleFormClose={this.handleFormClose}/>}
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNavbar);