import Piece, { PieceType } from './piece';
import Player from '../player';
import Board from '../board';

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player, PieceType.ROOK);
    }

    public getAvailableMoves(board: Board) {
        const currSquare = board.findPiece(this);
        return this.getLateralMoves(board, currSquare);
    }
}
