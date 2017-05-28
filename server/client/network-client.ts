// -----------------------------------------------------------------------------
// socket : 소켓
// -----------------------------------------------------------------------------
import * as SocketIO from 'socket.io-client';
import {IInventory} from '../shared/model-client';
import {PlayerController,playerManager} from './player';
import {bulletManager} from './bullet';


// -----------------------------------------------------------------------------
/** 네트워크 클라이언트 */
// -----------------------------------------------------------------------------
export class NetworkClient {
    /** 소켓 */
    private socket:SocketIOClient.Socket;

    /** 생성자 */
    constructor() {
    }

    /** 서버 접속 */
    connect = () => {
        this.socket = SocketIO().connect();

        this.onSignIn();
        this.onSignUp();
        this.onRunScript();
        this.onChat();
        this.onWhisper();

        this.onCreate();
        this.onUpdate();
        this.onRemove();
    }
    /** 로그인 */
    signIn = (userName:string,password:string,callback:{(err:string,success:boolean):void}) => {
        this.signInCallback = callback;
        this.socket.emit('signIn',{userName,password});
    }
    private signInCallback:any=undefined;
    private onSignIn = () => {
        this.socket.on( 'signIn', (pack:any)=>{
            this.signInCallback(pack.err,pack.success);
        });
    }
    /** 회원가입 */
    signUp = (userName:string,password:string,callback:{(err:string,success:boolean):void}) => {
        this.signUpCallback = callback;
        this.socket.emit('signUp',{userName,password});
    }
    private signUpCallback:any=undefined;
    private onSignUp = () => {
        this.socket.on( 'signUp', (pack:any)=>{
            this.signUpCallback(pack.err,pack.success);
        });
    }
    /** 스크립트 실행 ( 개발자 전용 ) */
    runScript = (script:string, callback:{(result:any):void}) => {
        this.runScriptCallback = callback;
        this.socket.emit( 'runScript', script );
    }
    private runScriptCallback:any=undefined;
    private onRunScript = () => {
        this.socket.on( 'runScript', (results:string[]) => {
            try {
                for( let result of results ) {
                    this.runScriptCallback( JSON.parse(result) );
                }
            } catch (err) {
                this.runScriptCallback( results );
            }
        });
    }

    /** 채팅 */
    chat = (message:string, callback:{(message:string):void} ) => {
        this.chatCallback = callback;
        this.socket.emit( 'chat', message );
    }
    private chatCallback:any=undefined;
    private onChat = () => {
        this.socket.on( 'chat', (message:any) => {
            this.chatCallback( message );
        });
    }
    /** 귓속말 */
    whisper = (userName:string, message:string, callback:{(message:string):void}) => {
        this.whisperCallback = callback;
        this.socket.emit('whisper', {userName,message});
    }
    private whisperCallback:any=undefined;
    private onWhisper = () => {
        this.socket.on( 'whisper', (message:any) => {
            this.whisperCallback( message );
        });
    }
    /** 키보드 입력 상태 변경 */
    keyState = (inputId:string,state:boolean|number) => {
        this.socket.emit('keyState', {inputId,state});
    }
    /** 맵 교체 */
    changeMap = () => {
        this.socket.emit('changeMap');
    }
    /** 아이템 사용 */
    useItem = (itemId:string) => {
        this.socket.emit('useItem',itemId);
    }
    /** 이벤트 : 엔티티 생성 */
    private onCreate = () => {
        this.socket.on('create', (packs:any) =>{
            //console.log(packs);
            if( !packs ) return;
            if( packs.players ) {
                for( let c=0; c<packs.players.length; ++c ) {
                    let create = JSON.parse(packs.players[c]);
                    playerManager.createPlayer(create);
                }
            }
            if( packs.bullets ) {
                for( let c=0; c<packs.bullets.length; ++c ) {
                    let create = JSON.parse(packs.bullets[c]);
                    bulletManager.createBullet(create);
                }
            }

            // 주의 : 매번 객체가 덮여쓰여질 수 있으므로 매번 설정해 준다.
            if( packs.myId ) {
                playerManager.myPlayer = playerManager.list[packs.myId];
            } else if( playerManager.myPlayer ) {
                playerManager.myPlayer = playerManager.list[playerManager.myPlayer.model.id];
            }
        });
    }
    /** 이벤트 : 엔티티 갱신 */
    private onUpdate = () => {
        this.socket.on('update', function(packs:any) {
            //console.log(packs);
            if( !packs ) return;
            if( packs.players ) {
                for( let c=0; c<packs.players.length; ++c ) {
                    let playerPack = packs.players[c];
                    if( playerPack ) {
                        //console.log({playerPack});
                        let update = JSON.parse(playerPack);
                        let player = playerManager.list[update.id];
                        if(player) {
                            player.onUpdate( update );
                        }
                    }
                }
            }
            if( packs.bullets ) {
                for( let c=0; c<packs.bullets.length; ++c ) {
                    let bulletPack = packs.bullets[c];
                    if( bulletPack ) {
                        //console.log({bulletPack});
                        let update = JSON.parse(bulletPack);
                        let bullet = bulletManager.list[update.id];
                        if(bullet) {
                            bullet.onUpdate( update );
                        }
                    }
                }
            }
        });
    }
    /** 이벤트 : 엔티티 삭제 */
    private onRemove = () => {
        this.socket.on('remove', function(packs:any) {
            //console.log(packs);
            if( !packs ) return;
            if( packs.players ) {
                for( let c=0; c<packs.players.length; ++c ) {
                    delete playerManager.list[packs.players[c]];
                }
            }
            if( packs.bullets ) {
                for( let c=0; c<packs.bullets.length; ++c ) {
                    delete bulletManager.list[packs.bullets[c]];
                }
            }
        });
    }
    /** 이벤트 : 인벤토리 갱신 */
    onUpdateInventory = (callback:{(model:IInventory):void}) => {
        this.socket.on('updateInventory',(model:IInventory) => {
            callback(model);
        });
    }
}
/** 네트워크 클라이언트(인스턴스) */
export let network = new NetworkClient();

