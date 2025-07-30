import React from "react";

function Piece({ type }) {

    const isWhite = type === type.toUpperCase();
    const name = type.toLowerCase();

    const src = `/assets/pieces/${isWhite ? 'w' : 'b'}${name}.png`;

    return (
        <>
            <img src={src} alt={type} className="piece" />
        </>
    )

}

export default Piece;