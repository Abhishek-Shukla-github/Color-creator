import sizes from "./sizes";
export default {
    "@global":{
      ".fade-exit":{
        opacity:1
      },
      ".fade-exit-active":{
        opacity: 0,
        transition: "opacity 0.5s ease-in-out"
      }
    },
    root: {
      background: "#360033",  /* fallback for old browsers */
      background: "-webkit-linear-gradient(to right, #0b8793, #360033)",  /* Chrome 10-25, Safari 5.1-6 */
      background: "linear-gradient(to right, #0b8793, #360033)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      height: "100vh",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      overflow:"scroll"
    },
    container: {
      width: "50%",
      display: "flex",
      alignItems: "flex-start",
      flexDirection: "column",
      flexWrap: "wrap",
      [sizes.down("xl")]: {
        width: "80%"
      },
      [sizes.down("xs")]: {
        width: "75%"
      }
    },
    nav: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      color: "white",
      alignItems:"center",
      "& a":{
        color:"white",
      },
    },
    palettes: {
      boxSizing: "border-box",
      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(3, 30%)",
      gridGap: "2.5rem",
      [sizes.down("md")]: {
        gridTemplateColumns: "repeat(2, 50%)"
      },
      [sizes.down("xs")]: {
        gridTemplateColumns: "repeat(1, 100%)",
        gridGap: "1rem"
      }
    }
  };