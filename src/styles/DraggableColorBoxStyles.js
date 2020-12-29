import sizes from "./sizes";
export default {
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
        },
        [sizes.down("lg")]: {
            width: "25%",
            height: "20%"
          },
          [sizes.down("md")]: {
            width: "50%",
            height: "10%"
          },
          [sizes.down("sm")]: {
            width: "100%",
            height: "5%"
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