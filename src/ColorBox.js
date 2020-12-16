import React, { Component } from 'react';
import "./ColorBox.css";
import {CopyToClipboard} from 'react-copy-to-clipboard';

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
        const {background,name}=this.props;
        return( 
        <CopyToClipboard text={background} onCopy={this.changeCopyState}>
            <div className="ColorBox" style={{background}}>
                <div style={{background}} className={`copy-overlay ${this.state.copied && "show"}`}/>
                <div className={`copy-msg ${this.state.copied && `show`}`}>
                    <h1>copied!!!</h1>
                    <p>{background}</p>
                </div>
                <div className="copy-container">
                    <div className="box-content">
                        <span>{name}</span>
                    </div>
                <button className="copy-button">Copy</button>
                </div>
                <span className="see-more">More</span>
            </div>
        </CopyToClipboard>
    );
    }
}