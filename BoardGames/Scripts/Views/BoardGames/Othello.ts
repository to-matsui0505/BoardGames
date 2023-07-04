$(() => {
    // オセロ盤のサイズを設定
    let size = 8;
    // オセロ盤のコンテナを取得
    let container = $('#gameContainer')[0];
    // オセロゲームのコントローラーを作成
    let controller = new OthelloGameController(container, size);
})