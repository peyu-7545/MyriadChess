export class Tile<T extends { toString(): string }, Piece_t> {
    place: T; // 座標
    piece: Piece_t | null = null; // 駒

    constructor(place: T) {
        this.place = place;
    }
};

export class Piece<T extends { toString(): string }, Tile_t> {
    tile: Tile_t | null = null; // 置かれているタイル

    // abstract reachableTiles(coord: T): Tile<T, typeof this>[]
};