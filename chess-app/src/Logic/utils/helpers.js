export default function isOpponentPiece(piece, color) {

    if (!piece)
        return false;
    else
        return color === 'white' ?
            piece === piece.toLowerCase() :
            piece === piece.toUpperCase();
}