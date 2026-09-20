export class Tile {
    place; // 座標
    piece = null; // 駒
    constructor(place) {
        this.place = place;
    }
}
;
export class Piece {
    tile = null; // 置かれているタイル
}
;
//# sourceMappingURL=base.js.map