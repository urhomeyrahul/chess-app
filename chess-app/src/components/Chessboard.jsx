import { getInitialBoard, getPieceColor, initialBoard } from '../Logic/gamestat'
import { applyMove } from '../Logic/utils/moveUtils'

import { getBishopMoves } from '../Logic/pieces/bishop'
import { getKingMoves } from '../Logic/pieces/king'
import getQueenMoves from '../Logic/pieces/knight'
import { getPawnMoves } from '../Logic/pieces/pawn'
import { getRookMoves } from '../Logic/pieces/rook'
import { useState } from 'react'

function getValidMovesForPiece(piece, x, y, board, color) {

    const type = piece.toLowerCase();

    switch (type) {
        case 'p':
            return getPawnMoves(x, y, board, color);
        case 'q':
            return getQueenMoves(x, y, board, color);
        case 'b':
            getBishopMoves(x, y, color, board)
        case 'k':
            return getKingMoves(x, y, board, color);
        case 'r':
            return getRookMoves(x, y, board, color);
        default:
            return [];
    }
}

function ChessBoard() {

    const [board, setBoard] = useState(initialBoard);
    const [validMoves, setValidMoves] = useState([]);
    const [turn, setturn] = useState('white');
    const [selected, setSelected] = useState(null);

    const handleSquareClick = (x, y) => {
        const piece = board[x][y];

        if (!selected && piece && getPieceColor(piece) === turn) {
            const moves = getValidMovesForPiece(piece, x, y, board, turn);
            setSelected([x, y]);
            setValidMoves(moves);
            return;
        }

        if (selected) {
            const [fromX, fromY] = selected;
            const isValid = validMoves.some(([mx, my]) => mx === x && my == y);

            if (isValid) {
                const newBoard = applyMove(board, [fromX, fromY], [x, y]);
                setBoard(newBoard);
                setSelected(null);
                setValidMoves([]);
                setturn(turn === 'white' ? 'black' : 'white');
            }
            else {
                setSelected(null);
                setValidMoves([]);
            }
        }

    }

    return (
        <div className="board">
            {board.map((row, x) =>
                row.map((cell, y) => {
                    const isHighlighted = validMoves.some(([mx, my]) => mx === x && my === y);
                    return (
                        <Square
                            key={`${x}-${y}`}
                            row={x}
                            col={y}
                            isHighlighted={isHighlighted}
                            onClick={handleSquareClick}
                        >
                            {cell && <Piece type={cell} />}
                        </Square>
                    );
                })
            )}
        </div>
    );

}

export default ChessBoard;