$(() => {
    // オセロ盤のサイズを設定
    let size = 8;
    // オセロ盤のモデルを作成
    let board = new OthelloBoard(size);
    // オセロ盤のコンテナを取得
    let container = $('#gameContainer')[0];
    // オセロ盤のビューを作成
    let boardView = new OthelloBoardView(container, size);
})