import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        const moves = [];
        if (this.player === Player.WHITE) {
            moves.push(Square.at(currentSquare.row + 1, currentSquare.col));
        }
        else {
            moves.push(Square.at(currentSquare.row - 1, currentSquare.col));
        }
        return moves;
    }
}
