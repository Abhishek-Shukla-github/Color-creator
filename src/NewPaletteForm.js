import React, { Component } from 'react';
import DraggableColorList from './DraggableColorList';
import PaletteFormNavbar from "./PaletteFormNavbar";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {ChromePicker} from "react-color";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import {arrayMove} from 'react-sortable-hoc';

const drawerWidth = 380;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
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
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
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
  }
});

class NewPaletteForm extends Component {
    constructor(props){
      super(props);
      this.state = {
        open: true,
        currentColor:"magenta",
        newColorName:"",
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
    componentDidMount() {
      ValidatorForm.addValidationRule("isColorNameUnique", value =>
      this.state.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
      ValidatorForm.addValidationRule("isColorUnique",value=>
      this.state.colors.every(
        ({color})=>color.toLowerCase() !== this.state.currentColor
      )
    );
  }
      handleDelete(colorToBeDeleted){
        this.setState({colors:this.state.colors.filter((color)=>color.name!==colorToBeDeleted)})
      }
      handleSubmit(newPaletteRecieved){
        let newPalette={
          paletteName:newPaletteRecieved,
          id:newPaletteRecieved.toLowerCase().replace(/ /g,"-"),
          colors:this.state.colors,
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

      addNewColor(){
        let newColor={color:this.state.currentColor,name:this.state.newColorName};
        this.setState({colors:[...this.state.colors,newColor],newColorName:""});
      }
    render() {
        const { classes } = this.props;
        const { open } = this.state;
        const isPaletteFull=this.state.colors.length >= 20; 
        return (
            <div className={classes.root}>
              <PaletteFormNavbar classes={classes} open={open} colors={this.state.colors} palettes={this.props.palettes} handleSubmit={this.handleSubmit} handleDrawerOpen={this.handleDrawerOpen}/>
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
              <Typography variant="h4">Design your Palette</Typography>
              <div>
                <Button variant="contained" color="secondary" onClick={this.clearPalette}>Clear Palette</Button>
                <Button variant="contained" color="primary" onClick={this.randomColorPicker} disabled={isPaletteFull}>{isPaletteFull ? "Palette Full" : "Random Color"}</Button>
              </div>
              <ChromePicker color={this.state.currentColor} onChangeComplete={(newColor)=>this.setState({currentColor:newColor.hex})}/>
              <ValidatorForm onSubmit={this.addNewColor} ref='form'>
            <TextValidator
              name="newColorName"
              value={this.state.newColorName}
              onChange={this.handleChange}
              validators={["required", "isColorNameUnique","isColorUnique"]}
              errorMessages={[
                "Enter a color name",
                "Color name must be unique",
                "Color already selected"
              ]}
            />
            <Button
              variant='contained'
              type='submit'
              color='primary'
              style={{ backgroundColor: isPaletteFull ? "grey" : this.state.currentColor }}
              disabled={isPaletteFull}
            >
              {isPaletteFull ? "Palette Full" : "Add Color"}
            </Button>
          </ValidatorForm>
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