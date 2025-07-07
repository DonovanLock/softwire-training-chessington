import Piece, { PieceType } from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Pawn extends Piece {
    private STARTING_ROW: number;
    public constructor(player: Player) {
        super(player, PieceType.PAWN);
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

        const getForwardSquare = (square: Square, colour: Player) => {
            if (colour === Player.WHITE) {
                return Square.at(square.row + 1, square.col);
            }
            else {
                return Square.at(square.row - 1, square.col);
            }
        }

        let nextSquare = getForwardSquare(currentSquare, colour);
        const leftSquare = Square.at(nextSquare.row, nextSquare.col - 1);
        const rightSquare = Square.at(nextSquare.row, nextSquare.col + 1);
        if (board.isSquareOnBoard(leftSquare)
            && board.getPiece(leftSquare)
            && board.getPiece(leftSquare)?.pieceType !== PieceType.KING
            && board.getPiece(leftSquare)?.player !== this.player) {
                moves.push(leftSquare);
        }
        if (board.isSquareOnBoard(rightSquare)
            && board.getPiece(rightSquare)
            && board.getPiece(rightSquare)?.pieceType !== PieceType.KING
            && board.getPiece(rightSquare)?.player !== this.player) {
                moves.push(rightSquare);
        }

        if (board.isSquareOnBoard(nextSquare) && board.isSquareEmpty(nextSquare)) {
            moves.push(nextSquare);
            nextSquare = getForwardSquare(nextSquare, colour);
            if (board.isSquareEmpty(nextSquare) && currentSquare.row === this.STARTING_ROW) {
                moves.push(nextSquare);
            }
        }
        return moves;
    }
}
