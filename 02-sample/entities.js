// -----------------------------------------------------------------------------
// entities : 엔티티 객체들
// -----------------------------------------------------------------------------

var createPack  = {players:[],bullets:[]};
var removePack  = {players:[],bullets:[]};

// -----------------------------------------------------------------------------
// 엔티티
// -----------------------------------------------------------------------------

Entity = function(params) {
    var self = {
        id          : "",
        x           : MAP_WIDTH/2,
        y           : MAP_HEIGHT/2,
        width       : 20,
        height      : 20,
        moveSpeedX  : 0,
        moveSpeedY  : 0,
        map         : 'forest',
    }
    if(params) {
        if(params.x  ) self.x   = params.x;
        if(params.y  ) self.y   = params.y;
        if(params.map) self.map = params.map;
        if(params.id ) self.id  = params.id;
    }

    // 갱신
    self.update = function () {
        self.updatePosition();
    }
    // 위치 갱신
    self.updatePosition = function() {
        self.x += self.moveSpeedX;
        self.y += self.moveSpeedY;
    }
    // 타겟과의 거리값을 구한다.
    self.getDistance = function ( target ) {
        var vx = self.x - target.x;
        var vy = self.y - target.y;
        return Math.sqrt( vx*vx + vy*vy );
    }
    // 타겟과 충돌했는지 알아낸다.
    self.testCollision = function ( target ) {
        var rect1 = {
            x:self.x-self.width/2,
            y:self.y-self.height/2,
            width:self.width,
            height:self.height,
        }
        var rect2 = {
            x:target.x-target.width/2,
            y:target.y-target.height/2,
            width:target.width,
            height:target.height,
        }
        return util.testCollisionRect2( rect1, rect2 );
    }
    return self;
}
// 모든 엔티티들을 업데이트한 후 변화된 패킷들을 얻는다.
Entity.updateEntities = function() {
    // 모든 변화된 패킷들을 묶는다.
    var packs = {
        create: {
            players:createPack.players,
            bullets:createPack.bullets,
        },
        remove: {
            players:removePack.players,
            bullets:removePack.bullets,
        },
        update: {
            players:Player.updates(),
            bullets:Bullet.updates(),
        }
    };

    // 갱신후 모든 팩킷들은 초기화 한다.
    createPack.players  = [];
    createPack.bullets  = [];
    removePack.players  = [];
    removePack.bullets  = [];

    return packs;
}

