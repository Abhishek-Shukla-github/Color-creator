import { withStyles } from '@material-ui/styles';
import React from 'react';

const styles={
    root:{
        height: "25%",
        width: "20%",
        cursor: "pointer",
        margin: "0 auto",
        position: "relative",
        display: "inline-block",
        marginBottom: "-4px",
    }
}
function DraggableColorBox(props) {
    return (
        <div className={props.classes.root} style={{backgroundColor:props.color}}>
            {props.name} 
        </div>
    )
}

export default withStyles(styles)(DraggableColorBox);