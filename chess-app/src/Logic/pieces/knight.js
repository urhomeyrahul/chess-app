import isOpponentPiece from '../utils/helpers'
import { initialBoard } from '../gamestat';

export default function getQueenMoves(x, y, color) {

    const moves = [];
    const direction = [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1]
    ]

    for (const [dx, dy] of direction) {
        let nx = x + dx;
        let ny = y + dy;

        while (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
            const target = initialBoard[nx][ny];
            if (target === '') {
                moves.push(initialBoard[nx][ny]);
            }
            else {
                if (isOpponentPiece(target, color)) {
                    moves.push(initialBoard[nx][ny]);
                    break;
                }
            }
            nx += dx;
            by += dy;
        }
    }
    return moves;
}
