import './style.css';
import { Game } from './src/Game.js';
import { COLS, ROWS, BLOCK_SIZE } from './src/Constants.js';

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// Calculate canvas size
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// Scale for high DPI devices (optional but good for premium feel)
// For now, simple 1-1 mapping to keep logic simple, renderer handles block size multiplier

const game = new Game(ctx);

document.querySelector('#play-btn').addEventListener('click', () => {
    document.querySelector('.start-screen').style.display = 'none';
    game.start();
});
