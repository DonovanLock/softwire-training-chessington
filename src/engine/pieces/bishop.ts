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
        return this.getDiagonalMoves(currSquare);
    }
}
