export declare class Tile<Coord_t, Piece_t> {
    readonly place: Coord_t;
    piece: Piece_t | null;
    constructor(place: Coord_t);
}
export declare abstract class Piece<Coord_t, Tile_t> {
    tile: Tile_t | null;
    abstract reachable(): Coord_t[];
}
//# sourceMappingURL=base.d.ts.map