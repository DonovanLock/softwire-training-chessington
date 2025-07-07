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

    public getDiagonalMoves(square: Square) {
        const moves = [];
        const row = square.row;
        const col = square.col;
        for (let i = 1; row + i < GameSettings.BOARD_SIZE && col + i < GameSettings.BOARD_SIZE; i++) {
            moves.push(Square.at(row + i, col + i));
        }
        for (let i = 1; row - i >= 0 && col + i < GameSettings.BOARD_SIZE; i++) {
            moves.push(Square.at(row - i, col + i));
        }
        for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
            moves.push(Square.at(row - i, col - i));
        }
        for (let i = 1; row + i < GameSettings.BOARD_SIZE && col - i >= 0; i++) {
            moves.push(Square.at(row + i, col - i));
        }
        return moves;
    }

    public getLateralMoves(board: Board, square: Square) {
        const moves = [];
        let i = square.row - 1;
        while (i >= 0 && board.isSquareEmpty(Square.at(i, square.col))) {
            moves.push(Square.at(i, square.col));
            i--;
        }
        i = square.row + 1;
        while (i < GameSettings.BOARD_SIZE && board.isSquareEmpty(Square.at(i, square.col))) {
            moves.push(Square.at(i, square.col));
            i++;
        }
        i = square.col - 1;
        while (i >= 0 && board.isSquareEmpty(Square.at(square.row, i))) {
            moves.push(Square.at(square.row, i));
            i--;
        }
        i = square.col + 1;
        while (i < GameSettings.BOARD_SIZE && board.isSquareEmpty(Square.at(square.row, i))) {
            moves.push(Square.at(square.row, i));
            i++;
        }
        return moves;
    }
}