// -----------------------------------------------------------------------------
// 플레이어
// -----------------------------------------------------------------------------
Player = function(params) {
    var self                    = Entity(params);
    self.width                  = 18*2;
    self.height                 = 25*2;
    self.username               = params.username;
    self.pressingLeft           = false;
    self.pressingRight          = false;
    self.pressingUp             = false;
    self.pressingDown           = false;
    self.pressingAttack         = false;
    self.pressingSpecialAttack  = false;
    self.attackAngle            = 0;
    self.moveSpeedMax           = 10;
    self.hp                     = 10;
    self.hpMax                  = 10;
    self.score                  = 0;
    self.inventory              = new Inventory(params.socket,true);

    // 갱신
    var super_update = self.update;
    self.update = function() {
        self.updateMoveSpeed();
        super_update();

        // 탄환 생성
        if( self.pressingAttack ) {
            self.shootBullet( self.attackAngle, 30 )
        }
        // 특수 탄환 생성
        if( self.pressingSpecialAttack ) {
            // 7발 발사
            for( var c=-3; c<4; ++c ) {
                self.shootBullet( c*10 + self.attackAngle, 10 )
            }
        }
    }
    // 총알 발사
    self.shootBullet = function(angle,lifeTime) {

        // 총알을 발사할때마다 일정 확률로 인벤에 포션이 생성됨
        if( Math.random() < 0.1 ) {
            self.inventory.addItem("potion",1);
        }
        Bullet({
            owner   : self,
            angle   : angle,
            x       : self.x,
            y       : self.y,
            lifeTime: lifeTime,
            map     : self.map,
        });
    }
    // 리스폰
    self.respawn = function() {
        self.hp                     = self.hpMax;
        self.x                      = Math.random() * (MAP_WIDTH-100) + 50;
        self.y                      = Math.random() * (MAP_HEIGHT-100) + 50;
        self.pressingLeft           = false;
        self.pressingRight          = false;
        self.pressingUp             = false;
        self.pressingDown           = false;
        self.pressingAttack         = false;
        self.pressingSpecialAttack  = false;
        self.attackAngle            = 0;
    }
    // 이동속도 갱신
    self.updateMoveSpeed = function() {
        // 이동
        if( self.pressingRight ) {
            self.moveSpeedX = self.moveSpeedMax;
        } else if( self.pressingLeft ) {
            self.moveSpeedX =-self.moveSpeedMax;
        } else {
            self.moveSpeedX = 0;
        }
        if( self.pressingDown ) {
            self.moveSpeedY = self.moveSpeedMax;
        } else if( self.pressingUp ) {
            self.moveSpeedY =-self.moveSpeedMax;
        } else {
            self.moveSpeedY = 0;
        }
    }
    // 생성 패킷 얻기
    self.getCreatePack = function() {
        return {
            id          : self.id,
            x           : self.x,
            y           : self.y,
            width       : self.width,
            height      : self.height,
            map         : self.map,
            username    : self.username,
            hp          : self.hp,
            hpMax       : self.hpMax,
            score       : self.score,
        };
    }
    // 갱신 패킷 얻기
    self.getUpdatePack = function() {
        return  {
            id      : self.id,
            x       : self.x,
            y       : self.y,
            map     : self.map,
            hp      : self.hp,
            score   : self.score,
        }
    }
    self.respawn();
    Player.list[self.id] = self;
    createPack.players.push( self.getCreatePack() );
    return self;
}
// 플레이어 리스트 생성
Player.list = {};
// 접속 이벤트
Player.onConnect = function(socket,username) {
    var map = 'forest';
    if( Math.random() < 0.5 ) {
        map = 'field';
    }
    // 플레이어 생성 > 등록
    var player = Player({
        id      : socket.id,
        username: username,
        map     : map,
        socket  : socket,
    });

    // 플레이어 입력 처리
    socket.on('keyPress',function(data){
        //console.log(data.inputId);
        switch( data.inputId ) {
        case 'left'         : player.pressingLeft           = data.state; break;
        case 'right'        : player.pressingRight          = data.state; break;
        case 'up'           : player.pressingUp             = data.state; break;
        case 'down'         : player.pressingDown           = data.state; break;
        case 'attack'       : player.pressingAttack         = data.state; break;
        case 'specialAttack': player.pressingSpecialAttack  = data.state; break;
        case 'attackAngle'  : player.attackAngle            = data.state; break;
        }
    });

    socket.on('changeMap',function(data){
        if( player.map === 'field' ) {
            player.map = 'forest';
        } else {
            player.map = 'field';
        }
    });

    // 채팅 입력 처리
    socket.on('sendChat',function(data){
        for( var i in sockets ) {
            sockets[i].emit('addChat', player.username + ' : ' + data );
        }
    });

    // 귓속말 입력 처리
    socket.on('sendWhisper',function(data){ //{username,message}
        var toSocket = null;
        for( var i in Player.list ) {
            if(Player.list[i].username === data.username ) {
                toSocket = sockets[i];
                break;
            }
        }
        if( toSocket === null ) {
            socket.emit('addChat', 'The player ' + data.username + ' is not online.' );
        } else {
            toSocket.emit('addChat', 'From ' + player.username + ':' + data.message );
            socket.emit('addChat', 'To ' + data.username + ':' + data.message );
        }
    });

    // 서버에 존재하는 엔티티 정보들을 클라이언트에 모두 전송해 준다.
    socket.emit('create',{
        myId:socket.id,
        players:Player.getCreatePacks(),
        bullets:Bullet.getCreatePacks(),
    });
}
// 모든 플레이어 생성팩을 얻는다.
Player.getCreatePacks = function() {
    var pack = [];
    for( var playerId in Player.list ) {
        pack.push( Player.list[playerId].getCreatePack() );
    }
    return pack;
}
// 접속종료 이벤트
Player.onDisconnect = function(socket) {
    delete Player.list[socket.id];
    removePack.players.push(socket.id);
}
// 플레이어 리스트 갱신
Player.updates = function(){
    var pack = [];
    // 모든 플레이어들의 각자 변경된 위치정보를 갱신하고 패키지에 담는다.
    for( var playerId in Player.list ) {
        var player = Player.list[playerId];
        player.update();
        pack.push( player.getUpdatePack() );
    }
    return pack;
}

// -----------------------------------------------------------------------------
// 탄환
// -----------------------------------------------------------------------------
Bullet = function(params){
    var self        = Entity(params);
    self.id         = Math.random();
    self.width      = 20,
    self.height     = 20,
    self.angle      = params.angle,
    self.moveSpeedX = Math.cos(params.angle/180*Math.PI) * 10;
    self.moveSpeedY = Math.sin(params.angle/180*Math.PI) * 10;
    self.owner      = params.owner;
    self.lifeTime   = params.lifeTime;
    self.toRemove   = false;

    // update
    var supper_update = self.update;
    self.update = function() {
        if( self.lifeTime-- <= 0) {
            self.toRemove = true;
        }
        supper_update();

        for( var i in Player.list ) {
            var player = Player.list[i];

            if( self.owner !== player
            &&  self.map === player.map
            &&  self.testCollision(player) ) {
                player.hp -= 1;
                if( player.hp <= 0 ) {
                    player.respawn();
                    if( self.owner ) self.owner.score += 1;
                }
                self.toRemove = true;
            }
        }
    }
    // 생성 패킷 얻기
    self.getCreatePack = function() {
        return {
            id      : self.id,
            x       : self.x,
            y       : self.y,
            width   : self.width,
            height  : self.height,
            map     : self.map,
        };
    }
    // 갱신 패킷 얻기
    self.getUpdatePack = function() {
        return  {
            id  : self.id,
            x   : self.x,
            y   : self.y,
        }
    }

    Bullet.list[self.id] = self;
    createPack.bullets.push( self.getCreatePack() );
    return self;
}
Bullet.list = {};
Bullet.updates = function() {
    var pack = [];
    // 모든 플레이어들의 각자 변경된 위치정보를 갱신하고 패키지에 담는다.
    for( var bulletId in Bullet.list ) {
        var bullet = Bullet.list[bulletId];
        bullet.update();
        if( bullet.toRemove ) {
            delete Bullet.list[bulletId];
            removePack.bullets.push(bullet.id);
        } else
            pack.push( bullet.getUpdatePack() );
    }
    return pack;
}
// 모든 총알 생성팩을 얻는다.
Bullet.getCreatePacks = function() {
    var pack = [];
    for( var bulletId in Bullet.list ) {
        pack.push( Bullet.list[bulletId].getCreatePack() );
    }
    return pack;
}
