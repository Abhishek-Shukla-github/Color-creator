import React, { Component } from 'react';
import DraggableColorList from './DraggableColorList';
import PaletteFormNavbar from "./PaletteFormNavbar";
import ColorPickerForm from './ColorPickerForm';
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import {arrayMove} from 'react-sortable-hoc';

const drawerWidth = 380;

const styles = theme => ({
  root: {
    display: "flex"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    height:"100vh"
  },
  drawerPaper: {
    width: drawerWidth,
    display:"flex",
    alignItems:"center"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    height: "calc(100vh - 64px)",
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  container:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    height:"100%"
  },
  container: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  buttons: {
    width: "100%"
  },
  button: {
    width: "50%"
  }
});

class NewPaletteForm extends Component {
    constructor(props){
      super(props);
      this.state = {
        open: true,
        colors:this.props.palettes[0].colors,
      };
      this.addNewColor=this.addNewColor.bind(this);
      this.handleChange=this.handleChange.bind(this);
      this.handleDelete=this.handleDelete.bind(this);
      this.clearPalette=this.clearPalette.bind(this);
      this.randomColorPicker=this.randomColorPicker.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
      
    }
    randomColorPicker(){
      let colorsArray=this.props.palettes.map((p)=>p.colors).flat();
      let randNum=Math.floor(Math.random()*178);
      const randColor=colorsArray[randNum];
      console.log(randColor)
      this.setState({colors:[...this.state.colors,randColor]})
    }
    clearPalette(){
      this.setState({colors:[]})
    }
    //No need of bind since its a const variable
    onSortEnd = ({oldIndex, newIndex}) => {
      this.setState(({colors}) => ({
        colors: arrayMove(colors, oldIndex, newIndex),
      }));
    }; 
    //
      handleDelete(colorToBeDeleted){
        this.setState({colors:this.state.colors.filter((color)=>color.name!==colorToBeDeleted)})
      }
      handleSubmit(newPaletteRecieved){
        let newPalette={
          paletteName:newPaletteRecieved.paletteName,
          id:newPaletteRecieved.paletteName.toLowerCase().replace(/ /g,"-"),
          colors:this.state.colors,
          emoji:newPaletteRecieved.emoji
        };
        this.props.savePalette(newPalette);
        this.props.history.push("/");
      }
      handleChange(e){
        this.setState({[e.target.name] : e.target.value});
      }
      handleDrawerOpen = () => {
        this.setState({ open: true });
      };
    
      handleDrawerClose = () => {
        this.setState({ open: false });
      };

      addNewColor(newColorCode,newColorName){
        let newColor={color:newColorCode,name:newColorName};
        this.setState({colors:[...this.state.colors,newColor]});
      }
    render() {
        const { classes } = this.props;
        const { open } = this.state;
        const isPaletteFull=this.state.colors.length >= 20; 
        return (
            <div className={classes.root}>
              <CssBaseline />
              <PaletteFormNavbar open={open} colors={this.state.colors} palettes={this.props.palettes} handleSubmit={this.handleSubmit} handleDrawerOpen={this.handleDrawerOpen}/>
            <Drawer
              className={classes.drawer}
              variant='persistent'
              anchor='left'
              open={open}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <div className={classes.container}>
              <Typography variant="h4">Design your Palette</Typography>
              <div className={classes.buttons}>
                <Button className={classes.button} variant="contained" color="secondary" onClick={this.clearPalette}>Clear Palette</Button>
                <Button className={classes.button} variant="contained" color="primary" onClick={this.randomColorPicker} disabled={isPaletteFull}>{isPaletteFull ? "Palette Full" : "Random Color"}</Button>
              </div>
              <ColorPickerForm isPaletteFull={isPaletteFull} addNewColor={this.addNewColor} colors={this.state.colors}/>
              </div>
              </Drawer>
            <main
              className={classNames(classes.content, {
                [classes.contentShift]: open
              })}
            >
              <div className={classes.drawerHeader} />
              <DraggableColorList colors={this.state.colors} handleDelete={this.handleDelete} axis="xy" onSortEnd={this.onSortEnd}/>
            </main>
          </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);