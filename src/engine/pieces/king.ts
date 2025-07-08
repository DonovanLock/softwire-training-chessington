import Piece, { PieceType } from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import Rook from './rook';

type Move = [row:number,col:number];

export default class King extends Piece {
    private moveList : Move[]= [[1,1],[1,0],[1,-1],[0,1],[0,-1],[-1,1],[-1,0],[-1,-1]];
    private STARTING_ROW : number;
    public constructor(player: Player) {
        super(player, PieceType.KING);
        if (player === Player.WHITE) {
            this.STARTING_ROW = 0;
        }
        else {
            this.STARTING_ROW = 7;
        }
    }

    public getAvailableMoves(board: Board) {
        const currSquare = board.findPiece(this);
        const moves = [];
        for (let move of this.moveList) {
            const newSquare = Square.at(currSquare.row + move[0], currSquare.col + move[1]);
            if (board.isSquareOnBoard(newSquare)
                && board.getPiece(newSquare)?.pieceType !== PieceType.KING
                && board.getPiece(newSquare)?.player !== this.player) {
                moves.push(newSquare);
            }
        }
        if (!this.hasMoved) {
            const leftRook = board.getPiece(Square.at(this.STARTING_ROW,0));
            const rightRook = board.getPiece(Square.at(this.STARTING_ROW,7));
            if (leftRook?.pieceType === PieceType.ROOK
                && !leftRook.hasMoved
                && (leftRook as Rook).getAvailableMoves(board).some(
                    square => square.equals(Square.at(this.STARTING_ROW,3)))) {
                    moves.push(Square.at(this.STARTING_ROW,2));
            }
            if (rightRook?.pieceType === PieceType.ROOK
                && !rightRook.hasMoved
                && (rightRook as Rook).getAvailableMoves(board).some(
                    square => square.equals(Square.at(this.STARTING_ROW,5)))) {
                    moves.push(Square.at(this.STARTING_ROW,6));
            }
        }
        return moves;
    }
}
