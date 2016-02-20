// This is a JavaScript file

//ログの出力を確実にするために使用
//内容が同じログは省略されてしまう
var exexuteCount = 0;

//DB接続処理
function openDB(){
  console.log("データベースへの接続を行います。")
  return openDatabase(CONST.DB_NAME, CONST.DB_VERSION, CONST.DB_DISPLAYNAME, CONST.DB_SIZE);
}

// トランザクション失敗時のコールバック
var onTransactionError = function(err) {
  console.log("トランザクション処理中にエラーが発生しました: "+err.code+err.message);
}

// トランザクション成功時のコールバック
var onTransactionSuccess = function() {
  console.log("トランザクション処理が正常に終了しました。" + exexuteCount);
}

//トランザクション実行処理
function execTransaction(executeSqlFunc,onTransactionErrorFunc,onTransactionSuccessFunc){
  if(onTransactionErrorFunc == undefined || onTransactionErrorFunc == null){
    onTransactionErrorFunc = onTransactionError;
  }
  if(onTransactionSuccessFunc == undefined || onTransactionErrorFunc == null){
    onTransactionSuccessFunc = onTransactionSuccess;
  }
  var db = openDB();
  console.log(db + "へ接続しています。");
  db.transaction(
    function(tx) {
      executeSqlFunc(tx);
    }, 
    onTransactionErrorFunc, 
    onTransactionSuccessFunc
  );
}

//SQL実行処理
function executeSql(transaction,sql,param,onSuccess,onError,summry){
  console.log('SQLを実行します。[' + summry + ']' + exexuteCount);
  transaction.executeSql(sql , param, onSuccess, onError);
  exexuteCount ++;
}

//SQL実行失敗時のコールバック
function onExecuteSqlError(err,message){
  console.log('SQL 実行中にエラーが発生しました: ' + err.code + ':' + err.message);
  console.log(message);
}


