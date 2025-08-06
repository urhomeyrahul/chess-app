import getPseudoMovesForPiece from '../utils/getPseudoMovesForPiece';

function isSquareAttacked(x, y, board, attackerColor) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = board[i][j];
            if (!piece) continue;

            const pieceColor = piece === piece.toLowerCase() ? 'b' : 'w';
            if (pieceColor !== attackerColor) continue;

            const moves = getPseudoMovesForPiece(piece, i, j, attackerColor, board);
            for (const [mx, my] of moves) {
                if (mx === x && my === y) return true;
            }
        }
    }

    return false;
}

export default isSquareAttacked;
