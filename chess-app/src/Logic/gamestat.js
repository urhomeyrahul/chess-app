
export const initialBoard = [

    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],   //0
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],   //1
    ['', '', '', '', '', '', '', ''],           //2
    ['', '', '', '', '', '', '', ''],           //3
    ['', '', '', '', '', '', '', ''],           //4
    ['', '', '', '', '', '', '', ''],           //5
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],   //6
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']    //7
]

export let currentTurn = 'white';

export function getPieceColor(piece) {

    if (!piece) return null;
    else
        return piece === piece.toUpperCase() ? 'white' : 'black';

}