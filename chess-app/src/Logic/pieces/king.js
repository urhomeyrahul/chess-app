import isOpponentPiece from '../utils/helpers';

export default function getKingMoves(x, y, color, board) {
  const moves = [];
  const directions = [
    [-1, -1], [-1, 1],
    [1, -1],  [1, 1],
    [0, -1],  [0, 1],
    [-1, 0],  [1, 0]
  ];

  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;

    if (nx < 0 || nx >= 8 || ny < 0 || ny >= 8) continue;

    const target = board[nx][ny];

    if (target === '' || isOpponentPiece(target, color)) {
      moves.push([nx, ny]);
    }
  }

  return moves;
}
