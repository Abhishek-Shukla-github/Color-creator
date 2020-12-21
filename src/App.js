import {Route,Switch} from "react-router-dom";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import seedColors from "./seedColors";
import {generatePalette} from "./colorHelper";
import SingleColorPalette from "./SingleColorPalette";

const { Component } = require("react");
class App extends Component{
  findPalette(id){
    return seedColors.find(function(palette){
      return palette.id===id;
    })
  }
  render(){
    // console.log(generatePalette(seedColors[2]));
    return(
    <Switch>
      <Route exact path="/" render={(routeProps)=><PaletteList palettes={seedColors} {...routeProps}/> }/>
      <Route exact path="/palette/:id" 
      render={(routeProps)=><Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))}/> }
    />
      <Route exact path="/palette/:paletteId/:colorId" 
      render={()=><SingleColorPalette/> }
    />
    </Switch>
      // <div>
      //   <Palette palette={generatePalette(seedColors[1])}/>
      // </div>
    )
  }
}

export default App;