export class Tile<T extends { toString(): string }> {
    place: T; // 座標
    piece: Piece<T> | null = null; // 駒
    renderFn: (place: T) => void = () => {}; // 描画関数

    constructor(place: T) {
        this.place = place;
    }

    render() {
        this.renderFn(this.place);
    }
};

export class Piece<T extends { toString(): string }> {
    tile: Tile<T> | null = null; // 置かれているタイル
    renderFn: (place: T) => void = () => {}; // 描画関数

    render() {
        this.tile != null && this.tile.place != null && this.renderFn(this.tile.place);
    }
};