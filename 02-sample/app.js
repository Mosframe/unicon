// -----------------------------------------------------------------------------
// app : 서비스 시작
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// 서비스 옵션
DEBUG       = true;
PROFILE     = false;
DATABASE    = false;

// -----------------------------------------------------------------------------
// 설정 상수들
// -----------------------------------------------------------------------------
MAP_WIDTH   = 1280;
MAP_HEIGHT  = 1280;

// -----------------------------------------------------------------------------

// db커넥션 생성
if( DATABASE ) {
    var mongojs = require('mongojs');
    var db =mongojs('localhost:27017/Unicon',['account','progress']);
}

// express 생성
var express = require('express');
var app = express();

// http 서버 생성
var server = require('http').Server(app);

// V8 프로파일러 생성
var profiler = require('v8-profiler');
var fs = require('fs'); // 파일스트림

// util
util = require('./util');

// 홈 서비스 : http://mywebsite:2000 => http://mywebsite:2000/client/assets/index.html
app.get('/', function( req, res ) {
    res.sendFile(__dirname + '/client/assets/index.html');
});

// 서버소스를 보호하기 위해 /client/assets 디렉토리 이하만 클라이언트에 서비스한다.
// http://mywebsite:2000/client => http://mywebsite:2000/client/assets
// ex) /server/secureFile.js 파일은 클라이언트에 노출되지 않는다.
app.use('/client', express.static(__dirname + '/client/assets/'));

// Http서버에서 2000 포트를 통해서 클라이언트 요청을 받는다.
//server.listen(2000);
server.listen(process.env.PORT || 2000);
console.log('server started');

sockets = {};

// entities
require('./entities');
// 인벤토리
require('./client/assets/inventory');

// -----------------------------------------------------------------------------
// Socket.io를 통해 WebSocket 서비스를 시작한다.
// -----------------------------------------------------------------------------
var io = require('socket.io')(server,{});
io.sockets.on('connection', function(socket){
    console.log('socket connection : '+ socket.id );

    // 소켓을 소켓DB에 등록한다.
    sockets[socket.id] = socket;

    // 로그인
    socket.on('reqSignIn',function(data){ // {username,password}
        isValidPassword( data, function(err,res) {
            var success = false;
            if( res ) {
                // 플레이어 생성 및 등록
                Player.onConnect(socket,data.username);
                socket.player = Player.list[socket.id];
                success = true;
            }
            socket.emit('resSignIn', {err:err,success:success} );
        });
    });
    // 회원가입
    socket.on('reqSignUp',function(data){
        addMember(data,function(err,res){
            socket.emit('resSignUp', {err:err,success:res} );
        });
    });
    // 명령 실행
    // TODO : 서버 해킹(데이터베이스를 조작하거나 삭제하는등...)이 가능할 수 있으므로 아무에게나 허용되지 않도록 서비스 전에 반드시 삭제하거나 관리자만 허용되도록 개선해야 한다.
    socket.on('reqEval',function(data){
        if( !DEBUG ) return;

        try {
            var res = eval(data); // eval() 자바스크립트 코드를 계산하고 실행한다. (https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/eval)
            socket.emit('resEval', res );
        } catch (e){
            console.error(e);
        }
    });
    // 접속종료 처리
    socket.on('disconnect',function(){
        delete sockets[socket.id];
        Player.onDisconnect(socket);
    });
});

// -----------------------------------------------------------------------------
// 데이터베이스
// -----------------------------------------------------------------------------
// 비밀번호가 일치하는가?
var isValidPassword = function( data, callback ) {
    if( DATABASE ) {
        db.account.find({username:data.username,password:data.password},function(err,res){
            var success = false;
            if( err )
                console.error( err );
            else
                if( res.length > 0 )
                    success = true;
            callback( err, success );
        });
    } else {
        return callback(null,true);
    }
};
// 회원이 맞는가?
var isMember = function( data, callback ) {
    if( DATABASE ) {
        db.account.find({username:data.username},function(err,res){
            var success = false;
            if( err )
                console.error( err );
            else
                if( res.length > 0 )
                    success = true;
            callback( err, success );
        });
    } else {
        return callback(null,false);
    }
};
// 회원 등록
var addMember = function( data, callback ) {
    if( DATABASE ) {
        // 이미 등록된 회원이 있는가?
        isMember( data, function(err,res) {
            if( res )
                callback( err, false );
            else {
                db.account.insert({username:data.username,password:data.password},function(err) {
                    var success = false;
                    if( err )
                        console.error( err );
                    else
                        success = true;
                    callback( err, success );
                });
            }
        });
    } else {
        return callback(null,false);
    }
};

// -----------------------------------------------------------------------------

// 서버 틱 업데이트 : 25fps
setInterval( function(){
    // 모든 엔티티들을 업데이트한 후 변화된 패킷들을 얻는다.
    var packs = Entity.updateEntities();

    // 모든 클라이언트들에게 패키지 데이터를 보낸다.
    for( var socketId in sockets ) {
        var socket = sockets[socketId];
        socket.emit( 'create', packs.create );
        socket.emit( 'update', packs.update );
        socket.emit( 'remove', packs.remove );
    }
},1000/25);


// -----------------------------------------------------------------------------
// 프로파일링
if( PROFILE ) {
    var startProfiling = function(name,duration) {
        profiler.startProfiling(name, true );
        setTimeout(function(){
            var profile = profiler.stopProfiling(name);
            // 파일로 기록
            profile.export(function(error,result){
                fs.writeFile('./profiles/unicon.server.'+util.nowLogString()+'.cpuprofile', result );
                profile.delete();
                console.log('Profile saved.');
            });
        },duration);
    }
    startProfiling('unicon-10s',10000);
}
