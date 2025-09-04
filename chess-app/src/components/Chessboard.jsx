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
    const [winner, setWinner] = useState(null);
    const [reset, setReset] = useState(false);

    const squareSize = 40; // px
    const boardWidth = squareSize * 8;

    // ---- helpers ----
    const isKing = (cell) =>
        !!cell &&
        typeof cell === 'string' &&
        cell.toLowerCase().endsWith('k');

    const detectWinner = (b) => {
        const whiteKingAlive = b.some(row =>
            row.some(cell => isKing(cell) && getPieceColor(cell) === 'w')
        );
        const blackKingAlive = b.some(row =>
            row.some(cell => isKing(cell) && getPieceColor(cell) === 'b')
        );
        if (!whiteKingAlive) return 'Black';
        if (!blackKingAlive) return 'White';
        return null;
    };

    const resetGame = () => {

        setBoard(initialBoard);
        setTurn('w');
        setSelected(null);
        setValidMoves([]);
        setHoveredMoves([]);
        setWinner(null);
    }

    const handleSquareClick = (x, y) => {
        if (winner) return; // block input after game over

        const piece = board[x][y];

        // Select a piece
        if (!selected && piece && getPieceColor(piece) === turn) {
            const moves = getValidMovesForPiece(piece, x, y, board, turn);
            setSelected([x, y]);
            setValidMoves(moves);
            return;
        }

        // Attempt a move
        if (selected) {
            const [fromX, fromY] = selected;
            const isValid = validMoves.some(([mx, my]) => mx === x && my === y);

            if (!isValid) {
                setSelected(null);
                setValidMoves([]);
                return;
            }

            const newBoard = applyMove(board, [fromX, fromY], [x, y]);

            // always commit the board first so the capture is visible
            setBoard(newBoard);
            setSelected(null);
            setValidMoves([]);

            const w = detectWinner(newBoard);
            if (w) {
                setWinner(w); // show "White/Black wins!"
                return;       // do not switch turn, game over
            }

            setTurn(turn === 'w' ? 'b' : 'w');
        }
    };

    return (
        <div className='inline-block'>
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
                                    if (winner) return; // no hover hints after game over
                                    const c = board[x][y];
                                    if (!selected && c && getPieceColor(c) === turn) {
                                        const hm = getValidMovesForPiece(c, x, y, board, turn);
                                        setHoveredMoves(hm);
                                    }
                                }}
                                onMouseLeave={() => {
                                    if (!selected) setHoveredMoves([]);
                                }}
                                draggable={true}
                                onDrop={(e) => {
                                    if (winner) return; // block DnD after game over

                                    const from = JSON.parse(e.dataTransfer.getData('text/plain'));
                                    const to = [x, y];

                                    const [fromX, fromY] = from;
                                    const piece = board[fromX][fromY];
                                    if (!piece || getPieceColor(piece) !== turn) return;

                                    const valid = getValidMovesForPiece(piece, fromX, fromY, board, turn)
                                        .some(([mx, my]) => mx === x && my === y);

                                    if (!valid) return;

                                    const newBoard = applyMove(board, from, to);

                                    // commit board, then winner check
                                    setBoard(newBoard);
                                    setSelected(null);
                                    setValidMoves([]);

                                    const w = detectWinner(newBoard);
                                    if (w) {
                                        setWinner(w);
                                        return;
                                    }

                                    setTurn(turn === 'w' ? 'b' : 'w');
                                }}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: isHighlighted ? '#FFD700' : (isDark ? '#769656' : '#eeeed2'),
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

            {
                !winner && (
                    <div className='mt-4 text-xl font-semibold'>
                        {turn === 'w' ? 'White' : 'Black'} <span> to Move </span>
                    </div>
                )
            }

            {winner && (
                <div className="mt-6 flex justify-between items-center w-[320px] text-2xl font-bold bg-gray-800 text-white px-4 py-2 rounded"
                    style={{ width: boardWidth }}>
                    <span>{winner} wins!</span>
                    <button
                        className="btn btn-primary px-4 py-2 rounded-md"
                        id="reset"
                        onClick={resetGame}
                    >
                        Reset
                    </button>
                </div>
            )}

        </div>
    );
}

export default ChessBoard;
