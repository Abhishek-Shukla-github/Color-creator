import React, { Component } from 'react';
import DraggableColorList from './DraggableColorList';
import PaletteFormNavbar from "./PaletteFormNavbar";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {ChromePicker} from "react-color";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import {arrayMove} from 'react-sortable-hoc';

class ColorPickerForm extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default ColorPickerForm;