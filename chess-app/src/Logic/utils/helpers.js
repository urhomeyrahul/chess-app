export default function isOppositePiece(piece, color) {

    if (!piece)
        return false;
    else
        return color === 'white' ?
            piece === piece.toUpperCase() :
            piece === piece.toLowerCase()
}