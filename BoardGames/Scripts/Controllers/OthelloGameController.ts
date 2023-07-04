// オセロゲームのコントローラークラス
class OthelloGameController {
    // オセロ盤のビュー
    private _boardView: OthelloBoardView;
    // オセロ盤のモデル
    private _board: OthelloBoard;
    // どちらのターンか
    private _turn: OthelloPieceColor = OthelloPieceColor.Black;
    // コンストラクタでオセロ盤のコンテナとサイズを受け取ってオセロゲームを作成する
    constructor(container: HTMLElement, size: number) {
        // オセロ盤のモデルを作成
        this._board = new OthelloBoard(size);
        // オセロ盤のビューを作成
        this._boardView = new OthelloBoardView(container, size);
        // オセロ盤の初期化
        this._board.init();
        // オセロ盤のビューの更新
        this._boardView.update(this._board);
        // オセロ盤のセルがクリックされたときに呼ばれるイベントを登録
        for (let cell of this._boardView.cells) {
            cell.addEventListener('click', (e) => {
                // クリックされたセルのインデックスを取得
                const index = this._boardView.cells.indexOf(e.currentTarget as HTMLTableCellElement);
                // インデックスを座標に変換
                const x = Math.floor(index / 8);
                const y = index % 8;
                // 駒が置ける場合は駒を置く
                if (this._board.canPut(x, y, this._turn)) {
                    this._board.put(x, y, this._turn);
                    // オセロ盤のビューを更新
                    this._boardView.update(this._board);
                    // ターンを反転
                    if (this._turn === OthelloPieceColor.Black) {
                        this._turn = OthelloPieceColor.White;
                    } else if (this._turn === OthelloPieceColor.White) {
                        this._turn = OthelloPieceColor.Black;
                    }
                }
            });
        }
    }
}