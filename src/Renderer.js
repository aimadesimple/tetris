import { COLS, ROWS, BLOCK_SIZE, COLORS } from './Constants.js';

export class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    draw(board, piece) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.drawBoard(board);
        this.drawPiece(piece);
    }

    drawBoard(board) {
        board.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillStyle = COLORS[value];
                    // Add a subtle glow/shadow for premium feel
                    this.ctx.shadowBlur = 10;
                    this.ctx.shadowColor = COLORS[value];
                    this.ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
                    this.ctx.shadowBlur = 0;
                }
            });
        });
    }

    drawPiece(piece) {
        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillStyle = COLORS[piece.typeId]; // Or use specific colors logic
                    this.ctx.shadowBlur = 15;
                    this.ctx.shadowColor = COLORS[piece.typeId];
                    this.ctx.fillRect((piece.x + x) * BLOCK_SIZE, (piece.y + y) * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
                    this.ctx.shadowBlur = 0;
                }
            });
        });
    }
}
