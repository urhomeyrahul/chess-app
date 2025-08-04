import isOpponentPiece from '../utils/helpers';

export default function getKnightMoves(x, y, color, board) {
  const moves = [];

  // All 8 L-shaped moves
  const directions = [
    [-2, -1], [-2, 1],
    [-1, -2], [-1, 2],
    [1, -2],  [1, 2],
    [2, -1],  [2, 1]
  ];

  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;

    if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
      const target = board[nx][ny];
      if (target === '' || isOpponentPiece(target, color)) {
        moves.push([nx, ny]);
      }
    }
  }

  return moves;
}
