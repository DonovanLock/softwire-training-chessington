import Piece, { PieceType } from './piece';
import Player from '../player';
import Board from '../board';

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player,PieceType.BISHOP);
    }

    public getAvailableMoves(board: Board) {
        const currSquare = board.findPiece(this);
        return this.getDiagonalMoves(board, currSquare);
    }
}
