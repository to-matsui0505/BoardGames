// オセロの駒クラス
class OthelloPiece {
    // 駒の色
    private _color: OthelloPieceColor;
    // 駒の色のプロパティ
    public get color(): OthelloPieceColor {
        return this._color;
    }
    public set color(value: OthelloPieceColor) {
        this._color = value;
    }
    // コンストラクタで駒の色を設定
    constructor(color: OthelloPieceColor) {
        this._color = color;
    }
    // 駒の色を反転
    public reverse() {
        if (this._color === OthelloPieceColor.Black) {
            this._color = OthelloPieceColor.White;
        } else if (this._color === OthelloPieceColor.White) {
            this._color = OthelloPieceColor.Black;
        }
    }
}

// オセロの色の列挙型
enum OthelloPieceColor {
    None = 0,
    Black = 1,
    White = 2
}