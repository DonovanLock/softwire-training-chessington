import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Piece, { PieceType } from './pieces/piece';

export default class Board {
    public currentPlayer: Player;
    private readonly board: (Piece | undefined)[][];
    public pawnMoved2Steps : (Piece | undefined);

    public constructor(currentPlayer?: Player) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
    }

    public setPiece(square: Square, piece: Piece | undefined) {
        this.board[square.row][square.col] = piece;
    }

    public getPiece(square: Square) {
        return this.board[square.row][square.col];
    }

    public isSquareEmpty(square: Square) {
        return this.getPiece(square) === undefined;
    }

    public isSquareOnBoard(square: Square) {
        let row = square.row;
        let col = square.col;
        return (0 <= row && row < GameSettings.BOARD_SIZE) && (0 <= col && col < GameSettings.BOARD_SIZE)
    }

    public findPiece(pieceToFind: Piece) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    public static getForwardSquare(square: Square, colour: Player) {
        if (colour === Player.WHITE) {
            return Square.at(square.row + 1, square.col);
        }
        else {
            return Square.at(square.row - 1, square.col);
        }
    }

    public static getBackwardSquare(square: Square, colour: Player) {
        if (colour === Player.WHITE) {
            return Square.at(square.row - 1, square.col);
        }
        else {
            return Square.at(square.row + 1, square.col);
        }
    }

    public movePiece(fromSquare: Square, toSquare: Square) {
        const movingPiece = this.getPiece(fromSquare);        
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            if (movingPiece.pieceType === "pawn" && 
                Board.getForwardSquare(Board.getForwardSquare(fromSquare, this.currentPlayer), this.currentPlayer).equals(toSquare)
                ) {
                    this.pawnMoved2Steps = movingPiece;
            }
            else {
                this.pawnMoved2Steps = undefined;
            }
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
        }
    }

    private createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }
}
