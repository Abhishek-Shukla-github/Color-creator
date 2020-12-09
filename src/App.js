import Palette from "./Palette";
import seedColors from "./seedColors";


const { Component } = require("react");
class App extends Component{
  render(){
    return(
      <div>
        <Palette {...seedColors[7]} />
      </div>
    )
  }
}

export default App;