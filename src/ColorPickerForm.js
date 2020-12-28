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

class ColorPickerForm extends Component {
    constructor(props){
        super(props);
        this.state={
            currentColor:"magenta",
            newColorName:"",
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleAddColor=this.handleAddColor.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule("isColorNameUnique", value =>
        this.props.colors.every(
          ({ name }) => name.toLowerCase() !== value.toLowerCase()
        )
      );
        ValidatorForm.addValidationRule("isColorUnique",value=>
        this.props.colors.every(
          ({color})=>color.toLowerCase() !== this.state.currentColor
        )
      );
    }
    handleAddColor(){
        this.props.addNewColor(this.state.currentColor,this.state.newColorName);
        this.setState({newColorName:""})
    }
    handleChange(e){
        this.setState({[e.target.name] : e.target.value});
    }
    render() {
        const {isPaletteFull}=this.props;
        const{currentColor,newColorName}=this.state;
        return (
            <div>
                <ChromePicker color={this.state.currentColor} onChangeComplete={(newColor)=>this.setState({currentColor:newColor.hex})}/>
                <ValidatorForm onSubmit={this.handleAddColor} ref='form'>
                <TextValidator
                    name="newColorName"
                    value={newColorName}
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
              style={{ backgroundColor: isPaletteFull ? "grey" : currentColor }}
              disabled={isPaletteFull}
            >
              {isPaletteFull ? "Palette Full" : "Add Color"}
            </Button>
          </ValidatorForm>
            </div>
        )
    }
}

export default ColorPickerForm;