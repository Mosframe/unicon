// -----------------------------------------------------------------------------
// inventory : 인벤토리
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// 인벤토리
Inventory = function() {
    var self = {
        slots:[], // {id:"itemId",amount:1}
    }
    // -------------------------------------------------------------------------
    // 아이템 추가
    self.addItem = function( id, amount ) {
        for( var i=0; i<self.slots.length; ++i ) {
            if(self.slots[i].id === id ) {
                self.slots[i].amount += amount;
                self.refrashRender();
                return;
            }
        }
        self.slots.push({id:id,amount:amount});
        self.refrashRender();
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
                self.refrashRender();
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
    // 새로고침 후 렌더링
    self.refrashRender = function() {
        var str = "";
        for( var i=0; i<self.slots.length; ++i ) {
            let slot = self.slots[i];
            let item = Item.list[slot.id];
            console.log("slot.amount="+slot.amount);
            let onclick = "Item.list['" + item.id + "'].event()";
            str += "<button onclick=\"" + onclick + "\">" + item.name + " x " + slot.amount + "</button><br>";
        }
        document.getElementById("inventory").innerHTML = str;
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
Item( "potion","Potion",function() {
    player.hp = 10;
    playerInventory.removeItem("potion",1);
});
// 적군 소환
Item( "enemy","Spawn Enemy",function() {
    Enemy.randomlyGenerate();
    playerInventory.removeItem("enemy",1);
});


