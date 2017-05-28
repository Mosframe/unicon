// -----------------------------------------------------------------------------
// app : 서비스 시작
// -----------------------------------------------------------------------------
import * as Http from 'http';
import * as Express from 'express';
import * as Profiler from 'v8-profiler';
import * as FileStream from 'fs';
import CONST from './shared/constant';
import * as Util from './shared/util';
import {NetworkService,networkService} from './network-service';
import {bulletManager} from './bullet';
import {playerManager} from './player';
//import {updateEntities} from './entity';

// -----------------------------------------------------------------------------
/** 웹 프레임워크 */
let express = Express();
/** Http 서버 */
let server = Http.createServer(express);
// 홈 서비스 : http://mywebsite:2000 => http://mywebsite:2000/client/assets/index.html
express.get('/', ( req, res )=> {
    res.sendFile(__dirname + '/client/assets/index.html');
});
// 서버소스를 보호하기 위해 /client/assets 디렉토리 이하만 클라이언트에 서비스한다.
// http://mywebsite:2000/client => http://mywebsite:2000/client/assets
// ex) /server/secureFile.js 파일은 클라이언트에 노출되지 않는다.
express.use('/client', Express.static(__dirname + '/client/assets/'));
// Http서버에서 2000 포트를 통해서 클라이언트 요청을 받는다.
//server.listen(2000);
server.listen(process.env.PORT || 2000);
console.log('server started');
// Socket.io를 통해 WebSocket 서비스를 시작한다.
networkService.start( server );

// -----------------------------------------------------------------------------
/** 게임 루프 (25프레임) */
setInterval( ()=>{
    updateEntities();
},1000/25);

/** 모든 엔티티들을 갱신하고 클라이언트들에게 패키지 데이터를 보낸다. */
const updateEntities = () => {

    // 모든 엔티티들을 업데이트한 후 변화된 패킷들을 얻는다.
    let playerPack = playerManager.update();
    let bulletPack = bulletManager.update();

    for( let playerId in playerManager.list ) {
        let player = playerManager.list[playerId];

        // 생성
        {
            let createPack:any = {};
            let create = false;
            if( playerPack.create.length > 0 ) {
                createPack.players = playerPack.create;
                create = true;
            }
            if( bulletPack.create.length > 0 ) {
                createPack.bullets = bulletPack.create;
                create = true;
            }
            if( create ) {
                player.socket.emit( 'create', createPack );
            }
        }
        // 갱신
        {
            let updatePack:any = {};
            let update = false;
            if( playerPack.update.length > 0 ) {
                updatePack.players = playerPack.update;
                update = true;
            }
            if( bulletPack.update.length > 0 ) {
                updatePack.bullets = bulletPack.update;
                update = true;
            }
            if( update ) {
                player.socket.emit( 'update', updatePack );
            }
        }
        // 삭제
        {
            let removePack:any = {};
            let remove = false;
            if( playerPack.remove.length > 0 ) {
                removePack.players = playerPack.remove;
                remove = true;
            }
            if( bulletPack.remove.length > 0 ) {
                removePack.bullets = bulletPack.remove;
                remove = true;
            }
            if( remove ) {
                player.socket.emit( 'remove', removePack );
            }
        }
    }
}

// -----------------------------------------------------------------------------
// 프로파일링
if( CONST.PROFILE ) {
    let startProfiling = (name:string,duration:number) => {
        Profiler.startProfiling(name, true );
        setTimeout(()=>{
            let profile = Profiler.stopProfiling(name);
            // 파일로 기록
            profile.export((error,result)=>{
                FileStream.writeFile('./profiles/unicon.server.'+Util.nowLogString()+'.cpuprofile', result );
                profile.delete();
                console.log('Profile saved.');
            });
        },duration);
    }
    startProfiling('unicon-10s',10000);
}

