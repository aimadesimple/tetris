import { KEY } from './Constants.js';

export class Input {
    constructor(game) {
        this.game = game;
        document.addEventListener('keydown', event => {
            // Prevent default behavior for game keys (scrolling)
            if ([KEY.LEFT, KEY.RIGHT, KEY.UP, KEY.DOWN, KEY.SPACE].includes(event.key)) {
                event.preventDefault();
            }

            if (this.game.isGameOver) return;
            if (this.game.isPaused && event.key !== 'p') return; // Only allow unpausing if implementing pause

            if (event.key === KEY.LEFT) {
                this.game.movePiece(-1, 0);
            } else if (event.key === KEY.RIGHT) {
                this.game.movePiece(1, 0);
            } else if (event.key === KEY.DOWN) {
                this.game.movePiece(0, 1);
                this.game.score += this.game.points.SOFT_DROP;
            } else if (event.key === KEY.UP) {
                this.game.rotatePiece();
            } else if (event.key === KEY.SPACE) {
                // Hard drop
                let p = this.game.piece;
                while (this.game.board.isValid(this.game.board.drop(p))) {
                    this.game.piece.move(this.game.board.drop(p));
                    this.game.score += this.game.points.HARD_DROP;
                }
                this.game.piece.hardDropped = true; // Flag to lock immediately in next loop tick or now
                this.game.lockPiece(); // Immediate lock
            }
        });
    }
}
