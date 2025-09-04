import { initialBoard, getPieceColor } from '../Logic/gamestat';
import { applyMove } from '../Logic/utils/moveUtils';
import Piece from './Piece';
import { useState } from 'react';
import getValidMovesForPiece from '../Logic/utils/getValidMovesForPiece';

function ChessBoard() {
    const [board, setBoard] = useState(initialBoard);
    const [validMoves, setValidMoves] = useState([]);
    const [turn, setTurn] = useState('w');
    const [selected, setSelected] = useState(null);
    const [hoverMoves, setHoveredMoves] = useState([]);

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
            const isValid = validMoves.some(([mx, my]) => mx === x && my === y);
            if (isValid) {
                const newBoard = applyMove(board, [fromX, fromY], [x, y]);
                setBoard(newBoard);
                setSelected(null);
                setValidMoves([]);
                setTurn(turn === 'w' ? 'b' : 'w');
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
                                onDragOver={(e) => e.preventDefault()}
                                onMouseEnter={() => {
                                    const cell = board[x][y];
                                    if (!selected && cell && getPieceColor(cell) === turn) {
                                        const hoverMoves = getValidMovesForPiece(cell, x, y, board, turn);
                                        setHoveredMoves(hoverMoves);
                                    }
                                }}
                                draggable={true}
                                onMouseLeave={() => {
                                    if (!selected) {
                                        setHoveredMoves([]);
                                    }
                                }}
                                onDrop={(e) => {
                                    const from = JSON.parse(e.dataTransfer.getData('text/plain'));
                                    const to = [x, y];

                                    const [fromX, fromY] = from;
                                    const piece = board[fromX][fromY];

                                    const valid = getValidMovesForPiece(piece, fromX, fromY, board, turn)
                                        .some(([mx, my]) => mx === x && my === y);

                                    if (valid) {
                                        const newBoard = applyMove(board, from, to);
                                        setBoard(newBoard);
                                        setTurn(turn === 'w' ? 'b' : 'w');
                                        setSelected(null);
                                        setValidMoves([]);
                                    }
                                }}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: isHighlighted
                                        ? '#FFD700'
                                        : isDark
                                            ? '#769656'
                                            : '#eeeed2',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    border: '1px solid #444',
                                    cursor: cell && getPieceColor(cell) === turn ? 'grab' : 'crosshair',
                                }}
                            >
                                {cell && <Piece type={cell} position={[x, y]} />}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default ChessBoard;
