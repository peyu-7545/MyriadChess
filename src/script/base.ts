export class Tile<Coord_t extends { toString(): string }, Piece_t> {
    place: Coord_t; // 座標
    piece: Piece_t | null = null; // 駒

    constructor(place: Coord_t) {
        this.place = place;
    }
};

export abstract class Piece<Coord_t extends { toString(): string }, Tile_t> {
    tile: Tile_t | null = null; // 置かれているタイル

    abstract reachable(): Coord_t[]
};