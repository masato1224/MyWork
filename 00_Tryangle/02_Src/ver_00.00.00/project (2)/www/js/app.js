// This is a JavaScript file
app.controller('appController', function($scope){
  
  $scope.isDebug = false;
  //課題詳細SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
  $scope.naviProblemDetail = function(gymId,problemId){
    console.log(problemId);
    $scope.getProblemDetail(true,gymId,problemId);
  };
  
  $scope.getProblemDetail=function(isNavi,gymId,problemId){
    var selectProblemDetail = function(tx){
      
      var onSuccess = function(tx,result){
        var len = result.rows.length;
        console.log('レコードの取得に成功しました。件数：' + len);
        for (var i=0; i<len; i++){
          console.log(JSON.stringify(result.rows.item(i)));
          $scope.problemInfo = {
            isNew:false,
            gymId:result.rows.item(i).gym_id,
            gymName:result.rows.item(i).gym_name,
            problemId:result.rows.item(i).problem_id,
            wallId:result.rows.item(i).wall_id,
            wallName:result.rows.item(i).wall_name,
            slantId:result.rows.item(i).slant_id,
            slantName:result.rows.item(i).slant,
            gradeKind:result.rows.item(i).grade_kind,
            gradeId:result.rows.item(i).grade_id,
            gradeName:result.rows.item(i).grade,
            intensity:result.rows.item(i).intensity,
            risk:result.rows.item(i).risk,
            complex:result.rows.item(i).complex,
            avg:function(){ return((parseInt(this.intensity,10) + parseInt(this.risk,10) + parseInt(this.complex,10))/3).toFixed(1)},
            holdColorHex:result.rows.item(i).hold_color_hex,
            holdColorHexStyle:{'background-color': result.rows.item(i).hold_color_hex},
            setterId:result.rows.item(i).setter_id,
            setterName:result.rows.item(i).setter,
            setYmd: new Date(result.rows.item(i).set_ymd),
            photo:result.rows.item(i).photo,
            photoStyle:{"background-image":result.rows.item(i).photo}
          }; 
        }
        if(isNavi){
          app.navi.pushPage('problemDetail.html');
        }
      };
      
      var onError = function(err){
        onExecuteSqlError(err,'');
      };
      
      var sqlObj = SQL_LIST_OF_DML['SELECT_PROBLEM'];
      var param = [];
      param.push(gymId);
      param.push(problemId);
      executeSql(tx, sqlObj['sql'], param, onSuccess, onError,  sqlObj['summry']);
    };
    
    //データ取得
    execTransaction(selectProblemDetail);
  };
  //課題詳細EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
  
  //課題一覧SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
  $scope.problemList=[];
  
  $scope.naviProblemList = function(gymId,wallId){
    console.log(gymId);
    console.log(wallId);
    $scope.getProblemList(true,gymId,wallId);
  };
  
  $scope.getProblemList=function(isNavi,gymId,wallId){
    $scope.problemList=[];
    var selectGymList = function(tx){
      
      var onSuccess = function(tx,result){
        var len = result.rows.length;
        console.log('レコードの取得に成功しました。件数：' + len);
        for (var i=0; i<len; i++){
          console.log(JSON.stringify(result.rows.item(i)));
          $scope.problemList.push({
            gym_id:result.rows.item(i).gym_id,
            problem_id:result.rows.item(i).problem_id,
            photo:result.rows.item(i).photo,
            photoStyle:{"background-image":result.rows.item(i).photo},
          });
        }
        if(isNavi){
          app.navi.pushPage('problemList.html');
        }
      };
      
      var onError = function(err){
        onExecuteSqlError(err,'');
      };
      
      var sqlObj = SQL_LIST_OF_DML['SELECT_PROBLEM_LIST'];
      var param = [];
      param.push(gymId);
      param.push(wallId);
      executeSql(tx, sqlObj['sql'], param, onSuccess, onError,  sqlObj['summry']);
    };
    
    //データ取得
    execTransaction(selectGymList);
  };
  //課題一覧EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
  
  //ジム詳細SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
  $scope.naviGymDetail = function(gymId){
    console.log(gymId);
    $scope.getGymDetailt(true,gymId);
  };
  
  $scope.getGymDetailt=function(isNavi,gymId){
    var selectGymDetailt = function(tx){
      
      var onSuccess = function(tx,result){
        var len = result.rows.length;
        console.log('レコードの取得に成功しました。件数：' + len);
        for (var i=0; i<len; i++){
          console.log(JSON.stringify(result.rows.item(i)));
          if(i == 0){
            $scope.gymInfo = {
              isNew:false,
              id:result.rows.item(0).gym_id,
              name:result.rows.item(0).gym_name,
              area:result.rows.item(0).area_id,
              areaName:result.rows.item(0).area,
              photo:result.rows.item(0).photo,
              photoStyle:{"background-image":result.rows.item(i).photo},
              wallList:[]
            };
          }
          
          if(result.rows.item(i).wall_id != '' && result.rows.item(i).wall_id != null){
            $scope.gymInfo.wallList.push({
              id:result.rows.item(i).wall_id,
              name:result.rows.item(i).wall_name,
              slant:result.rows.item(i).slant_id,
              slantName:result.rows.item(i).slant,
              photo:result.rows.item(i).wallphoto,
              photoStyle:{"background-image":result.rows.item(i).wallphoto}
            });
          }
        }
        if(isNavi){
          app.navi.pushPage('gymDetail.html');
        }
      };
      
      var onError = function(err){
        onExecuteSqlError(err,'');
      };
      
      var sqlObj = SQL_LIST_OF_DML['SELECT_GYM_DETAIL'];
      executeSql(tx, sqlObj['sql'], [gymId], onSuccess, onError,  sqlObj['summry']);
    };
    
    //データ取得
    execTransaction(selectGymDetailt);
  };
  //ジム詳細EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
  
  //ジム一覧SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
  $scope.gymList=[];
  
  $scope.naviGymList = function(areaId){
    console.log(areaId);
    $scope.getGymList(true,areaId);
  };
  
  $scope.getGymList=function(isNavi,areaId){
    $scope.gymList=[];
    var selectGymList = function(tx){
      
      var onSuccess = function(tx,result){
        var len = result.rows.length;
        console.log('レコードの取得に成功しました。件数：' + len);
        for (var i=0; i<len; i++){
          console.log(JSON.stringify(result.rows.item(i)));
          $scope.gymList.push({
            gym_id:result.rows.item(i).gym_id,
            gym_name:result.rows.item(i).gym_name,
            photo:result.rows.item(i).photo,
            photoStyle:{"background-image":result.rows.item(i).photo}
          });
        }
        if(isNavi){
          app.navi.pushPage('gymsList.html');
        }
      };
      
      var onError = function(err){
        onExecuteSqlError(err,'');
      };
      
      var sqlObj = SQL_LIST_OF_DML['SELECT_GYM_LIST'];
      executeSql(tx, sqlObj['sql'], [areaId], onSuccess, onError,  sqlObj['summry']);
    };
    
    //データ取得
    execTransaction(selectGymList);
  };
  //ジム一覧EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
  
  //存在地域一覧SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
  $scope.existAreaList=[];
  
  $scope.naviAreaList = function(){
    //ページ移動
    $scope.getExistAreaList(true);
    
  };
  
  $scope.getExistAreaList=function(isNavi){
    $scope.existAreaList=[];
    var selectExistAreaList = function(tx){
      
      var onSuccess = function(tx,result){
        var len = result.rows.length;
        console.log('レコードの取得に成功しました。件数：' + len);
        for (var i=0; i<len; i++){
          console.log(JSON.stringify(result.rows.item(i)));
          $scope.existAreaList.push({
            id:result.rows.item(i).area_id,
            area:result.rows.item(i).area
          });
        }
        if(isNavi){
          readyModal.hide();
          tabbar.setActiveTab(0);
//          app.navi.pushPage('areaList.html', { animation: "none" });
        }
      };
      
      var onError = function(err){
        onExecuteSqlError(err,'');
      };
      
      var sqlObj = SQL_LIST_OF_DML['SELECT_EXIST_GYM_AREA'];
      executeSql(tx, sqlObj['sql'], [], onSuccess, onError,  sqlObj['summry']);
    };
    
    //データ取得
    execTransaction(selectExistAreaList);
  };
  //存在地域一覧EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
  
  //ジムコンボリストSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
  $scope.comboBoxListOfGym;
  $scope.getComboBoxListOfGym = function(){
    $scope.comboBoxListOfGym=[];
    var selectGymList = function(tx){
      
      var onSuccess = function(tx,result){
        var len = result.rows.length;
        console.log('レコードの取得に成功しました。件数：' + len);
        for (var i=0; i<len; i++){
          console.log(JSON.stringify(result.rows.item(i)));
          $scope.comboBoxListOfGym.push({
            value:result.rows.item(i).gym_id,
            displayName:result.rows.item(i).gym_name
          });
        }
      };
      
      var onError = function(err){
        onExecuteSqlError(err,'');
      };
      
      var sqlObj = SQL_LIST_OF_DML['SELECT_DT_GYM_ALL_FOR_COMBO'];
      executeSql(tx, sqlObj['sql'], [], onSuccess, onError,  sqlObj['summry']);
    };
    
    //データ取得
    execTransaction(selectGymList);
  };
  //ジムリストEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
  
  //壁コンボリストSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
  $scope.comboBoxListOfWall;
  $scope.getComboBoxListOfWall = function(gymId){
    $scope.comboBoxListOfWall = [];
    var selectWallList = function(tx){
      
      var onSuccess = function(tx,result){
        var len = result.rows.length;
        console.log('レコードの取得に成功しました。件数：' + len);
        for (var i=0; i<len; i++){
          console.log(JSON.stringify(result.rows.item(i)));
          $scope.comboBoxListOfWall.push({
            value:result.rows.item(i).wall_id,
            displayName:result.rows.item(i).wall_name + " " + result.rows.item(i).slant
          });
        }
      };
      
      var onError = function(err){
        onExecuteSqlError(err,'');
      };
      
      var sqlObj = SQL_LIST_OF_DML['SELECT_DT_WALL_FOR_COMBO'];
      executeSql(tx, sqlObj['sql'], [gymId], onSuccess, onError,  sqlObj['summry']);
    };
    
    //データ取得
    execTransaction(selectWallList);
  };
  //壁リストEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
  
  //グレード種別リストSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
  $scope.gradeKindList = [
    {key:CONST.BOULDER_GRADE_JAPAN, value:'ボルダー：Japan'},
    {key:CONST.BOULDER_GRADE_USA, value:'ボルダー：USA'},
    {key:CONST.BOULDER_GRADE_FRENCH, value:'ボルダー：French'},
    {key:CONST.LEAD_GRADE_DECIMAL, value:'リード：Decimal'},
    {key:CONST.LEAD_GRADE_FRENCH, value:'リード：French'}
  ];
  //グレード種別リストEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
  
  //課題情報SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
  $scope.problemInfo;
  $scope.naviEdditProblemInfo = function(gymId,problemId){
    //ジム一覧取得
    $scope.getComboBoxListOfGym();
    //セッター一覧取得
    $scope.getSetterList(false);
    
    if((gymId == undefined || gymId == null)||(problemId == undefined || problemId == null)){
      $scope.problemInfo = null;
      //新規登録
      var now = getDatetime();
      var problemId = "ID_" + now.yyyy + now.MM + now.dd + now.HH + now.mm + now.ss;
      $scope.problemInfo = {
        isNew:true,
        gymId:'',
        problemId:problemId,
        wallId:'',
        gradeKind:'',
        gradeId:'',
        intensity:0,
        risk:0,
        complex:0,
        avg:function(){ return((parseInt(this.intensity,10) + parseInt(this.risk,10) + parseInt(this.complex,10))/3).toFixed(1)},
        holdColorHex:'#ffffff',
        setterId:'',
        setYmd: new Date(),
        photo:''
      };    
    }else{
      $scope.getComboBoxListOfWall($scope.problemInfo.gymId);
      $scope.getGradeList(false,$scope.problemInfo.gradeKind);
    }
    
    window.setTimeout(function(){
      app.navi.pushPage('edditProblemInfo.html', { animation: "none" });
    }, "500");
      //ページ移動
  };
  
  $scope.registerProblemInfo = function(){
    if($scope.problemInfo.isNew){
      //新規登録
      var insertProblem = function(tx){
        
        var onSuccess = function(tx,result){
          console.log('レコードの追加に成功しました。追加行：'+ result.insertId);
        };
        
        var onError = function(err){
          onExecuteSqlError(err,'レコードの追加に失敗しました。');
        };
        
        var param = [];
        param.push($scope.problemInfo.gymId);
        param.push($scope.problemInfo.problemId);
        param.push($scope.problemInfo.wallId);
        param.push($scope.problemInfo.gradeKind);
        param.push($scope.problemInfo.gradeId);
        param.push($scope.problemInfo.intensity);
        param.push($scope.problemInfo.risk);
        param.push($scope.problemInfo.complex);
        param.push($scope.problemInfo.holdColorHex);
        param.push($scope.problemInfo.setterId);
        param.push($scope.problemInfo.setYmd);
        param.push($scope.problemInfo.photo);
        var now = getDatetime();
        param.push(now.yyyy + now.MM + now.dd); //作成日
        param.push(now.HH + now.mm + now.ss);   //作成時間
        param.push("00");                       //作成ユーザ
        param.push(now.yyyy + now.MM + now.dd); //更新日
        param.push(now.HH + now.mm + now.ss);   //更新時間
        param.push("00");                       //更新ユーザ
        console.log(param);
        var sqlObj = SQL_LIST_OF_DML['INSERT_DT_PROBLEM'];
        executeSql(tx, sqlObj['sql'], param, onSuccess, onError,  sqlObj['summry']);
      };
      
      //データ取得
      execTransaction(insertProblem);
    }else{
      var updateProblem = function(tx){
        
        var onSuccess = function(tx,result){
          console.log('レコードの更新に成功しました。更新行：'+ result.rowsAffected);
        };
        
        var onError = function(err){
          onExecuteSqlError(err,'レコードの更新に失敗しました。');
        };
        
        var param = [];
        param.push($scope.problemInfo.gymId);
        param.push($scope.problemInfo.wallId);
        param.push($scope.problemInfo.gradeKind);
        param.push($scope.problemInfo.gradeId);
        param.push($scope.problemInfo.intensity);
        param.push($scope.problemInfo.risk);
        param.push($scope.problemInfo.complex);
        param.push($scope.problemInfo.holdColorHex);
        param.push($scope.problemInfo.setterId);
        param.push($scope.problemInfo.setYmd);
        param.push($scope.problemInfo.photo);
        var now = getDatetime();
        param.push(now.yyyy + now.MM + now.dd); //更新日
        param.push(now.HH + now.mm + now.ss);   //更新時間
        param.push("00");                       //更新ユーザ
        //以下更新条件
        param.push($scope.problemInfo.gymId);
        param.push($scope.problemInfo.problemId);
        console.log(param);
        var sqlObj = SQL_LIST_OF_DML['UPDATE_PROBLEM_DETAIL'];
        executeSql(tx, sqlObj['sql'], param, onSuccess, onError, sqlObj['summry']);
      };
      
      //データ取得
      execTransaction(updateProblem);
    }
  };
  //課題情報EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
  
  //ジム情報SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
  $scope.gymInfo = {};
  
  $scope.naviEdditGymInfo = function(gymId){
    $scope.getAreaList(false);
    $scope.getSlantList(false);
    
    if(gymId == undefined || gymId == null){
      //新規登録
      console.log('新規登録');
      var lastId;
      var selectLastInsGymId = function(tx){
        
        //２．処理１．の成功時コールバック処理
        var onSuccess = function(tx,result){
          var len = result.rows.length;
          if(len == 0){
            lastId = '0001';
            console.log('レコードなし');
          }else{
            console.log(JSON.stringify(result.rows.item(0)));
            var tmp = parseInt(result.rows.item(len-1).gym_id,10) + 1;
            lastId = ('000' + tmp.toString()).slice(-4);
          }
          $scope.gymInfo = {
            isNew:true,
            id:lastId,
            name:'',
            area:'',
            photo:'',
            wallList:[]
          };
        };
        
        //３．処理１．の失敗時コールバック処理
        var onError = function(err){
          onExecuteSqlError(err,'');
        };
        
        //１．最終追加ジムのID取得処理
        var sqlObj = SQL_LIST_OF_DML['SELECT_DT_GYM_LAST_INSERT_ROWID'];
        executeSql(tx, sqlObj['sql'], [], onSuccess, onError,  sqlObj['summry']);
      };
      
      //ジムの最新idを取得する
      execTransaction(selectLastInsGymId);
      
    }else{
      //編集 ジム情報を取得する
//      app.navi.pushPage('edditGymInfo.html', { animation: "none" });
      console.log('編集');
    }
    
    window.setTimeout(function(){
      app.navi.pushPage('edditGymInfo.html', { animation: "none" });
    }, "500");
  };
  
  $scope.addWall = function(){
    if($scope.gymInfo.wallList.length == 0){
      $scope.gymInfo.wallList.push({
        id:'01',
        name:'',
        slant:'',
        photo:''
      });
    }else{
      var maxId = parseInt($scope.gymInfo.wallList[$scope.gymInfo.wallList.length - 1].id,10) + 1;
      var nextId = 0;
      if(maxId < 10){
        nextId = '0' + maxId.toString();
      }else{
        nextId = maxId.toString();
      }
      $scope.gymInfo.wallList.push({
        id:nextId,
        name:'',
        slant:'',
        photo:''
      });
    }
  };
  
  $scope.removeWall=function(index){
    $scope.gymInfo.wallList.splice(index, 1);
  };
  
  $scope.registerGymInfo=function(){
    //ジム情報は追加更新
    //壁情報はデリートインサート
    //新規登録と更新で処理を分ける
    if($scope.gymInfo.isNew){
      //新規登録
      var insertGymInfoAndDeleteInsertWallInfo = function(tx){
        
        //２．処理１ 施設テーブルへの挿入成功時のコールバック
        var onSuccessInsGymInfo = function(tx,result){
          console.log('レコードの追加に成功しました。追加行：'+ result.insertId);
          
          //２－２．処理２－１ 壁テーブルの削除成功時のコールバック
          var onSuccessDel = function(tx,result){
            console.log('レコードの削除に成功しました。削除件数：' + result.rowsAffected);
            
            //２－２－２．処理２－１－１ 壁テーブルへの挿入成功時のコールバック
            var onSuccessInsWallInfo = function(tx,result){
              console.log('レコードの追加に成功しました。追加行：' + result.insertId);
            };

            //２－２－２．処理２－１－１ 壁テーブルへの挿入失敗時のコールバック
            var onErrorInsWallInfo = function(err){
            onExecuteSqlError(err,'レコードの追加に失敗しました。');
            };
            
            //２－２－１．壁テーブルへの挿入
            var insSqlObjWall = SQL_LIST_OF_DML['INSERT_DT_WALL'];
            var now = getDatetime();
            var insWallInfoParam;
            angular.forEach($scope.gymInfo.wallList, function(wall){
              insWallInfoParam = [];
              insWallInfoParam.push($scope.gymInfo.id);
              insWallInfoParam.push(wall.id);
              insWallInfoParam.push(wall.name);
              insWallInfoParam.push(wall.slant);
              insWallInfoParam.push(wall.photo);
              insWallInfoParam.push(now.yyyy + now.MM + now.dd); //作成日
              insWallInfoParam.push(now.HH + now.mm + now.ss);   //作成時間
              insWallInfoParam.push("00");                       //作成ユーザ
              insWallInfoParam.push(now.yyyy + now.MM + now.dd); //更新日
              insWallInfoParam.push(now.HH + now.mm + now.ss);   //更新時間
              insWallInfoParam.push("00");                       //更新ユーザ
              console.log(insWallInfoParam);
              executeSql(tx, insSqlObjWall['sql'], insWallInfoParam, onSuccessInsWallInfo, onErrorInsWallInfo, insSqlObjWall['summry']);
            });
          };
          
          //２－３．処理２－１ 壁テーブルの削除失敗時のコールバック
          var onErrorDel = function(err){
            onExecuteSqlError(err,'レコードの削除に失敗しました。');
          };
          
          //２－１．壁テーブルの削除
          var dleSqlObj = SQL_LIST_OF_DML['DELETE_DT_WALL'];
          var delParam = [];
          delParam.push($scope.gymInfo.id);
          executeSql(tx, dleSqlObj['sql'], delParam, onSuccessDel, onErrorDel, dleSqlObj['summry']);
        };
        
        //３．処理１ 施設テーブルへの挿入失敗時のコールバック  
        var onErrorInsGymInfo = function(err){
        onExecuteSqlError(err,'レコードの追加に失敗しました。');
        };
        
        //１．施設テーブルへの挿入、または、更新
        var insSqlObjGymInfo = SQL_LIST_OF_DML['INSERT_DT_GYM'];
        var insGymInfoParam = [];
        insGymInfoParam.push($scope.gymInfo.id);
        insGymInfoParam.push($scope.gymInfo.name);
        insGymInfoParam.push($scope.gymInfo.area);
        insGymInfoParam.push($scope.gymInfo.photo);
        var now = getDatetime();
        insGymInfoParam.push(now.yyyy + now.MM + now.dd); //作成日
        insGymInfoParam.push(now.HH + now.mm + now.ss);   //作成時間
        insGymInfoParam.push("00");                       //作成ユーザ
        insGymInfoParam.push(now.yyyy + now.MM + now.dd); //更新日
        insGymInfoParam.push(now.HH + now.mm + now.ss);   //更新時間
        insGymInfoParam.push("00");                       //更新ユーザ
        console.log(insGymInfoParam);
        executeSql(tx, insSqlObjGymInfo['sql'], insGymInfoParam , onSuccessInsGymInfo, onErrorInsGymInfo, insSqlObjGymInfo['summry']);
      };
      
      execTransaction(insertGymInfoAndDeleteInsertWallInfo);
    }else{
      //更新
      var updateGymInfoAndDeleteInsertWallInfo = function(tx){
        
        //２．処理１ 施設テーブルへの挿入成功時のコールバック
        var onSuccessUpdGymInfo = function(tx,result){
          console.log('レコードの更新に失敗しました。更新行：'+ result.rowsAffected);
          
          //２－２．処理２－１ 壁テーブルの削除成功時のコールバック
          var onSuccessDel = function(tx,result){
            console.log('レコードの削除に成功しました。削除件数：' + result.rowsAffected);
            
            //２－２－２．処理２－１－１ 壁テーブルへの挿入成功時のコールバック
            var onSuccessInsWallInfo = function(tx,result){
              console.log('レコードの追加に成功しました。追加行：' + result.insertId);
            };

            //２－２－２．処理２－１－１ 壁テーブルへの挿入失敗時のコールバック
            var onErrorInsWallInfo = function(err){
            onExecuteSqlError(err,'レコードの追加に失敗しました。');
            };
            
            //２－２－１．壁テーブルへの挿入
            var insSqlObjWall = SQL_LIST_OF_DML['INSERT_DT_WALL'];
            var now = getDatetime();
            var insWallInfoParam;
            angular.forEach($scope.gymInfo.wallList, function(wall){
              insWallInfoParam = [];
              insWallInfoParam.push($scope.gymInfo.id);
              insWallInfoParam.push(wall.id);
              insWallInfoParam.push(wall.name);
              insWallInfoParam.push(wall.slant);
              insWallInfoParam.push(wall.photo);
              insWallInfoParam.push(now.yyyy + now.MM + now.dd); //作成日
              insWallInfoParam.push(now.HH + now.mm + now.ss);   //作成時間
              insWallInfoParam.push("00");                       //作成ユーザ
              insWallInfoParam.push(now.yyyy + now.MM + now.dd); //更新日
              insWallInfoParam.push(now.HH + now.mm + now.ss);   //更新時間
              insWallInfoParam.push("00");                       //更新ユーザ
              console.log(insWallInfoParam);
              executeSql(tx, insSqlObjWall['sql'], insWallInfoParam, onSuccessInsWallInfo, onErrorInsWallInfo, insSqlObjWall['summry']);
            });
          };
          
          //２－３．処理２－１ 壁テーブルの削除失敗時のコールバック
          var onErrorDel = function(err){
            onExecuteSqlError(err,'レコードの削除に失敗しました。');
          };
          
          //２－１．壁テーブルの削除
          var dleSqlObj = SQL_LIST_OF_DML['DELETE_DT_WALL'];
          var delParam = [];
          delParam.push($scope.gymInfo.id);
          executeSql(tx, dleSqlObj['sql'], delParam, onSuccessDel, onErrorDel, dleSqlObj['summry']);
        };
        
        //３．処理１ 施設テーブルの更新失敗時のコールバック  
        var onErrorUpdGymInfo = function(err){
        onExecuteSqlError(err,'レコードの更新に失敗しました。');
        };
        
        //１．施設テーブルへの更新
        var updSqlObjGymInfo = SQL_LIST_OF_DML['UPDATE_GYM_DETAIL'];
        var updGymInfoParam = [];
        updGymInfoParam.push($scope.gymInfo.name);
        updGymInfoParam.push($scope.gymInfo.area);
        updGymInfoParam.push($scope.gymInfo.photo);
        var now = getDatetime();
        updGymInfoParam.push(now.yyyy + now.MM + now.dd); //更新日
        updGymInfoParam.push(now.HH + now.mm + now.ss);   //更新時間
        updGymInfoParam.push("00");                       //更新ユーザ
        //以下更新条件
        updGymInfoParam.push($scope.gymInfo.id);
        console.log(updGymInfoParam);
        executeSql(tx, updSqlObjGymInfo['sql'], updGymInfoParam , onSuccessUpdGymInfo, onErrorUpdGymInfo, updSqlObjGymInfo['summry']);
      };
      
      execTransaction(updateGymInfoAndDeleteInsertWallInfo);
    }
  };
  //ジム情報EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
  
  //地域リストSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
  $scope.areaList=[];
  
  $scope.getAreaList=function(isNavi){
    $scope.areaList=[];
    var selectAllAreaList = function(tx){
      
      var onSuccess = function(tx,result){
        var len = result.rows.length;
        console.log('レコードの取得に成功しました。件数：' + len);
        for (var i=0; i<len; i++){
          console.log(JSON.stringify(result.rows.item(i)));
          $scope.areaList.push({
            id:result.rows.item(i).id,
            area:result.rows.item(i).area
          });
        }
        if(isNavi){
          app.navi.pushPage('settingArea.html');
        }
      };
      
      var onError = function(err){
        onExecuteSqlError(err,'');
      };
      
      var sqlObj = SQL_LIST_OF_DML['SELECT_ALL_AREA_LIST'];
      executeSql(tx, sqlObj['sql'], [], onSuccess, onError,  sqlObj['summry']);
    };
    
    //データ取得
    execTransaction(selectAllAreaList);
  };
  
  $scope.addArea=function(){
    if($scope.areaList.length == 0){
      $scope.areaList.push({
        id:'01',
        area:''
      });
    }else{
      var maxId = parseInt($scope.areaList[$scope.areaList.length - 1].id,10) + 1;
      var nextId = 0;
      if(maxId < 10){
        nextId = '0' + maxId.toString();
      }else{
        nextId = maxId.toString();
      }
      $scope.areaList.push({
        id:nextId,
        area:''
      });
    }
  };
  
  $scope.removeArea=function(index){
    $scope.areaList.splice(index, 1);
  };
  
  $scope.registerArea=function(){
    var deleteAndInsert = function(tx){
      var onSuccessDel = function(tx,result){
        console.log('レコードの削除に成功しました。削除件数：' + result.rowsAffected);
        
        var onSuccessIns = function(tx,result){
          console.log('レコードの追加に成功しました。追加行：'+ result.insertId);
        };
  
        var onErrorIns = function(err){
        onExecuteSqlError(err,'レコードの追加に失敗しました。');
        };
        
        var insSqlObj = SQL_LIST_OF_DML['INSERT_MT_AREA'];
        angular.forEach($scope.areaList, function(area){
          var param =[];
          param.push(area.id);
          param.push(area.area);
          console.log(param);
          executeSql(tx, insSqlObj['sql'], param, onSuccessIns, onErrorIns, insSqlObj['summry']);
        });
      };
      
      var onErrorDel = function(err){
        onExecuteSqlError(err,'レコードの削除に失敗しました。');
      };
      
      var dleSqlObj = SQL_LIST_OF_DML['DELETEALL_MT_AREA'];
      executeSql(tx, dleSqlObj['sql'], [], onSuccessDel, onErrorDel, dleSqlObj['summry']);
    };
    execTransaction(deleteAndInsert);
  };
  //地域リストEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE

  //傾斜リストSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
  $scope.slantList=[];
  
  $scope.getSlantList=function(isNavi){
    $scope.slantList=[];
    var selectAllSlantList = function(tx){
      
      var onSuccess = function(tx,result){
        var len = result.rows.length;
        console.log('レコードの取得に成功しました。件数：' + len);
        for (var i=0; i<len; i++){
          console.log(JSON.stringify(result.rows.item(i)));
          $scope.slantList.push({
            id:result.rows.item(i).id,
            slant:result.rows.item(i).slant
          });
        }
        if(isNavi){
          app.navi.pushPage('settingSlant.html');
        }
      };
      
      var onError = function(err){
        onExecuteSqlError(err,'');
      }; 
      
      var sqlObj = SQL_LIST_OF_DML['SELECT_ALL_SLANT_LIST'];
      executeSql(tx, sqlObj['sql'], [], onSuccess, onError,  sqlObj['summry']);
    };
    
    //データ取得
    execTransaction(selectAllSlantList);
  };
  
  $scope.addSlant=function(){
    if($scope.slantList.length == 0){
      $scope.slantList.push({
        id:'01',
        slant:''
      });
    }else{
      var maxId = parseInt($scope.slantList[$scope.slantList.length - 1].id,10) + 1;
      var nextId = 0;
      if(maxId < 10){
        nextId = '0' + maxId.toString();
      }else{
        nextId = maxId.toString();
      }
      $scope.slantList.push({
        id:nextId,
        slant:''
      });
    }
  };
  
  $scope.removeSlant=function(index){
    $scope.slantList.splice(index, 1);
  };
  
  $scope.registerSlant=function(){
    var deleteAndInsert = function(tx){
      var onSuccessDel = function(tx,result){
        console.log('レコードの削除に成功しました。削除件数：' + result.rowsAffected);
        
        var onSuccessIns = function(tx,result){
          console.log('レコードの追加に成功しました。追加行：'+ result.insertId);
        };
  
        var onErrorIns = function(err){
        onExecuteSqlError(err,'レコードの追加に失敗しました。');
        }; 
        
        var insSqlObj = SQL_LIST_OF_DML['INSERT_MT_SLANT'];
        angular.forEach($scope.slantList, function(slant){
          var param =[];
          param.push(slant.id);
          param.push(slant.slant);
          console.log(param);
          executeSql(tx, insSqlObj['sql'], param, onSuccessIns, onErrorIns, insSqlObj['summry']);
        });
      };
      
      var onErrorDel = function(err){
        onExecuteSqlError(err,'レコードの削除に失敗しました。');
      }; 
      
      var dleSqlObj = SQL_LIST_OF_DML['DELETEALL_MT_SLANT'];
      executeSql(tx, dleSqlObj['sql'], [], onSuccessDel, onErrorDel, dleSqlObj['summry']);
    };
    execTransaction(deleteAndInsert);
  };
  //地域リストEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
  
  //グレードリストSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
  $scope.gradeList;
  $scope.gradeKind;
  $scope.settingGradePageTitle;
  
  $scope.getGradeList=function(isNavi,gradeKind){
    $scope.gradeList=[];
    $scope.gradeKind = gradeKind;
    $scope.settingGradePageTitle = '';
    
    var selectGrades = function(tx){
      var onSuccess = function(tx,result){
        var len = result.rows.length;
        console.log('レコードの取得に成功しました。件数：' + len);
        
        for (var i=0; i<len; i++){
          console.log(JSON.stringify(result.rows.item(i)));
          $scope.gradeList.push({
            id:result.rows.item(i).id,
            gradeKind:result.rows.item(i).grade_kind,
            grade:result.rows.item(i).grade
          });
        }
        
        if(isNavi){
          switch (gradeKind){
            case CONST.BOULDER_GRADE_JAPAN:
              $scope.settingGradePageTitle = 'ボルダーグレード（Japan）';
              break;
            case CONST.BOULDER_GRADE_USA:
              $scope.settingGradePageTitle = 'ボルダーグレード（USA）';
              break;
            case CONST.BOULDER_GRADE_FRENCH:
              $scope.settingGradePageTitle = 'ボルダーグレード（French）';
              break;
            case CONST.LEAD_GRADE_DECIMAL:
              $scope.settingGradePageTitle = 'リードグレード（Decimal）';
              break;
            case CONST.LEAD_GRADE_FRENCH:
              $scope.settingGradePageTitle = 'リードグレード（French）';
              break;
          }
          app.navi.pushPage('settingGrade.html');
        }
      };
      
      var onError = function(err){
        onExecuteSqlError(err,'');
      }; 
      
      var sqlObj = SQL_LIST_OF_DML['SELECT_GRADE_LIST'];
      executeSql(tx, sqlObj['sql'], [$scope.gradeKind], onSuccess, onError,  sqlObj['summry']);
    };
    
    //データ取得
    execTransaction(selectGrades);
  };
  
  $scope.addGrade=function(){
    if($scope.gradeList.length == 0){
      $scope.gradeList.push({
        id:'01',
        gradeKind:$scope.gradeKind,
        grade:''
      });
    }else{
      var maxId = parseInt($scope.gradeList[$scope.gradeList.length - 1].id,10) + 1;
      var nextId = 0;
      if(maxId < 10){
        nextId = '0' + maxId.toString();
      }else{
        nextId = maxId.toString();
      }
      $scope.gradeList.push({
        id:nextId,
        gradeKind:$scope.gradeKind,
        grade:''
      });
    }
  };
  
  $scope.removeGrade=function(index){
    $scope.gradeList.splice(index, 1);
  };
  
  $scope.registerGrade=function(){
    var deleteAndInsert = function(tx){
      var onSuccessDel = function(tx,result){
        console.log('レコードの削除に成功しました。削除件数：' + result.rowsAffected);
        
        var onSuccessIns = function(tx,result){
          console.log('レコードの追加に成功しました。追加行：'+ result.insertId);
        };
  
        var onErrorIns = function(err){
          onExecuteSqlError(err,'レコードの追加に失敗しました。');
        };
        
        var insSqlObj = SQL_LIST_OF_DML['INSERT_MT_GRADE'];
        angular.forEach($scope.gradeList, function(grade){
          var param =[];
          param.push(grade.id);
          param.push(grade.gradeKind);
          param.push(grade.grade);
          console.log(param);
          executeSql(tx, insSqlObj['sql'], param, onSuccessIns, onErrorIns, insSqlObj['summry']);
        });
      };
      
      var onErrorDel = function(err){
        onExecuteSqlError(err,'レコードの削除に失敗しました。');
      };
      
      var dleSqlObj = SQL_LIST_OF_DML['DELETE_MT_GRADE'];
      executeSql(tx, dleSqlObj['sql'], [$scope.gradeKind], onSuccessDel, onErrorDel, dleSqlObj['summry']);
    };
    execTransaction(deleteAndInsert);
  };
  //グレードリストEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
  
  //セッターマスタSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
  $scope.setterList=[];
  
  $scope.getSetterList=function(isNavi){
    $scope.setterList=[];
    var selectAllSetterList = function(tx){
      
      var onSuccess = function(tx,result){
        var len = result.rows.length;
        console.log('レコードの取得に成功しました。件数：' + len);
        for (var i=0; i<len; i++){
          console.log(JSON.stringify(result.rows.item(i)));
          $scope.setterList.push({
            id:result.rows.item(i).id,
            setter:result.rows.item(i).setter
          });
        }
        if(isNavi){
          app.navi.pushPage('settingSetter.html');
        }
      };
      
      var onError = function(err){
        onExecuteSqlError(err,'');
      }; 
      
      var sqlObj = SQL_LIST_OF_DML['SELECT_ALL_SETTER_LIST'];
      executeSql(tx, sqlObj['sql'], [], onSuccess, onError,  sqlObj['summry']);
    };
    
    //データ取得
    execTransaction(selectAllSetterList);
  };
  
  $scope.addSetter=function(){
    if($scope.setterList.length == 0){
      $scope.setterList.push({
        id:'01',
        setter:''
      });
    }else{
      var maxId = parseInt($scope.setterList[$scope.setterList.length - 1].id,10) + 1;
      var nextId = 0;
      if(maxId < 10){
        nextId = '0' + maxId.toString();
      }else{
        nextId = maxId.toString();
      }
      $scope.setterList.push({
        id:nextId,
        setter:''
      });
    }
  };
  
  $scope.removeSetter=function(index){
    $scope.setterList.splice(index, 1);
  };
  
  $scope.registerSetter=function(){
    var deleteAndInsert = function(tx){
      var onSuccessDel = function(tx,result){
        console.log('レコードの削除に成功しました。削除件数：' + result.rowsAffected);
        
        var onSuccessIns = function(tx,result){
          console.log('レコードの追加に成功しました。追加行：'+ result.insertId);
        };
  
        var onErrorIns = function(err){
          onExecuteSqlError(err,'レコードの追加に失敗しました。');
        };
        
        var insSqlObj = SQL_LIST_OF_DML['INSERT_MT_SETTER'];
        angular.forEach($scope.setterList, function(setter){
          var param =[];
          param.push(setter.id);
          param.push(setter.setter);
          console.log(param);
          executeSql(tx, insSqlObj['sql'], param, onSuccessIns, onErrorIns, insSqlObj['summry']);
        });
      };
      
      var onErrorDel = function(err){
        onExecuteSqlError(err,'レコードの削除に失敗しました。');
      }; 
      
      var dleSqlObj = SQL_LIST_OF_DML['DELETEALL_MT_SETTER'];
      executeSql(tx, dleSqlObj['sql'], [], onSuccessDel, onErrorDel, dleSqlObj['summry']);
    };
    execTransaction(deleteAndInsert);
  };
  //セッターマスタEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
  
  //画像選択ダイアログSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
  $scope.dialogs = {};
  var targetModel = {};
  $scope.show = function(dlg,scope) {
    targetModel = scope;
    if (!$scope.dialogs[dlg]) {
      ons.createDialog(dlg).then(function(dialog) {
        $scope.dialogs[dlg] = dialog;
        dialog.show();
      });
    } else {
      $scope.dialogs[dlg].show();
    }
  };
  
  $scope.bootCamera = function(onSuccess,onFail,options){
    navigator.camera.getPicture(function(imageURI) {
        onSuccess(imageURI);
    }, onFail, options);
  };
  
  // ギャラリーから画像のパスを取得する
  $scope.getPictureFromGallery = function(onSuccess,onFail) {
    console.log("ギャラリー起動");
    var options = {
        quality: 50,
        sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: Camera.DestinationType.DATA_URL
    };
   $scope.bootCamera(onSuccess,onFail,options);
  };
  
  // 写真を撮影して保存する
  $scope.getPictureFromCamera = function(onSuccess,onFail) {
    console.log("カメラ起動");
    var options = {
        sourceType : Camera.PictureSourceType.CAMERA,
        saveToPhotoAlbum: true,
        correctOrientation:true,
        destinationType: Camera.DestinationType.DATA_URL 
    };
    $scope.bootCamera(onSuccess,onFail,options);
  };
  
  $scope.onFailGetPicture = function() {
    console.log("写真を取得できませんでした");
  };
  
  $scope.onSuccessGetPicture = function(pictureUrl) {
    var head = "url(data:image/jpeg;base64,";
    var tall = ")";
    var url = head + pictureUrl + tall;
    targetModel.photo = url;
    targetModel.photoStyle = {"background-image":url};
  };
  
  var images;
  $scope.onSuccessGetProblemPicture = function(pictureUrl) {
    var $img = $('<img>');
    $img.attr('src', "data:image/jpeg;base64," + pictureUrl);
    $img.attr('id', 'problem-img');
    $img.addClass('converted-image');
    images = $img;
    app.navi.pushPage('image.html');
  };
  //画像選択ダイアログEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
  $(document).on('pageinit', '#image-page', function() {
    $('#img-area').append(images);
  });
  
  $scope.endEddit = function(){
    console.log('画像書き出し');
    var canvas = $('#my-canvas')[0];
    var img_src = canvas.toDataURL('image/jpeg');
    img_src = 'url(' + img_src + ')';
    $scope.problemInfo.photo = img_src;
    $scope.problemInfo.photoStyle = {'background-image': img_src};
    app.navi.replacePage('edditProblemInfo.html');
  };
  
});

