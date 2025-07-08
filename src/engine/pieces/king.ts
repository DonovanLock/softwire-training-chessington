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
                && board.getPiece(newSquare)?.pieceType !== "king"
                && board.getPiece(newSquare)?.player !== this.player) {
                moves.push(newSquare);
            }
        }
        if (!this.hasMoved) {
            const leftRook = board.getPiece(Square.at(this.STARTING_ROW,0));
            const rightRook = board.getPiece(Square.at(this.STARTING_ROW,7));
            if (leftRook instanceof Rook
                && !leftRook.hasMoved
                && leftRook.getAvailableMoves(board).some(
                    square => square.equals(Square.at(this.STARTING_ROW,3)))) {
                    moves.push(Square.at(this.STARTING_ROW,2));
            }
            if (rightRook instanceof Rook
                && !rightRook.hasMoved
                && rightRook.getAvailableMoves(board).some(
                    square => square.equals(Square.at(this.STARTING_ROW,5)))) {
                    moves.push(Square.at(this.STARTING_ROW,6));
            }
        }
        return moves;
    }

    public moveTo(board: Board, newSquare: Square) {
        if (!this.hasMoved) {
            if (newSquare.equals(Square.at(this.STARTING_ROW,2))) {
                const movedRook = board.getPiece(Square.at(this.STARTING_ROW, 0));
                board.setPiece(Square.at(this.STARTING_ROW, 0), undefined);
                board.setPiece(Square.at(this.STARTING_ROW, 3), movedRook);
                if (movedRook) {
                    movedRook.hasMoved = true;
                }
            }
            else if (newSquare.equals(Square.at(this.STARTING_ROW,6))) {
                const movedRook = board.getPiece(Square.at(this.STARTING_ROW, 7));
                board.setPiece(Square.at(this.STARTING_ROW, 7), undefined);
                board.setPiece(Square.at(this.STARTING_ROW, 5), movedRook);
                movedRook!.hasMoved = true;
            }
        }
        super.moveTo(board, newSquare);
    }
}
