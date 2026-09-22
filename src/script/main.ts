import { Tile, Piece } from './base.js';
import { ObjectKeyMap } from './util.js';

/* ------------- Global Variables ------------- */

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

canvas.width = 400;
canvas.height = 400;

const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const coord_to_tile = new ObjectKeyMap<Coord, NormalTile>(key => key.toString());

let selected: Coord | null = null;

const focus: Coord[] = [];

/* ------------- Utility Functions ------------- */

function getTile(coord: Coord) {
    return coord_to_tile.get(coord) as NormalTile;
}

function isOutside(coord: Coord) {
    return coord.x < 0 || 8 <= coord.x || coord.y < 0 || 8 <= coord.y;
}

/* ------------- Coordinate Class ------------- */

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

    clone() {
        return new Coord(this.x, this.y);
    }
};

/* ------------- Tile/Piece Class ------------- */

class NormalTile extends Tile<Coord, NormalPiece> {
    color: string;

    constructor(place: Coord, color: string) {
        super(place);
        this.color = color;
    }

    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(20 + 45 * this.place.x, 400 - (20 + 45 * this.place.y), 45, -45);
    }
};

abstract class NormalPiece extends Piece<Coord, NormalTile> {
    symbolText: piece_symbol

    constructor(symbolText: piece_symbol) {
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

/* ------------- Pieces ------------- */

class Rook extends NormalPiece {
    override reachable(): Coord[] {
        const result: Coord[] = [];

        for (const [dx, dy] of [[1, 0], [0, -1], [-1, 0], [0, 1]] as const) {

            const current = this.tile!.place.clone();

            while (true) {
                current.x += dx;
                current.y += dy;

                if (isOutside(current) || getTile(current).piece) break;

                result.push(current.clone());
            }
        }

        return result;
    }
}

class Bishop extends NormalPiece {
    override reachable(): Coord[] {
        const result: Coord[] = [];

        for (const [dx, dy] of [[1, 1], [1, -1], [-1, 1], [-1, -1]] as const) {

            const current = this.tile!.place.clone();

            while (true) {
                current.x += dx;
                current.y += dy;

                if (isOutside(current) || getTile(current).piece) break;

                result.push(current.clone());
            }
        }

        return result;
    }
}

class Porn extends NormalPiece {
    override reachable(): Coord[] {
        const result: Coord[] = [];

        const current = this.tile!.place.clone();
        current.y += 1;

        if (!(isOutside(current) || getTile(current).piece)) {
            result.push(current.clone());
        }

        return result;
    }
}

class Knight extends NormalPiece {
    override reachable(): Coord[] {
        const result: Coord[] = [];

        for (const [dx, dy] of [[1, 0], [0, -1], [-1, 0], [0, 1]] as const) {
            for (const n of [1, -1] as const) {
                const current = this.tile!.place.clone();

                current.x += 2 * dx + n * dy;
                current.y += 2 * dy + n * dx;

                if (isOutside(current) || getTile(current).piece) continue;

                result.push(current.clone());
            }
        }

        return result;
    }
}

class Queen extends NormalPiece {
    override reachable(): Coord[] {
        const result: Coord[] = [];

        for (const [dx, dy] of [[1, 0], [0, -1], [-1, 0], [0, 1], [1, 1], [1, -1], [-1, 1], [-1, -1]] as const) {

            const current = this.tile!.place.clone();

            while (true) {
                current.x += dx;
                current.y += dy;

                if (isOutside(current) || getTile(current).piece) break;

                result.push(current.clone());
            }
        }

        return result;
    }
}

class King extends NormalPiece {
    override reachable(): Coord[] {
        const result: Coord[] = [];

        for (const [dx, dy] of [[1, 0], [0, -1], [-1, 0], [0, 1], [1, 1], [1, -1], [-1, 1], [-1, -1]] as const) {

            const current = this.tile!.place.clone();

            current.x += dx;
            current.y += dy;

            if (isOutside(current) || getTile(current).piece) continue;

            result.push(current.clone());
        }

        return result;
    }
}

/* ------------- initialize game ------------- */

type piece_symbol = '♜' | '♞' | '♝' | '♛' | '♚' | '♟' |
    '♖' | '♘' | '♗' | '♕' | '♔' | '♙' |
    '＿';

const initialBoard: piece_symbol[][] = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['＿', '＿', '＿', '＿', '＿', '＿', '＿', '＿'],
    ['＿', '＿', '＿', '＿', '＿', '＿', '＿', '＿'],
    ['＿', '＿', '＿', '＿', '＿', '＿', '＿', '＿'],
    ['＿', '＿', '＿', '＿', '＿', '＿', '＿', '＿'],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
];

initialBoard.reverse().forEach((line, y) => {
    line.forEach((piece, x) => {
        const coord = new Coord(x, y);
        const tileColor = (x + y) % 2 === 0 ? '#312f2f' : '#e9d8d8';
        const tile = new NormalTile(coord, tileColor);

        coord_to_tile.set(coord, tile);

        let p: NormalPiece;

        switch (piece) {
            case '♜': case '♖': p = new Rook(piece); break;
            case '♝': case '♗': p = new Bishop(piece); break;
            case '♟': case '♙': p = new Porn(piece); break;
            case '♞': case '♘': p = new Knight(piece); break;
            case '♛': case '♕': p = new Queen(piece); break;
            case '♚': case '♔': p = new King(piece); break;
            default: return;
        }

        tile.piece = p;
        p.tile = tile;
    });
});

/* ------------- set event ------------- */

canvas.addEventListener('pointerdown', e => {

    let x = Math.floor((e.offsetX - 20) / 45);
    let y = Math.floor((400 - e.offsetY - 20) / 45);

    if (x < 0 || 8 <= x || y < 0 || 8 <= y) {
        return;
    }

    const pointerPosition = new Coord(x, y);
    
    console.log("pointer: ", pointerPosition);

    if (selected) {
        // 既に動く駒が選択されているとき
        // このポインタが駒が移動できるタイルにあるならそこへ移動する
        // でなければ何もしない

        if (focus.map(e => e.toString()).includes(new Coord(x, y).toString())) {
            console.log("move: " + selected + " -> " + pointerPosition);
        }

        selected = null;
        focus.length = 0;
    } else {
        // 選択されていないとき、このポインタの位置にある駒を選択する

        const tile = getTile(pointerPosition);

        if (tile.piece) {
            focus.length = 0;
            tile.piece.reachable().forEach(e => focus.push(e));

            selected = pointerPosition;
        }
    }
});

/* ------------- rendering ------------- */

function render() {

    // 背景
    ctx.fillStyle = '#312f2f';
    ctx.fillRect(0, 0, 400, 400);

    // タイルと駒
    coord_to_tile.forEach((tile) => {
        tile.render();
        tile.piece?.render();
    });

    if (selected) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#10b1bd';
        ctx.strokeRect(20 + 45 * selected.x, 400 - (20 + 45 * selected.y), 45, -45);
    }

    focus.forEach(e => {
        ctx.fillStyle = "#c0b32150";
        ctx.fillRect(20 + 45 * e.x, 400 - (20 + 45 * e.y), 45, -45);
    });

    requestAnimationFrame(render);
}

window.addEventListener('load', () => {
    requestAnimationFrame(render);
});