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
import styles from "./styles/NewPaletteFormStyles";
import seedColors from './seedColors';

class NewPaletteForm extends Component {
    constructor(props){
      super(props);
      this.state = {
        open: true,
        colors:seedColors[0].colors,
      };
      this.addNewColor=this.addNewColor.bind(this);
      this.handleChange=this.handleChange.bind(this);
      this.handleDelete=this.handleDelete.bind(this);
      this.clearPalette=this.clearPalette.bind(this);
      this.randomColorPicker=this.randomColorPicker.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
      
    }
    randomColorPicker(){
      const allColors = this.props.palettes.map(p => p.colors).flat();
      let rand;
      let randomColor;
      let isDuplicateColor = true;
      while (isDuplicateColor) {
        rand = Math.floor(Math.random() * allColors.length);
        randomColor = allColors[rand];
        isDuplicateColor = this.state.colors.some(
        color => color.name === randomColor.name
      );
    }
      this.setState({ colors: [...this.state.colors, randomColor] });
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
              <DraggableColorList distance={20} colors={this.state.colors} handleDelete={this.handleDelete} axis="xy" onSortEnd={this.onSortEnd}/>
            </main>
          </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);