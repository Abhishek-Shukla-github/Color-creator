import React, {PureComponent} from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/MiniPaletteStyles";
import DeleteIcon from "@material-ui/icons/Delete";

class MiniPalette extends PureComponent {
  constructor(props) {
    super(props);
    this.deletePalette = this.deletePalette.bind(this);
    this.handleDelete=this.handleDelete.bind(this);
  }
  handleDelete(){
    this.props.goToPalette(this.props.id)
  }
    deletePalette(e) {
      e.stopPropagation();
      this.props.openDeleteDialog(this.props.id);
    }
  render(){
  const { classes, paletteName, emoji,colors} = this.props;
  const miniColorBoxes=colors.map((color)=>(<div className={classes.miniColor} key={color.name} style={{backgroundColor:color.color}}/>));
  return (
    <div className={classes.root} onClick={this.handleDelete}>
        <DeleteIcon className={classes.deleteIcon} style={{transition:"all 0.4s ease-in-out"}} onClick={this.deletePalette}/>
      <div className={classes.colors} >{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
  }
}

export default withStyles(styles)(MiniPalette);