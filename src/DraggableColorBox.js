import { withStyles } from '@material-ui/styles';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

const styles={
    root:{
        height: "25%",
        width: "20%",
        cursor: "pointer",
        margin: "0 auto",
        position: "relative",
        display: "inline-block",
        marginBottom: "-4px",
        "&:hover svg":{
            color:"white",
            transform:"scale(1.5)"
        }
    },
    boxContent:{
        position: "absolute",
        width: "90%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        marginLeft: "5px",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        display:"flex",
        justifyContent:"space-between",
    },
    deleteIcon:{
        transition:"all 0.3s ease-in-out",
    }
}
function DraggableColorBox(props) {
    const {classes}=props;
    return (
        <div className={classes.root} style={{backgroundColor:props.color}}>
            <div className={classes.boxContent}>
                <span>{props.name}</span>
                <span><DeleteIcon className={classes.deleteIcon} /></span>
            </div>
        </div>
    )
}

export default withStyles(styles)(DraggableColorBox);