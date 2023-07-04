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
        // オセロ盤のセルのインデックスを計算
        const index = x * 8 + y;
        // オセロ盤のセルの色を更新
        this._cells[index].className = 'othello-cell';
        if (piece.color === OthelloPieceColor.Black) {
            this._cells[index].classList.add('othello-cell-black');
        } else if (piece.color === OthelloPieceColor.White) {
            this._cells[index].classList.add('othello-cell-white');
        }
    }
}