import { SHAPES, COLORS } from './Constants.js';

export class Piece {
    constructor(ctx) {
        this.ctx = ctx;
        this.spawn();
    }

    spawn() {
        this.typeId = this.randomizeTetrominoType(SHAPES.length - 1);
        this.shape = SHAPES[this.typeId];
        this.color = COLORS[this.typeId];
        this.x = 0; // Starting x
        this.y = 0; // Starting y
        this.hardDropped = false;
    }

    randomizeTetrominoType(noOfTypes) {
        return Math.floor(Math.random() * noOfTypes) + 1;
    }

    setStartingPosition() {
        this.x = 3; // Center horizontally roughly
        this.y = 0;
    }

    move(p) {
        this.x = p.x;
        this.y = p.y;
        this.shape = p.shape;
    }
}
