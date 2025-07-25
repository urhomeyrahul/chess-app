import { board } from '../../components/Chessboard'
import { isOppositePiece } from '../utils/helpers'

export default function getPawnMoves(x, y, color) {

    const moves = [];
    const dir = color === 'white' ? -1 : 1;
    const startRow = color === 'white' ? 6 : 1;

    if (board[x + dir][y] === '') {
        moves.push([x + dir][y]);
        if (x === startRow && [x + dir * 2][y] === '') {
            moves.push([x + dor * 2][y]);
        }
    }

    //checking captures
    if (board[x + dir][y - 1]?.toUpperCase() !== '' &&
        board[x + dir][y - 1]?.toUpperCase() !== undefined
        && isOppositePiece(board[x + dir][y - 1]), color) {
        moves.push(board(x + dir)[y - 1]);
    }
    if (board[x + dir][y + 1]?.toUpperCase() !== '' &&
        board[x + dir][y + 1]?.toUpperCase() !== undefined
        && isOppositePiece(board[x + dir][y + 1]), color) {
        moves.push(board[x + dir][y + 1]);
    }

    return moves;
}