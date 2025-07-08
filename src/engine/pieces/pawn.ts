import Piece, { PieceType } from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

//EN PASSANT:
//things to track:
//attacking pawn is on the correct row
//victim pawn has just moved two spaces
//  (every move which is not a two-pawn move should reset this bool to false)


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

        let nextSquare = Board.getForwardSquare(currentSquare, colour);
        const leftDiagSquare = Square.at(nextSquare.row, nextSquare.col - 1);
        const rightDiagSquare = Square.at(nextSquare.row, nextSquare.col + 1);
        const leftSquare = Square.at(currentSquare.row, currentSquare.col - 1);
        const rightSquare = Square.at(currentSquare.row, currentSquare.col + 1);

        if ((board.isSquareOnBoard(leftDiagSquare) 
                && board.getPiece(leftDiagSquare)
                && board.getPiece(leftDiagSquare)?.pieceType !== PieceType.KING
                && board.getPiece(leftDiagSquare)?.player !== this.player) 
            || (
                board.pawnMoved2Steps 
                && board.findPiece(board.pawnMoved2Steps).equals(leftSquare)
            )) {
                moves.push(leftDiagSquare);
        }
        if ((board.isSquareOnBoard(rightDiagSquare)
            && board.getPiece(rightDiagSquare)
            && board.getPiece(rightDiagSquare)?.pieceType !== PieceType.KING
            && board.getPiece(rightDiagSquare)?.player !== this.player)
        || (
            board.pawnMoved2Steps
            && board.findPiece(board.pawnMoved2Steps).equals(rightSquare)
        )) {
                moves.push(rightDiagSquare);
        }
        if (board.isSquareOnBoard(nextSquare) && board.isSquareEmpty(nextSquare)) {
            moves.push(nextSquare);
            nextSquare = Board.getForwardSquare(nextSquare, colour);
            if (board.isSquareEmpty(nextSquare) && currentSquare.row === this.STARTING_ROW) {
                moves.push(nextSquare);
            }
        }
        return moves;
    }
}
