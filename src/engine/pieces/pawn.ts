import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Pawn extends Piece {
    private STARTING_ROW: number;
    public constructor(player: Player) {
        super(player);
        if (player === Player.WHITE) {
            this.STARTING_ROW = 1;
        }
        else {
            this.STARTING_ROW = 6;
        }
    }

    public getAvailableMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        const moves: Square[] = [];
        const colour = this.player;

        function pawnMove(squaresMoved: number, colour: Player) {
            if (colour === Player.WHITE) {
                moves.push(Square.at(currentSquare.row + squaresMoved, currentSquare.col));
            }
            else {
                moves.push(Square.at(currentSquare.row - squaresMoved, currentSquare.col));
            }
        }

        pawnMove(1,colour);
        if (currentSquare.row === this.STARTING_ROW) {
            pawnMove(2,colour);
        }
        return moves;
    }
}
