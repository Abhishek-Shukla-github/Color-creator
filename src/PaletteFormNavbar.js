import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
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
  // root:{
  //   display:"flex",
  //   height:"64px"
  // },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    flexDirection:"row",
    justifyContent:"space-between"
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
})

class PaletteFormNavbar extends Component {
    constructor(props){
        super(props);
        this.state={
            newPaletteName:"",
        }
        this.handleChange=this.handleChange.bind(this);
    }
    componentDidMount(){
        ValidatorForm.addValidationRule("isPaletteNameUnique",value=>
        this.props.palettes.every(
        ({paletteName})=>paletteName.toLowerCase() !== value.toLowerCase()
        )
    );
    };
    handleChange(e){
        this.setState({[e.target.name] : e.target.value});
    }
    render() {
        const {classes,open,handleDrawerOpen}=this.props;
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
                  <ValidatorForm onSubmit={()=>this.props.handleSubmit(this.state.newPaletteName)}>
                    <TextValidator 
                      value={this.state.newPaletteName} name="newPaletteName" onChange={this.handleChange}
                      validators={["required","isPaletteNameUnique"]}
                      errorMessages={["Enter Palette Name","Palette Name already Taken"]}
                    />
                    <Button variant="contained" color="primary" type="submit"
                    >Add Palette</Button>
                  </ValidatorForm>
                  <Link to="/">
                  <Button variant="contained" color="secondary" type="submit"
                  >Go Back</Button>
                  </Link>
                </div>
            </AppBar>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNavbar);