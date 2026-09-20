import { Tile, Piece } from './base.js';
import { ObjectKeyMap } from './util.js';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

canvas.width = 400;
canvas.height = 400;

const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

class NormalTile extends Tile<Coord, NormalPiece> {
    color; // 色
    constructor(place: Coord, color: string) {
        super(place);
        this.color = color;
    }

    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(20 + 45 * this.place.x, 400 - (20 + 45 * this.place.y), 45, -45);
    }
};

class NormalPiece extends Piece<Coord, NormalTile> {
    symbolText;

    constructor(symbolText: string) {
        super();
        this.symbolText = symbolText;
    }

    render() {
        if (!this.tile || !this.tile.place) return;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '45px sans-serif';
        ctx.fillStyle = '#1cb019';
        ctx.fillText(this.symbolText, 20 + 45 / 2 + 45 * this.tile.place.x, 400 - (20 + 45 / 2 + 45 * this.tile.place.y));
    }
}

class Coord {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `${this.x} ${this.y}`;
    }
};

const coord_to_tile = new ObjectKeyMap<Coord, NormalTile>(key => key.toString());

function getTile(coord: Coord) {
    return coord_to_tile.has(coord) ? coord_to_tile.get(coord)! : null;
}

[
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['＿', '＿', '＿', '＿', '＿', '＿', '＿', '＿'],
    ['＿', '＿', '＿', '＿', '＿', '＿', '＿', '＿'],
    ['＿', '＿', '＿', '＿', '＿', '＿', '＿', '＿'],
    ['＿', '＿', '＿', '＿', '＿', '＿', '＿', '＿'],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
].reverse().forEach((line, y) => {
    line.forEach((piece, x) => {
        const coord = new Coord(x, y);
        const tileColor = (x + y) % 2 === 0 ? '#312f2f' : '#e9d8d8';
        const tile = new NormalTile(coord, tileColor);

        coord_to_tile.set(coord, tile);

        if (piece === '＿') return;

        const p = new NormalPiece(piece);
        tile.piece = p;
        p.tile = tile;
    });
});

let selected: Coord | null = null;

canvas.addEventListener('mousedown', e => {

    let x = Math.floor((e.offsetX - 20) / 45);
    let y = Math.floor((400 - e.offsetY - 20) / 45);

    if (x < 0 || 8 <= x || y < 0 || 8 <= y) {
        return;
    }

    selected = new Coord(x, y);

    // console.log(x, y, getTile(new Coord(x, y)));

    console.log(reachableTiles_rook(selected));
});

function render() {

    // 背景
    ctx.fillStyle = '#0c0e4e';
    ctx.fillRect(0, 0, 400, 400);

    // タイルと駒
    coord_to_tile.forEach((tile, coord) => {
        tile.render();
        tile.piece?.render();
    });

    if (selected) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#10b1bd';
        ctx.strokeRect(20 + 45 * selected.x, 400 - (20 + 45 * selected.y), 45, -45);
    }

    requestAnimationFrame(render);
}

window.addEventListener('load', () => {
    requestAnimationFrame(render);
});

// getTileで座標から駒の情報を得られる

// 場外判定
function isOutside(coord: Coord) {
    return coord.x < 0 || 8 <= coord.x || coord.y < 0 || 8 <= coord.y;
}

function isInside(coord: Coord) {
    return !isOutside(coord);
}

function reachableTiles_rook(coord: Coord) {

    const reachable: Coord[] = [];

    for (const [dx, dy] of [[1, 0], [0, -1], [-1, 0], [0, 1]] as const) {

        const current = structuredClone(coord);

        while (true) {
            current.x += dx;
            current.y += dy;

            if (isOutside(current) || getTile(current) !== null) break;

            reachable.push(structuredClone(current));
        }
    }

    return reachable;
}