// -----------------------------------------------------------------------------
// inventory : 인벤토리
// -----------------------------------------------------------------------------
import {setWboolean,setWnumber,setWstring,watch} from './shared/watch-type';
import {IInventory,IInventorySlot,ITableItem} from './shared/model-server';
import {PlayerController} from './Player';
import {tableItemManager} from './table-item';

// -----------------------------------------------------------------------------
/** 캐릭터 인벤토리 슬롯 컨트롤러 */
// -----------------------------------------------------------------------------
export class InventorySlotController {
    /** 인벤토리 슬롯 데이터 모델 */
    model : IInventorySlot;

    /** 생성자 */
    constructor( itemId:string, amount:number ) {
        let itemController = tableItemManager.list[itemId];
        if( itemController ) {
            this.model = {
                item:itemController.model,
                amount:amount,
            }
        }
    }
}

// -----------------------------------------------------------------------------
/** 인벤토리 */
// -----------------------------------------------------------------------------
export class InventoryController {
    /** 인벤토리 데이터 모델 */
    model   : IInventory;
    /** 인벤토리 소유자 */
    owner   : PlayerController;

    /** 생성자 */
    constructor( owner:PlayerController ) {
        this.model = {slots:[]};
        this.owner = owner;
    }
    /** 아이템 추가 */
    addItem ( itemId: string, amount: number ) {
        for( let slotId in this.model.slots ) {
            let slot = this.model.slots[slotId];

            if( slot.item.id === itemId ) {
                slot.amount += amount;
                this.refresh();
                return;
            }
        }
        //constructor( id:string, name:string, amount:number, useAction:any ) {
        let itemController = tableItemManager.list[itemId];
        if( !itemController ) {
            console.error(`itemManager.list[${itemId}]=${itemController}`);
            return;
        }
        this.model.slots.push( {item:itemController.model,amount:amount} );
        this.refresh();
    };
    /** 아이템 삭제 */
    removeItem ( itemId: string, amount: number ) {
        for( let slotIndex in this.model.slots ) {
            let slot = this.model.slots[slotIndex];
            if(slot.item.id === itemId ) {
                slot.amount -= amount;
                if( slot.amount <= 0 ) {
                    this.model.slots.splice( Number(slotIndex),1 );
                    if( slot.amount < 0 ) {
                        this.removeItem( itemId, -slot.amount );
                        return;
                    }
                }
                this.refresh();
                return;
            }
        }
    };
    /** 아이템 소유 유무 확인 */
    hasItem ( itemId:string, amount:number ) {
        let totalAmount = 0;
        for( let slotIndex in this.model.slots ) {
            let slot = this.model.slots[slotIndex];
            if(slot.item.id === itemId ) {
                totalAmount += slot.amount;
            }
        }
        return totalAmount >= amount;
    };
    /** 슬롯 얻기 */
    getSlot ( itemId:string ) {
        for( let slotIndex in this.model.slots ) {
            let slot = this.model.slots[slotIndex];
            if(slot.item.id === itemId ) {
                return slot;
            }
        }
    };
    /** 아이템 사용 */
    useItem ( itemId:string, amount:number ) {
        if( !this.hasItem( itemId, 1) ) {
            console.warn("Cheater!!!");
            // 테스트 : 아이템이 인벤토리에 없는 상태에서 크롬 콘솔창에서 아래와 같이 입력한다.
            // > socket.emit("useItem","superAttack")
            return;
        }
        let slot = this.getSlot(itemId);
        if( slot ) {
            let itemController = tableItemManager.list[slot.item.id];
            if( itemController ) {
                itemController.useAction( this.owner );
            }
        }
    }
    /** 인벤토리 갱신 패킷 전송 */
    refresh () {
        this.owner.socket.emit( 'updateInventory', this.model );
    }
}
