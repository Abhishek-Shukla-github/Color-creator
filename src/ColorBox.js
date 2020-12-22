import React, { Component } from 'react';
import "./ColorBox.css";
import {Link} from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import chroma from "chroma-js";

export default class ColorBox extends Component{
    constructor(props){
        super(props);
        this.state={copied:false};
        this.changeCopyState=this.changeCopyState.bind(this);
    }
    changeCopyState(){
        this.setState({copied:true},()=>{
            setTimeout(()=>this.setState({copied:false}),1000)
        })
    }
    render(){
        const {background,name,moreUrl,showLink}=this.props;
        const isDarkColor=chroma(background).luminance() <=0.06;
        const isLighColor=chroma(background).luminance() >=0.09;
        console.log(isDarkColor);
        return( 
        <CopyToClipboard text={background} onCopy={this.changeCopyState}>
            <div className="ColorBox" style={{background}}>
                <div style={{background}} className={`copy-overlay ${this.state.copied && "show"}`}/>
                <div className={`copy-msg ${this.state.copied && `show`}`}>
                    <h1>copied!!!</h1>
                    <p>{background}</p>
                </div>
                <div className="copy-container">
                    <div className={`box-content ${isDarkColor && "light-text"}`}>
                        <span>{name} {chroma(background).luminance()}</span>
                    </div>
                <button className={`copy-button ${isLighColor && "dark-text"}`}>Copy</button>
                </div>
                {showLink && <Link to={moreUrl} onClick={e=>e.stopPropagation()}>
                    <span className={`see-more ${isLighColor && "dark-text"}`}>More</span>
                </Link>}
            </div>
        </CopyToClipboard>
    );
    }
}