import Palette from "./Palette";
import seedColors from "./seedColors";
import {generatePalette} from "./colorHelper";

const { Component } = require("react");
class App extends Component{
  render(){
    console.log(generatePalette(seedColors[4]));
    return(
      <div>
        <Palette {...seedColors[6]} />
      </div>
    )
  }
}

export default App;