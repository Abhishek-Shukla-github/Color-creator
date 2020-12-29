import {Route,Switch} from "react-router-dom";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import NewPaletteForm from "./NewPaletteForm";
import seedColors from "./seedColors";
import {generatePalette} from "./colorHelper";
import SingleColorPalette from "./SingleColorPalette";

const { Component } = require("react");
class App extends Component{
  constructor(props){
    super(props);
    const savedPalettes=JSON.parse(window.localStorage.getItem("palettes"));
    this.state={
      palettes: savedPalettes || seedColors,
    }
    this.savePalette=this.savePalette.bind(this);
    this.findPalette=this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
    this.syncLocalStorage=this.syncLocalStorage.bind(this);
  }
  deletePalette(id) {
    this.setState(
      st => ({ palettes: st.palettes.filter(palette => palette.id !== id) }),
      this.syncLocalStorage
    );
  }
  syncLocalStorage(){
    window.localStorage.setItem("palettes",JSON.stringify(this.state.palettes))
  }
  async savePalette(newPalette){
    await this.setState({palettes:[...this.state.palettes,newPalette]})
    this.syncLocalStorage();
  }
  findPalette(id){
    return this.state.palettes.find(function(palette){
      return palette.id===id;
    })
  }
  render(){
    return(
    <Switch>
      <Route exact path="/palette/new" render={(routeProps)=><NewPaletteForm savePalette={this.savePalette} {...routeProps} palettes={this.state.palettes}/>}/>
      <Route exact path="/" render={(routeProps)=>
        <PaletteList palettes={this.state.palettes} deletePalette={this.deletePalette}  {...routeProps} /> 
        }
      />
      <Route exact path="/palette/:id" 
      render={(routeProps)=><Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))}/> }
    />
      <Route exact path="/palette/:paletteId/:colorId" 
      render={(routeProps)=><SingleColorPalette colorId={routeProps.match.params.colorId} palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}/> }
    />
    <Route render={(routeProps)=>
      <PaletteList palettes={this.state.palettes} deletePalette={this.deletePalette}  {...routeProps} /> 
    }/>
    </Switch>
    )
  }
}

export default App;