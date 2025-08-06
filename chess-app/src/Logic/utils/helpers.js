export default function isOpponentPiece(piece, currentColor) {
    if (!piece) return false;

    const pieceColor = piece === piece.toLowerCase() ? 'b' : 'w';
    return pieceColor !== currentColor;
}