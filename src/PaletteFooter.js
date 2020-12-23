import React from 'react';
import {withStyles} from "@material-ui/styles";
import styles from "./styles/PaletteFooterStyles";

function PaletteFooter(props) {
    const {classes}=props;
    return (
        <div>
            <footer className={classes.footer}>
                    <p>{props.palette.paletteName}</p>
                    <span className={classes.emoji}>{props.palette.emoji}</span>
            </footer>
        </div>
    )
}
export default withStyles(styles)(PaletteFooter);