アプリケーション初期化処理
function appInit(){
  //テーブル作成
  var createAllTable = function(tx){
    var onSuccess = function(tx,result){
      console.log('テーブルの作成に成功しました。' + new Date());
    };
    var onError = function(err){
      onExecuteSqlError(err,'テーブルの作成に失敗しました。');
    };
    angular.forEach(SQL_LIST_OF_DDL, function(sqlObj){
      executeSql(tx, sqlObj['sql'], [], onSuccess, onError, sqlObj['summry']);
    });
  };
  
  var callBackOfSuccess = function(){
    onTransactionSuccess();
    window.setTimeout(function(){
      bootModal.hide();
      readyModal.show();
    }, "1000");
  };
  
  execTransaction(createAllTable,null,callBackOfSuccess);
}

//現在日時取得処理
function getDatetime(){
  var dateTime = new Date();
  
  var zeroPadding = function(value){
    if(value < 10){
      value = "0" + value.toString();
    }
    return value.toString();
  };
  
  var returnObj = {
    yyyy:dateTime.getFullYear().toString(),
    MM:zeroPadding(dateTime.getMonth()),
    dd:zeroPadding(dateTime.getDay()),
    HH:zeroPadding(dateTime.getHours()),
    mm:zeroPadding(dateTime.getMinutes()),
    ss:zeroPadding(dateTime.getSeconds())
  };
  
  return returnObj
}

