import Player from '../player';
import Board from '../board';
import Square from '../square';

export enum PieceType {
    PAWN,
    KNIGHT,
    BISHOP,
    ROOK,
    QUEEN,
    KING
}

export default class Piece {
    public player: Player;
    public pieceType: PieceType;
    public hasMoved: boolean;

    public constructor(player: Player, pieceType: PieceType) {
        this.player = player;
        this.pieceType = pieceType;
        this.hasMoved = false
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        this.hasMoved = true;
        board.movePiece(currentSquare, newSquare);
    }

    public getDiagonalMoves(board: Board, square: Square) {
        const upRight = this.getDirectionalMoves(board, square, 1, 1);
        const downRight = this.getDirectionalMoves(board, square, -1, 1);
        const downLeft = this.getDirectionalMoves(board, square, -1, -1);
        const upLeft = this.getDirectionalMoves(board, square, 1, -1);
        const moves = [...upRight, ...downRight, ...downLeft, ...upLeft];
        return moves;
    }

    public getDirectionalMoves(board: Board, square: Square, rowChange: number, colChange: number) {
        const moves = [];
        let i = square.row + rowChange;
        let j = square.col + colChange;
        let currSquare = Square.at(i,j);
        while (board.isSquareOnBoard(currSquare) && board.isSquareEmpty(currSquare)) {
            moves.push(currSquare);
            i += rowChange;
            j += colChange;
            currSquare = Square.at(i,j);
        }
        if (board.isSquareOnBoard(currSquare)) {
            let victimPiece = board.getPiece(currSquare);
            let attackingPiece = board.getPiece(square);
            if (victimPiece && attackingPiece && victimPiece.player !== attackingPiece.player) {
                if (victimPiece.pieceType !== PieceType.KING) {
                    moves.push(currSquare);
                }
            }
        }
        return moves;
    }
    public getLateralMoves(board: Board, square: Square) {
        const up = this.getDirectionalMoves(board, square, 1, 0);
        const down = this.getDirectionalMoves(board, square, -1, 0);
        const right = this.getDirectionalMoves(board, square, 0, 1);
        const left = this.getDirectionalMoves(board, square, 0, -1);
        const moves = [...up, ...down, ...right, ...left];
        return moves;
    }
}
