import React, { Component } from 'react';
import MiniPalette from "./MiniPalette";
import {withStyles} from "@material-ui/styles";
import styles from "./styles/PaletteListStyles";
import { Link } from 'react-router-dom';
import { CSSTransition,TransitionGroup} from 'react-transition-group';
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";

class PaletteList extends Component {
    constructor(props){
      super(props);
      this.state={
        openDeleteDialog:false,
        paleeteId:"",
      }
      this.openDeleteDialog=this.openDeleteDialog.bind(this);
      this.closeDeleteDialog=this.closeDeleteDialog.bind(this);
      this.confirmDelete=this.confirmDelete.bind(this);
      this.goToPalette=this.goToPalette.bind(this);
    }
    goToPalette(id){
        this.props.history.push(`/palette/${id}`);
    }
    openDeleteDialog(id){
      this.setState({openDeleteDialog:true,paleeteId:id})
    }
    closeDeleteDialog(){
      this.setState({openDeleteDialog:false})
    }
    confirmDelete(){
      this.props.deletePalette(this.state.paleeteId);
      this.setState({openDeleteDialog:false,id:""})
    }
    render() {
        const {palettes,classes,deletePalette}=this.props;
        return (
            <div className={classes.root}>
            <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>Colorama</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
            <TransitionGroup className={classes.palettes}>
              {palettes.map(palette => (
                <CSSTransition key={palette.id} timeout={500} classNames="fade">
                  <MiniPalette
                  {...palette}
                  goToPalette={this.goToPalette}
                  handleDelete={deletePalette}
                  key={palette.id}
                  id={palette.id}
                  openDeleteDialog={this.openDeleteDialog}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
        </div>
        <Dialog open={this.state.openDeleteDialog}
          aria-labelledby='delete-dialog-title'
        >
          <DialogTitle id='delete-dialog-title'>
            Delete This Palette?
          </DialogTitle>
          <List>
            <ListItem button onClick={this.confirmDelete}>
              <ListItemAvatar>
                <Avatar
                  style={{ backgroundColor: blue[300], color: blue[600] }}
                >
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Delete' />
            </ListItem>
            <ListItem button onClick={this.closeDeleteDialog}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[300], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Cancel' />
            </ListItem>
          </List>
        </Dialog>
      </div>
        );
    }
}

export default withStyles(styles)(PaletteList);