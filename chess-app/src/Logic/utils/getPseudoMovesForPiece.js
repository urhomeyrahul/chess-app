import getPawnMoves from '../pieces/pawn';
import getRookMoves from '../pieces/rook';
import getKnightMoves from '../pieces/knight';
import getBishopMoves from '../pieces/bishop';
import getQueenMoves from '../pieces/queen';
import getKingMovesNoCheck from '../pieces/kingNoCheck'; 

export default function getPseudoMovesForPiece(piece, x, y, color, board) {
    const type = piece.toLowerCase();

    switch (type) {
        case 'p': return getPawnMoves(x, y, color, board); // already pseudo
        case 'r': return getRookMoves(x, y, color, board);
        case 'n': return getKnightMoves(x, y, color, board);
        case 'b': return getBishopMoves(x, y, color, board);
        case 'q': return getQueenMoves(x, y, color, board);
        case 'k': return getKingMovesNoCheck(x, y, color, board);
        default: return [];
    }
}
