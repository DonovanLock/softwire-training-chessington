import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currSquare = board.findPiece(this);
        const moves = [];
        const row = currSquare.row;
        const col = currSquare.col;
        for (let i = 1; row + i < 8 && col + i < 8; i++) {
            moves.push(Square.at(row + i, col + i));
        }
        for (let i = 1; row - i >= 0 && col + i < 8; i++) {
            moves.push(Square.at(row - i, col + i));
        }
        for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
            moves.push(Square.at(row - i, col - i));
        }
        for (let i = 1; row + i < 8 && col - i >= 0; i++) {
            moves.push(Square.at(row + i, col - i));
        }
        return moves;
    }
}
