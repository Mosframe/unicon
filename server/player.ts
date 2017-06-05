// -----------------------------------------------------------------------------
// player : 플레이어
// -----------------------------------------------------------------------------
import * as SocketIO from 'socket.io';
import CONST from './shared/constant';
import * as Util from './shared/util';
import {setWboolean,setWnumber,setWstring} from './shared/watch-type';
import {IPlayer} from './shared/model-server';
import {EntityController,EntityManager} from './entity';
import {BulletController,bulletManager} from './bullet';
import {InventoryController} from './inventory';
import {tableItemManager} from './table-item';
import {runScript} from './script';


// -----------------------------------------------------------------------------
/** 플레이어 컨트롤러 */
// -----------------------------------------------------------------------------
export class PlayerController extends EntityController {
    /** 플레이어 데이터 모델 */
    model                   : IPlayer;
    /** 소켓 */
    socket                  : SocketIO.Socket;
    /** 왼쪽 이동 버튼 눌림 유무 */
    pressingLeft            : boolean;
    /** 오른쪽 이동 버튼 눌림 유무 */
    pressingRight           : boolean;
    /** 위쪽  이동 버튼 눌림 유무 */
    pressingUp              : boolean;
    /** 아래쪽  이동 버튼 눌림 유무 */
    pressingDown            : boolean;
    /** 공격 버튼 눌림 유무 */
    pressingAttack          : boolean;
    /** 특수 공격 버튼 눌림 유무 */
    pressingSpecialAttack   : boolean;
    /** 공격 방향 (각도) */
    attackAngle             : number;
    /** 최대 이동 속도 */
    moveSpeedMax            : number;
    /** 인벤토리 컨트롤러 */
    inventory               : InventoryController;

