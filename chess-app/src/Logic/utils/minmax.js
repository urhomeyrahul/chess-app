import getValidMovesForPiece from "./getValidMovesForPiece";
import { applyMove } from "./moveUtils";
import evaluateBoard from "./evaluateBoard";
import { getPieceColor } from "../gamestat";

// Pick a random element from an array
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function minmax(board, depth, isMaximizingPlayer, alpha, beta) {
    if (depth === 0) return { score: evaluateBoard(board) };

    let bestMoves = []; // store all equally good moves
    let bestMove = null;

    if (isMaximizingPlayer) {
        // AI = black
        let maxEval = -Infinity;

        outer: for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                const piece = board[x][y];
                if (piece && getPieceColor(piece) === "b") {
                    const moves = getValidMovesForPiece(piece, x, y, board, "b");
                    for (let [nx, ny] of moves) {
                        const newBoard = applyMove(
                            JSON.parse(JSON.stringify(board)), // deep copy
                            [x, y],
                            [nx, ny]
                        );

                        const { score } = minmax(newBoard, depth - 1, false, alpha, beta);

                        if (score > maxEval) {
                            maxEval = score;
                            bestMoves = [{ from: [x, y], to: [nx, ny] }]; // reset list
                        } else if (score === maxEval) {
                            bestMoves.push({ from: [x, y], to: [nx, ny] }); // add equally good move
                        }

                        alpha = Math.max(alpha, score);
                        if (beta <= alpha) break outer; // prune
                    }
                }
            }
        }

        bestMove = bestMoves.length ? getRandomElement(bestMoves) : null;
        return { score: maxEval, move: bestMove };

    } else {
        // Human = white
        let minEval = Infinity;

        outer: for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                const piece = board[x][y];
                if (piece && getPieceColor(piece) === "w") {
                    const moves = getValidMovesForPiece(piece, x, y, board, "w");
                    for (let [nx, ny] of moves) {
                        const newBoard = applyMove(
                            JSON.parse(JSON.stringify(board)), // deep copy
                            [x, y],
                            [nx, ny]
                        );

                        const { score } = minmax(newBoard, depth - 1, true, alpha, beta);

                        if (score < minEval) {
                            minEval = score;
                            bestMoves = [{ from: [x, y], to: [nx, ny] }];
                        } else if (score === minEval) {
                            bestMoves.push({ from: [x, y], to: [nx, ny] });
                        }

                        beta = Math.min(beta, score);
                        if (beta <= alpha) break outer; // prune
                    }
                }
            }
        }

        bestMove = bestMoves.length ? getRandomElement(bestMoves) : null;
        return { score: minEval, move: bestMove };
    }
}

export function getBestMove(board, aicolor, depth = 2) {
    const isMaximizing = aicolor === "b"; // black is AI
    return minmax(board, depth, isMaximizing, -Infinity, Infinity).move;
}
