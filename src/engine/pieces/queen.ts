import Piece from './piece';
import Player from '../player';
import Board from '../board';

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currSquare = board.findPiece(this);
        const diagonals = this.getDiagonalMoves(currSquare);
        const laterals = this.getLateralMoves(board, currSquare);
        return [...laterals,...diagonals];
    }
}
