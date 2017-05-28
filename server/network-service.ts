// -----------------------------------------------------------------------------
// network-service : 네트워크 서비스
// -----------------------------------------------------------------------------
import * as Http from 'http';
import * as SocketIO from 'socket.io';
import CONST from './shared/constant';
import {db} from './database';
import {tableItemManager} from './table-item';
import {PlayerController,playerManager} from './player';
import {BulletController,bulletManager} from './bullet';

// -----------------------------------------------------------------------------
/** 네트워크 서비스 : SocketIO를 이용한 WebSocket 서비스를 제공한다. */
// -----------------------------------------------------------------------------
export class NetworkService {
    /** 클라이언트 소켓 리스트 */
    sockets : {[id:string]:SocketIO.Socket} = {};
    /** 방문객수 (누적) */
    connectCounter = 0;
    /** 네트워크 서비스 시작 */
    start = (server:Http.Server) => {
        let io = SocketIO( server, {} );
        io.sockets.on('connection', (socket:SocketIO.Socket)=>{
            console.log('socket connection : '+ socket.id );
            this.onConnect(socket);
        });
    }
    /** 클라이언트 접속 */
    private onConnect = (socket:SocketIO.Socket) => {
        this.sockets[socket.id] = socket;

        // 로그인
        socket.on('signIn',(data:{userName:string, password:string})=>{ // {userName,password}
            if( CONST.DATABASE ) {
                db.isValidPassword( data.userName, data.password, (err:string,success:boolean)=> {
                    onSignIn(data.userName,err,success);
                });
            } else {
                onSignIn(data.userName,"",true);
            }
        });
        /** 로그인: 결과 */
        const onSignIn = (userName:string,err:string,success:boolean) => {
            if( success ) {
                if(CONST.DEBUG){
                    userName = "player-" + this.connectCounter;
                }
                this.connectCounter++;
                // 플레이어 생성 및 등록
                playerManager.createPlayer(socket,userName);
            }
            socket.emit('signIn', {err,success} );
        }
        // 회원가입
        socket.on('signUp',(data:{userName:string, password:string})=>{
            if( CONST.DATABASE ) {
                db.addMember(data,(err:string,success:boolean)=>{
                    socket.emit('signUp', {err,success} );
                });
            } else {
                socket.emit('signUp', {err:"error : database",success:false} );
            }
        });
    };
}
/** 네크워크 서비스 */
export const networkService = new NetworkService();
