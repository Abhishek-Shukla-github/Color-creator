import Palette from "./Palette";
import seedColors from "./seedColors";

const { Component } = require("react");
class App extends Component{
  render(){
    return(
      <div>
        <Palette {...seedColors[6]} />
      </div>
    )
  }
}

export default App;