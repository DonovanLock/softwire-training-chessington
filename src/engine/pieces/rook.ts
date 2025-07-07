import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currSquare = board.findPiece(this);
        const moves = [];
        const row = currSquare.row;
        const col = currSquare.col;
        for (let i = 0; i < 8; i++) {
            if (i != row) {
                moves.push(Square.at(i,col));
            }
            if (i != col) {
                moves.push(Square.at(row,i));
            }
        }
        return moves;
    }
}
