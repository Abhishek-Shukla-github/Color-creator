import { withStyles } from "@material-ui/styles";
import styles from "./styles/MiniPaletteStyles";

function MiniPalette(props) {
  const { classes, paletteName, emoji,id,colors } = props;
  const miniColorBoxes=colors.map((color)=>(<div className={classes.miniColor} key={color.name} style={{backgroundColor:color.color}}/>))
  return (
    <div className={classes.root} onClick={props.handleClick}>
      <div className={classes.colors} >{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);