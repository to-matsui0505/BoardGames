// オセロの盤面クラス
class OthelloBoard {
    // 方向を表す定数
    public static readonly DIRECTION = [
        [-1, -1], // 左上
        [0, -1], // 上
        [1, -1], // 右上
        [1, 0], // 右
        [1, 1], // 右下
        [0, 1], // 下
        [-1, 1], // 左下
        [-1, 0] // 左
    ];
    // 盤面の状態
    private _board: OthelloPiece[][];
    // 盤面の状態のプロパティ
    public get board(): OthelloPiece[][] {
        return this._board;
    }
    // コンストラクタで盤面のサイズを受け取って初期化
    constructor(size: number) {
        this._board = [];
        for (let i = 0; i < size; i++) {
            this._board[i] = [];
            for (let j = 0; j < size; j++) {
                this._board[i][j] = new OthelloPiece(OthelloPieceColor.None);
            }
        }
    }
    // 盤面の状態を初期化
    public init() {
        // 盤面のサイズを取得
        const size = this._board.length;
        // 盤面の中央に黒と白の駒を置く
        const center = size / 2;
        this._board[center - 1][center - 1].color = OthelloPieceColor.Black;
        this._board[center - 1][center].color = OthelloPieceColor.White;
        this._board[center][center - 1].color = OthelloPieceColor.White;
        this._board[center][center].color = OthelloPieceColor.Black;
    }
    // 駒が置けるかどうかを判定
    public canPut(x: number, y: number, color: OthelloPieceColor): boolean {
        // 既に駒が置かれている場合は置けない
        if (this._board[x][y].color !== OthelloPieceColor.None) {
            return false;
        }
        // 8方向のうち、どれかの方向で駒をひっくり返せる場合は置ける
        for (let i = 0; i < 8; i++) {
            if (this.canPutDirection(x, y, color, i)) {
                return true;
            }
        }
        // どの方向でも駒をひっくり返せない場合は置けない
        return false;
    }
    // 駒が置けるかどうかを判定（指定した方向のみ）
    private canPutDirection(x: number, y: number, color: OthelloPieceColor, direction: number): boolean {
        // ひっくり返せる駒があるかどうか
        let canReverse = false;
        // ひっくり返せる駒があるかぎりループ
        while (true) {
            // 1つ隣のマスに移動
            x += OthelloBoard.DIRECTION[direction][0];
            y += OthelloBoard.DIRECTION[direction][1];
            // 盤面の範囲外に出たらループを抜ける
            if (x < 0 || y < 0 || x >= this._board.length || y >= this._board.length) {
                break;
            }
            // 隣のマスに駒がない場合はループを抜ける
            if (this._board[x][y].color === OthelloPieceColor.None) {
                break;
            }
            // 隣のマスの駒が自分の駒の場合はループを抜ける
            if (this._board[x][y].color === color) {
                break;
            }
            // 隣のマスの駒が相手の駒の場合はひっくり返せる
            if (this._board[x][y].color !== color) {
                canReverse = true;
            }
        }
        // ひっくり返せる駒がある場合は置ける
        return canReverse;
    }
    // 駒を置く
    public put(x: number, y: number, color: OthelloPieceColor) {
        // 8方向のうち、どれかの方向で駒をひっくり返せる場合は置ける
        for (let i = 0; i < 8; i++) {
            if (this.canPutDirection(x, y, color, i)) {
                this.putDirection(x, y, color, i);
            }
        }
    }
    // 駒を置く（指定した方向のみ）
    private putDirection(x: number, y: number, color: OthelloPieceColor, direction: number) {
        // 自分の駒にする
        this._board[x][y].color = color;
        // ひっくり返せる駒があるかぎりループ
        while (true) {
            // 1つ隣のマスに移動
            x += OthelloBoard.DIRECTION[direction][0];
            y += OthelloBoard.DIRECTION[direction][1];
            // 隣のマスの
            // ・駒がない場合はループを抜ける
            // ・駒が自分の駒の場合はループを抜ける
            // ・駒が相手の駒の場合はひっくり返す
            if (this._board[x][y].color === OthelloPieceColor.None) {
                break;
            }
            if (this._board[x][y].color === color) {
                break;
            }
            if (this._board[x][y].color !== color) {
                this._board[x][y].reverse();
            }
        }
    }
}