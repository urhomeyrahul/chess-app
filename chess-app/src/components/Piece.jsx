import pieceMap from "../assets/pieceMap";

function Piece({ type }) {
    const src = pieceMap[type];

    return (
        <img src={src} alt={type} className="w-6 h-6 sm:w-8 sm:h-8 
        md:w-8 md:h-8" />
    );
}

export default Piece;