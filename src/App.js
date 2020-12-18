import Palette from "./Palette";
import seedColors from "./seedColors";
import {generatePalette} from "./colorHelper";

const { Component } = require("react");
class App extends Component{
  render(){
    console.log(generatePalette(seedColors[2]));
    return(
      <div>
        <Palette palette={generatePalette(seedColors[1])}/>
      </div>
    )
  }
}

export default App;