import { COLS, ROWS, BLOCK_SIZE, POINTS, LEVEL_SPEED } from './Constants.js';
import { Board } from './Board.js';
import { Piece } from './Piece.js';
import { Renderer } from './Renderer.js';
import { Input } from './Input.js';

export class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.board = new Board(ctx);
        this.piece = null; // Current piece
        this.nextPiece = null; // Preview piece logic could be added here
        this.renderer = new Renderer(ctx);
        this.input = new Input(this);
        this.points = POINTS;

        this.score = 0;
        this.lines = 0;
        this.level = 0;
        this.gameOver = false;
        this.animationId = null;
        this.lastTime = 0;
        this.dropCounter = 0;
        this.dropInterval = LEVEL_SPEED[0];
    }

    start() {
        this.reset();
        this.piece = new Piece(this.ctx);
        this.piece.setStartingPosition();
        this.animate();
    }

    reset() {
        this.board = new Board(this.ctx);
        this.score = 0;
        this.lines = 0;
        this.level = 0;
        this.gameOver = false;
        this.dropInterval = LEVEL_SPEED[0];
        this.updateScore();
    }

    animate(time = 0) {
        const deltaTime = time - this.lastTime;
        this.lastTime = time;

        this.dropCounter += deltaTime;
        if (this.dropCounter > this.dropInterval) {
            this.drop();
            this.dropCounter = 0;
        }

        this.renderer.draw(this.board, this.piece);

        if (!this.gameOver) {
            this.animationId = requestAnimationFrame(this.animate.bind(this));
        } else {
            this.drawGameOver();
        }
    }

    drop() {
        let p = this.board.drop(this.piece);
        if (this.board.isValid(p)) {
            this.piece.move(p);
        } else {
            this.lockPiece();
        }
    }

    lockPiece() {
        this.board.freeze(this.piece);

        // Clear lines
        const linesCleared = this.board.clearLines();
        if (linesCleared > 0) {
            this.updateDetails(linesCleared);
        }

        // Spawn new piece
        this.piece = new Piece(this.ctx);
        this.piece.setStartingPosition();

        // Game Over check
        if (!this.board.isValid(this.piece)) {
            this.gameOver = true;
        }
    }

    movePiece(x, y) {
        let p = JSON.parse(JSON.stringify(this.piece));
        p.x += x;
        p.y += y;
        if (this.board.isValid(p)) {
            this.piece.move(p);
        }
    }

    rotatePiece() {
        let p = this.board.rotate(this.piece);
        if (this.board.isValid(p)) {
            this.piece.move(p);
        }
    }

    updateDetails(lines) {
        this.lines += lines;
        if (lines === 1) this.score += POINTS.SINGLE * (this.level + 1);
        else if (lines === 2) this.score += POINTS.DOUBLE * (this.level + 1);
        else if (lines === 3) this.score += POINTS.TRIPLE * (this.level + 1);
        else if (lines === 4) this.score += POINTS.TETRIS * (this.level + 1);

        // Level up every 10 lines
        this.level = Math.floor(this.lines / 10);
        this.dropInterval = LEVEL_SPEED[Math.min(this.level, LEVEL_SPEED.length - 1)];

        this.updateScore();
    }

    updateScore() {
        // Use DOM update if we have reference, or just rely on state. 
        // Ideally we should dispatch event or update DOM directly if we had consistent access.
        // For this setup, we'll assume global functions or selector access in module scope
        const scoreElement = document.getElementById('score');
        const linesElement = document.getElementById('lines');
        const levelElement = document.getElementById('level');
        if (scoreElement) scoreElement.innerText = this.score;
        if (linesElement) linesElement.innerText = this.lines;
        if (levelElement) levelElement.innerText = this.level;
    }

    drawGameOver() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.font = '2px Arial'; // Adjusted for small canvas scale if necessary, but BLOCK_SIZE handles scale
        // Actually we are drawing in pixels, context is not scaled unless we play with it.
        // 10 cols * 30 = 300 width.
        this.ctx.fillStyle = 'white';
        this.ctx.font = '40px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
    }
}