    /** 생성자 */
    constructor( id:string,userName:string,mapId:string,x:number,y:number,socket:SocketIO.Socket ) {
        super(id,mapId,x,y);

        this.socket                     = socket;

        this.model.width                = setWnumber(18*2);
        this.model.height               = setWnumber(25*2);
        this.model.userName             = setWstring(userName);
        this.model.hp                   = setWnumber(10);
        this.model.hpMax                = setWnumber(10);
        this.model.score                = setWnumber(0);

        this.moveSpeedMax               = 10;
        this.attackAngle                = 0;

        this.pressingLeft               = false;
        this.pressingRight              = false;
        this.pressingUp                 = false;
        this.pressingDown               = false;
        this.pressingAttack             = false;
        this.pressingSpecialAttack      = false;

        this.inventory                  = new InventoryController(this);

        this.respawn();
    }
    /** 시작 */
    start() {
        // 이벤트들 등록
        this.onKeyState     ();
        this.onChangeMap    ();
        this.onRunScript    ();
        this.onChat         ();
        this.onWhisper      ();
        this.onUseItem      ();
        this.onDisconnect   ();
        // 엔티티 생성
        this.socket.emit('create',{
            myId    : this.socket.id,
            players : playerManager.getCreatePack(),
            bullets : bulletManager.getCreatePack(),
        });
    }
    /** 갱신 */
    update() {
        super.update();
        this.updateMoveSpeed();

        // 탄환 생성
        if( this.pressingAttack ) {
            this.shootBullet( this.attackAngle, 30 )
        }
        // 특수 탄환 생성
        if( this.pressingSpecialAttack ) {
            // 7발 발사
            for( let c=-3; c<4; ++c ) {
                this.shootBullet( c*10 + this.attackAngle, 10 )
            }
        }
    }
    /** 총알 발사 */
    shootBullet = ( angle: number, lifeTime: number ) => {

        // 총알을 발사할때마다 일정 확률로 인벤에 포션이 생성됨
        if( Math.random() < 0.1 ) {
            this.inventory.addItem("potion",1);
        }
        bulletManager.createBullet( this.model.mapId.value, this.model.x.value, this.model.y.value,angle, lifeTime, this );
    }
    /** 리스폰 */
    respawn = () => {
        this.model.hp.value         = this.model.hpMax.value;
        this.model.x                = setWnumber(Math.random() * (CONST.MAP_WIDTH-100) + 50);
        this.model.y                = setWnumber(Math.random() * (CONST.MAP_HEIGHT-100) + 50);
        this.pressingLeft           = false;
        this.pressingRight          = false;
        this.pressingUp             = false;
        this.pressingDown           = false;
        this.pressingAttack         = false;
        this.pressingSpecialAttack  = false;
        this.attackAngle            = 0;
    }
    /** 이동속도 갱신 */
    updateMoveSpeed = () => {
        // 이동
        if( this.pressingRight ) {
            this.moveSpeedX = this.moveSpeedMax;
        } else if( this.pressingLeft ) {
            this.moveSpeedX =-this.moveSpeedMax;
        } else {
            this.moveSpeedX = 0;
        }
        if( this.pressingDown ) {
            this.moveSpeedY = this.moveSpeedMax;
        } else if( this.pressingUp ) {
            this.moveSpeedY =-this.moveSpeedMax;
        } else {
            this.moveSpeedY = 0;
        }
    }
    /** 이벤트 : 키보드 상태 변경 */
    private onKeyState = () => {
        this.socket.on( 'keyState', (pack:{inputId:string,state:any})=>{
            //console.log(data.inputId);
            switch( pack.inputId ) {
            case 'left'         : this.pressingLeft           = pack.state; break;
            case 'right'        : this.pressingRight          = pack.state; break;
            case 'up'           : this.pressingUp             = pack.state; break;
            case 'down'         : this.pressingDown           = pack.state; break;
            case 'attack'       : this.pressingAttack         = pack.state; break;
            case 'specialAttack': this.pressingSpecialAttack  = pack.state; break;
            case 'attackAngle'  : this.attackAngle            = pack.state; break;
            }
        });
    }
    /** 이벤트 :  맵 변경 */
    private onChangeMap = () => {
        this.socket.on('changeMap', (pack:string) => {
            if( this.model.mapId.value === 'field' ) {
                this.model.mapId.value = 'forest';
            } else {
                this.model.mapId.value = 'field';
            }
        });
    }
    /** 이벤트 : 채팅 입력 */
    private onChat = () => {
        this.socket.on('chat', ( pack:string ) => {
            for( let id in playerManager.list ) {
                playerManager.list[id].socket.emit('chat', this.model.userName.value + ' : ' + pack );
            }
        });
    }
    /** 이벤트 : 귓속말 입력 */
    private onWhisper = () => {
        this.socket.on('whisper', ( data:{userName:string, message:string} ) => { //{userName,message}
            let toSocket:SocketIO.Socket|null = null;
            for( let id in playerManager.list ) {
                let controller = playerManager.list[id];
                if(controller.model.userName.value === data.userName ) {
                    toSocket = controller.socket;
                    break;
                }
            }
            if( toSocket === null ) {
                this.socket.emit('chat', 'The player ' + data.userName + ' is not online.' );
            } else {
                toSocket.emit('chat', 'From ' + this.model.userName.value + ':' + data.message );
                this.socket.emit('chat', 'To ' + data.userName + ':' + data.message );
            }
        });
    }
    /** 이벤트 : 스크립트 실행 */
    private onRunScript = () => {
        this.socket.on('runScript', ( pack:string ) => {
            this.socket.emit('runScript', runScript(pack));
        });
    }
    /** 이벤트 : 아이템 사용 */
    private onUseItem = () => {
        this.socket.on('useItem', (itemId:string) => {
            if( !this.inventory.hasItem( itemId, 1) ) {
                console.warn("Cheater!!!");
                // 테스트 : 아이템이 인벤토리에 없는 상태에서 크롬 콘솔창에서 아래와 같이 입력한다.
                // > socket.emit("useItem","superAttack")
                return;
            }
            let slot = this.inventory.getSlot(itemId);
            if( slot ) {
                let itemController = tableItemManager.list[slot.item.id];
                if( itemController ) {
                    itemController.useAction( this );
                }
            }
        });
    }
    // 접속 종료
    private onDisconnect = () => {
        this.socket.on('disconnect',()=>{
            playerManager.deletePlayer(this);
        });
    }
}

// -----------------------------------------------------------------------------
/** 플레이어 관리자 */
// -----------------------------------------------------------------------------
export class PlayerManager extends EntityManager {
    /** 플레이어 리스트 */
    list : {[id:string]:PlayerController} = {};
    /** 플레이어 생성 */
    createPlayer = ( socket: SocketIO.Socket, userName: string ) => {
        let playerId = socket.id;

        let mapId = 'forest';
        if( Math.random() < 0.5 ) {
            mapId = 'field';
        }

        // 플레이어 생성 > 등록 > 클라이언트에 알림
        let player = new PlayerController(playerId,userName,mapId,0,0,socket);
        this.register(player);
        player.start();
    }
    /** 플레이어 삭제 */
    deletePlayer = (player:PlayerController) => {
        delete this.list[player.model.id];
        this.removePack.push(player.model.id);
    }
}
/** 플레이어 관리자(인스턴스) */
export const playerManager = new PlayerManager();

