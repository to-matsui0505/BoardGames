// オセロ盤のビュークラス
class OthelloBoardView {
    // オセロ盤のセルの配列
    private _cells: HTMLTableCellElement[] = [];
    // オセロ盤のセルの配列のプロパティ
    public get cells(): HTMLTableCellElement[] {
        return this._cells;
    }

    // コンストラクタでコンテナとオセロ盤のサイズを受け取ってオセロ盤を作成する
    constructor(container: HTMLElement, size: number) {
        // オセロ盤の作成
        const board = document.createElement('table');
        for (let i = 0; i < size; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < size; j++) {
                const td = document.createElement('td');
                td.classList.add('othello-cell');
                // オセロ盤のセルを配列に追加
                this._cells.push(td);
                tr.appendChild(td);
            }
            board.appendChild(tr);
        }
        // オセロ盤をコンテナに追加
        container.appendChild(board);
    }

    // オセロ盤をOthelloBoardの状態に合わせて更新
    public update(board: OthelloBoard) {
        // オセロ盤のサイズを取得
        const size = board.board.length;
        // オセロ盤の全てのセルを更新
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                this.updateCell(i, j, board.board[i][j]);
            }
        }
    }

    // オセロ盤のセルを更新
    private updateCell(x: number, y: number, piece: OthelloPiece) {
        // 駒が置かれていない場合は何もしない
        if (piece.color === OthelloPieceColor.None) {
            return;
        }
        // セルのエレメントを取得
        const cell = this._cells[x * 8 + y];
        // セルのエレメントの子要素を全て削除
        while (cell.firstChild) {
            cell.removeChild(cell.firstChild);
        }
        // セルの駒用のエレメントを作成
        const pieceElement = document.createElement('div');
        pieceElement.classList.add('othello-piece');
        // 駒の色によってクラスを変更
        if (piece.color === OthelloPieceColor.Black) {
            pieceElement.classList.add('othello-piece-black');
        }
        if (piece.color === OthelloPieceColor.White) {
            pieceElement.classList.add('othello-piece-white');
        }
        // セルのエレメントに駒のエレメントを追加
        cell.appendChild(pieceElement);
    }
}