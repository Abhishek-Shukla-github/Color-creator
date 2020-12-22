import React from 'react'

export default function PaletteFooter(props) {
    return (
        <div>
            <footer className="Palette-footer">
                    <p>{props.palette.paletteName}</p>
                    <span className="emoji">{props.palette.emoji}</span>
            </footer>
        </div>
    )
}
