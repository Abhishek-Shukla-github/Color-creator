import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import {ChromePicker} from "react-color";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import styles from "./styles/ColorFormPickerStyles";

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
        const {isPaletteFull,classes}=this.props;
        const{currentColor,newColorName}=this.state;
        return (
            <div>
                <ChromePicker color={this.state.currentColor} className={classes.picker} onChangeComplete={(newColor)=>this.setState({currentColor:newColor.hex})}/>
                <ValidatorForm onSubmit={this.handleAddColor} ref='form' instantValidate={false} >
                <TextValidator
                    className={classes.colorNameInput}
                    placeholder='Color Name'
                    name="newColorName"
                    variant='filled'
                    margin='normal'
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
              style={{ backgroundColor: isPaletteFull ? "grey" : currentColor ,width:"100%",padding:"30px",height:"3rem"}}
              disabled={isPaletteFull}
            >
              {isPaletteFull ? "Palette Full" : "Add Color"}
            </Button>
          </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm);