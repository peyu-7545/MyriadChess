class Tile {
    place; // 座標
    piece = null; // 駒
    renderFn; // 描画関数

    constructor(place) {
        this.place = place;
        Tile.coord_to_tile.set(place.toString(), this);
    }

    render() {
        this.renderFn(this.place);
    }

    // Coordの実装に依存するのは避けたい
    static coord_to_tile = new ObjectKeyMap(key => key.toString());

    static getTile(coord) {
        return this.coord_to_tile.get(coord);
    }
};

class Piece {
    tile; // 置かれている場所
    renderFn; // 描画関数

    render() {
        this.renderFn(this.tile.place);
    }
};

// ------------

const canvas = document.getElementById("canvas");

canvas.width = 400;
canvas.height = 400;

const ctx = canvas.getContext("2d");

ctx.fillStyle = "#0c0e4e";
ctx.fillRect(0, 0, 400, 400);

class NormalTile extends Tile {
    color; // 色

    renderFn = (place) => {
        ctx.fillStyle = this.color;
        ctx.fillRect(20 + 45 * place.x, 400 - (20 + 45 * place.y), 45, -45);
    }

    constructor(place, color) {
        super(place);
        this.color = color;
    }
};

class NormalPiece extends Piece {
    symbolText;

    renderFn = (place) => {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = "45px sans-serif";
        ctx.fillStyle = "#1cb019";
        ctx.fillText(this.symbolText, 20 + 45 / 2 + 45 * place.x, 400 - (20 + 45 / 2 + 45 * place.y));
    }

    constructor(symbolText) {
        super();
        this.symbolText = symbolText;
    }
}

class Coord {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `${this.x} ${this.y}`;
    }
};

const w = [
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
    ["＿", "＿", "＿", "＿", "＿", "＿", "＿", "＿"],
    ["＿", "＿", "＿", "＿", "＿", "＿", "＿", "＿"],
    ["＿", "＿", "＿", "＿", "＿", "＿", "＿", "＿"],
    ["＿", "＿", "＿", "＿", "＿", "＿", "＿", "＿"],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]
].reverse();

w.forEach((e, y) => {
    e.forEach((ee, x) => {
        const coord = new Coord(x, y);
        const tile = new NormalTile(coord, (x + y) % 2 == 0 ? "#312f2f" : "#e9d8d8");
        tile.render();
        if (ee == "＿") return;
        const p = new NormalPiece(ee);
        tile.piece = p;
        p.tile = tile;
        p.render();
    })
});

// console.log(Tile.coord_to_tile);

// console.log(Tile.getTile(new Coord(0, 0)));