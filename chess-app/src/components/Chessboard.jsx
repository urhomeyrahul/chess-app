import { initialBoard, getPieceColor } from '../Logic/gamestat';
import { applyMove } from '../Logic/utils/moveUtils';
import Piece from './Piece';

import getBishopMoves from '../Logic/pieces/bishop';
import getKingMoves from '../Logic/pieces/king';
import getKnightMoves from '../Logic/pieces/knight';
import getQueenMoves from '../Logic/pieces/queen';
import getPawnMoves from '../Logic/pieces/pawn';
import getRookMoves from '../Logic/pieces/rook';
import { useState } from 'react';

function getValidMovesForPiece(piece, x, y, board, color) {
    const type = piece.toLowerCase();
    switch (type) {
        case 'p': return getPawnMoves(x, y, color, board);
        case 'q': return getQueenMoves(x, y, color, board);
        case 'n': return getKnightMoves(x, y, color, board);
        case 'b': return getBishopMoves(x, y, color, board);
        case 'k': return getKingMoves(x, y, color, board);
        case 'r': return getRookMoves(x, y, color, board);
        default: return [];
    }
}

function ChessBoard() {
    const [board, setBoard] = useState(initialBoard);
    const [validMoves, setValidMoves] = useState([]);
    const [turn, setTurn] = useState('white');
    const [selected, setSelected] = useState(null);
    const [hoverMoves, setHoveredMoves] = useState([]);
    const [drag, setDrag] = useState([]);

    const handleSquareClick = (x, y) => {
        const piece = board[x][y];
        if (!selected && piece && getPieceColor(piece) === turn) {
            const moves = getValidMovesForPiece(piece, x, y, board, turn);
            console.log("Valid moves for", piece, "at", x, y, "=>", moves);
            setSelected([x, y]);
            setValidMoves(moves);
            return;
        }

        if (selected) {
            const [fromX, fromY] = selected;
            const isValid = validMoves.some(([mx, my]) => mx === x && my === y);
            if (isValid) {
                const newBoard = applyMove(board, [fromX, fromY], [x, y]);
                setBoard(newBoard);
                setSelected(null);
                setValidMoves([]);
                setTurn(turn === 'white' ? 'black' : 'white');
            } else {
                setSelected(null);
                setValidMoves([]);
            }
        }
    };

    return (
        <div>
            {board.map((row, x) => (
                <div key={x} style={{ display: 'flex' }}>
                    {row.map((cell, y) => {
                        const isDark = (x + y) % 2 === 1;
                        const isHighlighted = (validMoves.concat(hoverMoves).some(([mx, my]) => mx === x && my === y));
                        return (
                            <div
                                key={`${x}-${y}`}
                                onClick={() => handleSquareClick(x, y)}
                                onDrag={() => {
                                    const cell = board[x][y];
                                    if (!selected && cell && getPieceColor(cell) === turn) {
                                        const drag = getValidMovesForPiece(cell, x, y, board, turn);
                                        setDrag(drag);
                                    }
                                }}
                                onDrop={() => {
                                    if (!selected) setDrag([]);
                                }}
                                onMouseEnter={() => {
                                    const cell = board[x][y];
                                    if (!selected && cell && getPieceColor(cell) === turn) {
                                        const hoverMoves = getValidMovesForPiece(cell, x, y, board, turn);
                                        setHoveredMoves(hoverMoves);
                                    }
                                }}
                                onMouseLeave={() => {
                                    if (!selected) {
                                        setHoveredMoves([]);
                                    }
                                }}
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    backgroundColor: isHighlighted
                                        ? '#FFD700'
                                        : isDark
                                            ? '#769656'
                                            : '#eeeed2',
                                    display: 'flex',
                                    // alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid #444',
                                    cursor: cell && getPieceColor(cell) === turn ? 'grab' : 'crosshair',
                                }}
                            >
                                {cell && <Piece type={cell} />}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default ChessBoard;
