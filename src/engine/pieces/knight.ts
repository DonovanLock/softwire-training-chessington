import Piece, { PieceType } from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

type Move = [row:number,col:number];

export default class Knight extends Piece {
    private moveList : Move[]= [[1,2],[1,-2],[-1,2],[-1,-2],[2,1],[-2,1],[2,-1],[-2,-1]];
    public constructor(player: Player) {
        super(player, PieceType.KNIGHT);
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
        return moves;
    }
}
