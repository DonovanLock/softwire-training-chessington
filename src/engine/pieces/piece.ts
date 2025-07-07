import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';

export default class Piece {
    public player: Player;

    public constructor(player: Player) {
        this.player = player;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    public getDiagonalMoves(board: Board, square: Square) {
        const upRight = this.getDirectionalMoves(board, square, 1, 1);
        const downRight = this.getDirectionalMoves(board, square, -1, 1);
        const downLeft = this.getDirectionalMoves(board, square, -1, -1);
        const upLeft = this.getDirectionalMoves(board, square, 1, -1);
        const moves = [...upRight, ...downRight, ...downLeft, ...upLeft];
        return moves;
    }

    public getDirectionalMoves(board: Board, square: Square, rowChange: number, colChange: number) {
        const moves = [];
        let i = square.row + rowChange;
        let j = square.col + colChange;

        while (board.isSquareOnBoard(Square.at(i,j)) && board.isSquareEmpty(Square.at(i, j))) {
            moves.push(Square.at(i, j));
            i += rowChange;
            j += colChange;
        }
        return moves;
    }
    public getLateralMoves(board: Board, square: Square) {
        const up = this.getDirectionalMoves(board, square, 1, 0);
        const down = this.getDirectionalMoves(board, square, -1, 0);
        const right = this.getDirectionalMoves(board, square, 0, 1);
        const left = this.getDirectionalMoves(board, square, 0, -1);
        const moves = [...up, ...down, ...right, ...left];
        return moves;
    }
}