function onDeviceReady() {
  console.log("onDeviceReadyが実行されました。");
}

var StampFlg;
function setStamp(stampId){
  console.log(stampId);
  StampFlg = stampId;
  startStanpModal.hide();
  goalStanpModal.hide();
}

function beginEddit() {
  console.log("編集開始");
  
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');

  // キャンバスの描画サーフェイスのサイズを設定
  var photoImage = $('#problem-img').get(0);
  $(canvas).attr({
      width: photoImage.width,
      height: photoImage.height,
      id:'my-canvas'
  });
  context.drawImage(photoImage, 0, 0, photoImage.width, photoImage.height);
  
  $('#problem-img').remove();
  $('#img-area').append(canvas);
  
  $("#my-canvas").click(function(e){
    console.log("キャンバス押下");
    var offset = $("#my-canvas").offset();
    var posX = e.clientX - offset.left;
    var posY = e.clientY - offset.top;
  
    var stampImg;
    switch (StampFlg){
      case CONST.START_TOP:
        stampImg = './img/start-top.png';
        posY = posY + 50;
        break;
      case CONST.START_RIGHT:
        stampImg = './img/start-right.png';
        posX = posX - 50;
        break;
      case CONST.START_BOTTOM:
        stampImg = './img/start-bottom.png';
        posY = posY - 50;
        break;
      case CONST.START_LEFT:
        stampImg = './img/start-left.png';
        posX = posX + 50;
        break;
      case CONST.GOAL_TOP:
        stampImg = './img/goal-top.png';
        posY = posY + 50;
        break;
      case CONST.GOAL_RIGHT:
        stampImg = './img/goal-right.png';
        posX = posX - 50;
        break;
      case CONST.GOAL_BOTTOM:
        stampImg = './img/goal-bottom.png';
        posY = posY - 50;
        break;
      case CONST.GOAL_LEFT:
        stampImg = './img/goal-left.png';
        posX = posX + 50;
        break;
    }
    
    $("#my-canvas").drawImage({
    	source:stampImg,
    	x:posX , y:posY
    });
    
  });
}