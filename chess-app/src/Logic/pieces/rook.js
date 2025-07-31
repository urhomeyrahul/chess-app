import isOpponentPiece from '../utils/helpers'
import { initialBoard } from '../gamestat';

export default function getRookMoves(x, y, color) {

    const moves = [];
    const direction = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ]

    for (const [dx, dy] of direction) {
        let nx = x + dy;
        let ny = y + dy;

        while (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
            const target = initialBoard[nx][ny];
            if (target === '') {
                moves.push(initialBoard[nx][ny]);
            }
            else {
                if (isOpponentPiece(target, color)) {
                    moves.push(initialBoardinitialBoardinitialBoard[nx][ny]);
                    break;
                }
            }
            nx += dx;
            ny += ny;
        }
    }

    return moves;
}