import chroma from "chroma-js";
import sizes from "./sizes";
export default {
    colorBox:{
        height:props=>props.showFullPalette?"25%":"50%",
        width: "20%",
        cursor: "pointer",
        margin: "0 auto",
        position: "relative",
        display: "inline-block",
        marginBottom: "-4px",
        "&:hover button" :{
            opacity:"1",
        },
        [sizes.down("lg")]: {
            width: "25%",
            height: props => (props.showingFullPalette ? "20%" : "33.3333%")
          },
        [sizes.down("md")]: {
            width: "50%",
            height: props => (props.showingFullPalette ? "10%" : "20%")
        },
        [sizes.down("xs")]: {
            width: "100%",
            height: props => (props.showingFullPalette ? "5%" : "10%")
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
    },
    copyText:{
        color: props=>chroma(props.background).luminance() >=0.09 ? "black" : "white",
    },
    colorName:{
        color: props=>chroma(props.background).luminance() <=0.06 ? "white" : "black",
    },
    seeMore:{
        color:props=>chroma(props.background).luminance() <=0.08 ? "white" : "rgba(0,0,0,0.6)",
        background: "rgba(255, 255, 255, 0.3)",
        position: "absolute",
        right: "0px",
        bottom: "0px",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
        textTransform: "uppercase",
    },
    copyButton:{
        color: props=>chroma(props.background).luminance() >=0.09 ? "black" : "white",
        width: "100px",
        height: "30px",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255, 255, 255, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        border: "none",
        textDecoration: "none",
        cursor: "pointer",
        position: "absolute",
        opacity:"0",
    },
    copyOverlay:{
        opacity: "0",
        width: "100%",
        height: "100%",
        transition: "transform 0.6s ease-in-out",
        transform: "scale(0.1)",
        zIndex: "0",
    },
    showOverlay:{
        transform: "scale(50)",
        opacity: "1",
        position: "absolute",
        zIndex: "10",
    },
    copyMsg:{
        position: "fixed",
        right: "0",
        left: "0",
        top: "0",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "4rem",
        transform: "scale(0.1)",
        opacity: "0",
        flexDirection: "column",
        "& h1":{
            fontWeight: "400",
            textShadow: "1px 2px black",
            background: "rgba(255, 255, 255, 0.2)",
            width: "100%",
            textAlign: "center",
            padding: "1rem",
            marginBottom: "0",
            textTransform: "uppercase",
            [sizes.down("xs")]: {
                fontSize: "2rem"
            }
        },
        "& p":{
            fontWeight: "100",
            fontSize: "2rem",
        },
    },
    showCopyMsg:{
        opacity: "1",
        zIndex: "25",
        transform: "scale(1)",
        transition: "all ease-in-out 0.4s",
        transitionDelay: "0.3s",
    }
};