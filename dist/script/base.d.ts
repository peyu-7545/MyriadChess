export declare class Tile<Coord_t extends {
    toString(): string;
}, Piece_t> {
    place: Coord_t;
    piece: Piece_t | null;
    constructor(place: Coord_t);
}
export declare abstract class Piece<Coord_t extends {
    toString(): string;
}, Tile_t> {
    tile: Tile_t | null;
    abstract reachable(): Coord_t[];
}
//# sourceMappingURL=base.d.ts.map