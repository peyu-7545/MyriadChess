export declare class Tile<T extends {
    toString(): string;
}, Piece_t> {
    place: T;
    piece: Piece_t | null;
    constructor(place: T);
}
export declare class Piece<T extends {
    toString(): string;
}, Tile_t> {
    tile: Tile_t | null;
}
//# sourceMappingURL=base.d.ts.map