import { isOpponentPiece } from '../utils/helpers'

export default function getBishopMoves(x, y, color) {

    const direction = [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1]
    ]

    const moves = [];

    for (const [dx, dy] of direction) {
        let nx = x + dx;
        let ny = y + dy;

        while (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
            const target = board[nx][ny];
            if (target === '') {
                moves.push(board[nx][ny]);
            }
            else {
                if (isOpponentPiece(target, color)) {
                    moves.push(board[nx, ny]);
                    break;
                }
            }
            nx += dx;
            ny += dy;
        }
    }
    return moves;
}