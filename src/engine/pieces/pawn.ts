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

        const isSquareEmpty = (square: Square) => {
            return board.getPiece(square) === undefined;
        }

        const getForwardSquare = (square: Square, colour: Player) => {
            if (colour === Player.WHITE) {
                return Square.at(square.row + 1, square.col);
            }
            else {
                return Square.at(square.row - 1, square.col);
            }
        }

        let nextSquare = getForwardSquare(currentSquare, colour);
        if (isSquareEmpty(nextSquare)) {
            moves.push(nextSquare);
            nextSquare = getForwardSquare(nextSquare, colour);
            if (isSquareEmpty(nextSquare) && currentSquare.row === this.STARTING_ROW) {
                moves.push(nextSquare);
            }
        }
        return moves;
    }
}
