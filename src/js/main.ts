import { Tile, Piece } from './base.js';
import { ObjectKeyMap } from './util.js';

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

canvas.width = 400;
canvas.height = 400;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

class NormalTile extends Tile<Coord> {
    color; // 色

    renderFn = (place: Coord) => {
        ctx.fillStyle = this.color;
        ctx.fillRect(20 + 45 * place.x, 400 - (20 + 45 * place.y), 45, -45);
    }

    constructor(place: Coord, color: string) {
        super(place);
        this.color = color;
    }
};

class NormalPiece extends Piece<Coord> {
    symbolText;

    renderFn = (place: Coord) => {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = "45px sans-serif";
        ctx.fillStyle = "#1cb019";
        ctx.fillText(this.symbolText, 20 + 45 / 2 + 45 * place.x, 400 - (20 + 45 / 2 + 45 * place.y));
    }

    constructor(symbolText: string) {
        super();
        this.symbolText = symbolText;
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

const coord_to_tile = new ObjectKeyMap<Coord, Tile<Coord>>(key => key.toString());

function getTile(coord: Coord) {
    return coord_to_tile.get(coord);
}

function render() {
    console.log("rendering...");

    // 背景
    ctx.fillStyle = "#0c0e4e";
    ctx.fillRect(0, 0, 400, 400);

    // タイルと駒
    coord_to_tile.forEach((tile, coord) => {
        tile.render();
        tile.piece?.render();
    });
}

[
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
    ["＿", "＿", "＿", "＿", "＿", "＿", "＿", "＿"],
    ["＿", "＿", "＿", "＿", "＿", "＿", "＿", "＿"],
    ["＿", "＿", "＿", "＿", "＿", "＿", "＿", "＿"],
    ["＿", "＿", "＿", "＿", "＿", "＿", "＿", "＿"],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]
].reverse().forEach((line, y) => {
    line.forEach((piece, x) => {
        const coord = new Coord(x, y);
        const tileColor = (x + y) % 2 == 0 ? "#312f2f" : "#e9d8d8";
        const tile = new NormalTile(coord, tileColor);

        coord_to_tile.set(coord, tile);

        if (piece == "＿") return;

        const p = new NormalPiece(piece);
        tile.piece = p;
        p.tile = tile;
    });
});

let selected = null;

canvas.addEventListener('mousedown', e => {

    let x = Math.floor((e.offsetX - 20) / 45);
    let y = Math.floor((400 - e.offsetY - 20) / 45);

    if (x < 0 || 8 <= x || y < 0 || 8 <= y) {
        return;
    }

    selected = new Coord(x, y);

    console.log(x, y, getTile(new Coord(x, y)));
});

render();