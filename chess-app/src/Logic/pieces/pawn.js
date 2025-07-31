import { initialBoard } from '../gamestat';
import isOppositePiece from '../utils/helpers'

export default function getPawnMoves(x, y, color) {

    const moves = [];
    const dir = color === 'white' ? -1 : 1;
    const startRow = color === 'white' ? 6 : 1;

    if (initialBoard[x + dir][y] === '') {
        moves.push([x + dir][y]);
        if (x === startRow && [x + dir * 2][y] === '') {
            moves.push([x + dor * 2][y]);
        }
    }

    //checking captures
    if (initialBoard[x + dir][y - 1]?.toUpperCase() !== '' &&
        initialBoard[x + dir][y - 1]?.toUpperCase() !== undefined
        && isOppositePiece(initialBoard[x + dir][y - 1]), color) {
        moves.push(board(x + dir)[y - 1]);
    }
    if (initialBoard[x + dir][y + 1]?.toUpperCase() !== '' &&
        initialBoard[x + dir][y + 1]?.toUpperCase() !== undefined
        && isOppositePiece(initialBoard[x + dir][y + 1]), color) {
        moves.push(initialBoard[x + dir][y + 1]);
    }

    return moves;
}