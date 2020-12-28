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
            open:true,
            newPaletteName:"",
        }
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(e){
      this.setState({[e.target.name] : e.target.value});
  }
    handleClickOpen = () => {
        this.setState({open:true})
      };
    
    handleClose = () => {
        this.setState({open:false});
      };
    render(){
      const {handleSubmit,handleFormClose}=this.props;
        return (
            <div>
              <Dialog open={this.state.open} onClose={handleFormClose} aria-labelledby="form-dialog-title">
                  <ValidatorForm onSubmit={()=>this.props.handleSubmit(this.state.newPaletteName)}>
                <DialogTitle id="form-dialog-title">Save Palette!</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Enter the name of your Palette, make sure it's unique! :)
                  </DialogContentText>
                  <Picker />
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