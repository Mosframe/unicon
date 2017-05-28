// -----------------------------------------------------------------------------
// inventory : 인벤토리
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// 인벤토리
Inventory = function(socket,isServer) {
    var self = {
        slots   : [], // {id:"itemId",amount:1}
        socket  : socket,
        isServer: isServer,
    }
    // -------------------------------------------------------------------------
    // 아이템 추가
    // 테스트 : /Player.list["sXsZf33jlnkXDrTCAAAB"].inventory.addItem('potion',10);
    self.addItem = function( id, amount ) {
        for( var i=0; i<self.slots.length; ++i ) {
            if(self.slots[i].id === id ) {
                self.slots[i].amount += amount;
                self.refresh();
                return;
            }
        }
        self.slots.push({id:id,amount:amount});
        self.refresh();
    };
    // -------------------------------------------------------------------------
    // 아이템 삭제
    self.removeItem = function( id, amount ) {
        for( var i=0; i<self.slots.length; ++i ) {
            if(self.slots[i].id === id ) {
                self.slots[i].amount -= amount;
                if( self.slots[i].amount <= 0 ) {
                    self.slots.splice(i,1);
                }
                self.refresh();
                return;
            }
        }
    };
    // -------------------------------------------------------------------------
    // 아이템 소유 유무 확인
    self.hasItem = function ( id, amount ) {
        for( var i=0; i<self.slots.length; ++i ) {
            if(self.slots[i].id === id ) {
                return self.slots[i].amount >= amount;
            }
        }
        return false;
    };
    // -------------------------------------------------------------------------
    // 새로고침
    self.refresh = function() {
        // 서버
        if( self.isServer ) {
            self.socket.emit('updateInventory',self.slots);
            return;
        }

        // 클라이언트 랜더링
        var inventory = document.getElementById("inventory");
        inventory.innerHTML = "";

        var addButton  = function(data) {
            let item = Item.list[data.id];
            let button = document.createElement('button');
            button.onclick = function() {
                self.socket.emit('useItem',item.id);
            }
            button.innerText = item.name + " x " + data.amount;
            inventory.appendChild(button);
        }

        for( var i=0; i<self.slots.length; ++i ) {
            addButton(self.slots[i]);
        }
    }
    if( self.isServer ) {
        self.socket.on('useItem', function(itemId){
            if( !self.hasItem( itemId, 1) ) {
                console.warn("Cheater!!!");
                // 테스트 : 아이템이 인벤토리에 없는 상태에서 크롭 콘솔창에서 아래와 같이 입력한다.
                // > socket.emit("useItem","superAttack")
                return;
            }
            let item = Item.list[itemId];
            item.event(Player.list[self.socket.id]);
        });
    }

    return self;
}

// -----------------------------------------------------------------------------
// 아이템
Item = function( id, name, event ) {
    var self = {
        id:id,
        name:name,
        event:event,
    }
    Item.list[self.id] = self;
    return self;
}
Item.list = {};

// 포션 사용
Item( "potion","Potion",function(player) {
    player.hp = 10;
    player.inventory.removeItem("potion",1);

    // 포션을 먹으면 인벤토리에 슈퍼공격 아이템이 생겨남
    player.inventory.addItem("superAttack", 1);
});
// 적군 소환
Item( "enemy","Spawn Enemy",function(player) {
    Enemy.randomlyGenerate();
    player.inventory.removeItem("enemy",1);
});
// 적군 소환
Item( "superAttack","Super Attack",function(player) {
    for( var c=0; c<360; c+=10 ) {
        player.shootBullet(c,30);
    }
    player.inventory.removeItem("superAttack",1);
});

