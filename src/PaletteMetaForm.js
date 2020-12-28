import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

class PaletteMetaForm extends Component{
    constructor(props){
        super(props);
        this.state={
            newPaletteName:"",
            stage:"form"
        }
        this.handleChange=this.handleChange.bind(this);
        this.showEmoji=this.showEmoji.bind(this);
        this.savePalette=this.savePalette.bind(this);
    }
    savePalette(emoji){
      const newPalette={paletteName:this.state.newPaletteName,emoji:emoji.native};
      this.props.handleSubmit(newPalette);
    }
    showEmoji(){
      this.setState({stage:"emoji"});
    }
    handleChange(e){
      this.setState({[e.target.name] : e.target.value});
  }
    render(){
      const {handleSubmit,handleFormClose}=this.props;
        return (
            <div>
              <Dialog open={this.state.stage==="emoji"} onClose={handleFormClose}>
                <DialogTitle>Pick an emoji for your Palette!</DialogTitle>
                <Picker onSelect={this.savePalette} title="Pick an emoji for your Palette"/>
              </Dialog>
              <Dialog open={this.state.stage==="form"} onClose={handleFormClose} aria-labelledby="form-dialog-title">
                  <ValidatorForm onSubmit={this.showEmoji}>
                <DialogTitle id="form-dialog-title">Save Palette!</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Enter the name of your Palette, make sure it's unique! :)
                  </DialogContentText>
                    <TextValidator fullWidth margin="normal"
                      value={this.state.newPaletteName} name="newPaletteName" onChange={this.handleChange}
                      validators={["required","isPaletteNameUnique"]}
                      errorMessages={["Enter Palette Name","Palette Name already Taken"]}
                    />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleFormClose} color="primary">
                    Cancel
                  </Button>
                  <Button variant="contained" color="primary" type="submit"
                    >Add Palette</Button>
                </DialogActions>
                  </ValidatorForm>
              </Dialog>
            </div>
          );
    }    
}

export default PaletteMetaForm;