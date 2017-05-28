// -----------------------------------------------------------------------------
// packet-name : 패킷명
// -----------------------------------------------------------------------------

export class Packet {

    //keyState        : 'keyState',
    //changeMap       : 'changeMap',
    //chat            : 'chat',
    //whisper         : 'whisper',
    //runScript       : 'runScript',
    //useItem         : 'useItem',
    //create          : 'create',
    //update          : 'update',
    //remove          : 'remove',
    //updateInventory : 'updateInventory',
};


/*
// -----------------------------------------------------------------------------
// 플레이어 소켓 헨들러
export class PlayerSocketHandler {
    socket  : SocketIO.Socket;
    player  : PlayerController;

    // 생성자
    constructor( socket:SocketIO.Socket, player:PlayerController ) {

        this.socket = socket;
        this.player = player;

        // 이벤트들 등록
        this.onDisconnect   ();
        this.onKeyState     ();
        this.onChangeMap    ();
        this.onChat         ();
        this.onWhisper      ();
        this.onRunScript    ();
        this.onUseItem      ();
    }

    // 모든 엔티티 생성
    creates = () => {
        this.create({
            myId    : this.socket.id,
            players : playerManager.getCreatePack(),
            bullets : bulletManager.getCreatePack(),
        });
    }
    // 엔티티 생성
    create = ( pack:any ) => {
        this.socket.emit( 'create', pack );
    }
    // 엔티티 갱신
    update = ( pack:any ) => {
        this.socket.emit( 'update', pack );
    }
    // 엔티티 삭제
    remove = ( pack:any ) => {
        this.socket.emit( 'remove', pack );
    }
    // 채팅
    chat = ( pack:any ) => {
        this.socket.emit( 'chat', pack );
    }
    // 인벤토리 갱신
    updateInventory = () => {
        this.socket.emit('updateInventory', this.player.inventory.model );
    }
    // 이벤트 : 접속 종료
    onDisconnect = () => {
        this.socket.on('disconnect',()=>{
            playerManager.disconnect(this.player);
            socketManager.disconnect(this.socket.id);
        });
    }

    on = (name:string) => {
        this.socket.on( )
    }

    // 이벤트 : 키보드 상태 변경
    onKeyState = ( callback:{(inputId:string,state:number):void} ) => {
        this.socket.on('keyState',(pack:any)=>{
            //console.log(pack.inputId);
            callback( pack.inputId, pack.state );
        });
    }
    // 이벤트 : 맵 교체
    onChangeMap = ( callback:{():void} ) => {
        this.socket.on('changeMap', () => {
            callback();
        });
    }
    // 이벤트 : 채팅
    onChat = ( callback:{(message:string):void}) => {
        this.socket.on('chat', (pack:any) => {
            callback(pack);
        });
    }
    // 이벤트 : 귓속말
    onWhisper = ( callback:{(pack:any):void} ) => {
        this.socket.on('whisper', (pack:any) =>{
            callback(pack);
        });
    }



    // 스크립트 실행 : 서버 해킹(데이터베이스를 조작하거나 삭제하는등...)이 가능할 수 있으므로 아무에게나 허용되지 않도록 서비스 전에 반드시 삭제하거나 관리자만 허용되도록 개선해야 한다.
    onRunScript = ( callback:{(pack:any):void} ) => {
        this.socket.on('runScript',(pack:any)=>{

            if( !CONST.DEBUG ) return;
            try {
                let res = eval(pack); // eval() 자바스크립트 코드를 계산하고 실행한다. (https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/eval)
                this.socket.emit('runScript', res );
            } catch (e){
                console.error(e);
            }
        });
    }
    // 아이템 사용
    onUseItem = () => {
        this.socket.on('useItem', (itemId:string) => {
            if( !this.player.inventory.hasItem( itemId, 1) ) {
                console.warn("Cheater!!!");
                // 테스트 : 아이템이 인벤토리에 없는 상태에서 크롬 콘솔창에서 아래와 같이 입력한다.
                // > socket.emit("useItem","superAttack")
                return;
            }
            let slot = this.player.inventory.getSlot(itemId);
            if( slot ) {
                let itemController = tableItemManager.list[slot.item.id];
                if( itemController ) {
                    itemController.useAction( this.player );
                }
            }
        });
    }
}


// 소켓 관리자
export class SocketManager {
    // 소켓 리스트
    list : {[id:string]:SocketIO.Socket} = {};
    // 접속자수 (누적수)
    connectCounter = 0;
    // 생성
    create = (server:Http.Server) => {
        let io = SocketIO( server, {} );
        io.sockets.on('connection', (socket:SocketIO.Socket)=>{
            console.log('socket connection : '+ socket.id );
            this.connect(socket);
        });
    }
    // 클라이언트 접속
    private connect = (socket:SocketIO.Socket) => {

        this.list[socket.id] = socket;

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
        const onSignIn = (userName:string,err:string,success:boolean) => {
            if( success ) {
                if(CONST.DEBUG){
                    userName = "player-" + this.connectCounter;
                }
                this.connectCounter++;
                // 플레이어 생성 및 등록
                playerManager.onConnect(socket,userName);
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
    // 클라이언트 접속 종료
    disconnect = (id:string) => {
        delete this.list[id];
    }
}
export const socketManager = new SocketManager();
*/