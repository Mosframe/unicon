// -----------------------------------------------------------------------------
// table-item : 테이블 아이템
// -----------------------------------------------------------------------------
import {setWboolean,setWnumber,setWstring} from './shared/watch-type';
import {ITableItem } from './shared/model-server';
import {PlayerController} from './player';

/** 타입 : 아이템 사용 액션 */
type UseAction = {(player:PlayerController):void};

// -----------------------------------------------------------------------------
/** 테이블아이템 컨트롤러 */
// -----------------------------------------------------------------------------
export class TableItemController {
    /** 테이블아이템 모델 */
    model       : ITableItem;
    /** 아이템 사용 액션 */
    useAction   : UseAction;

    /** 생성자 */
    constructor( id:string, name:string, useAction:UseAction ) {
        this.model = {
            id,
            name,
        }
        this.useAction = useAction;
    }
}
// -----------------------------------------------------------------------------
/** 테이블아이템 관리자 */
// -----------------------------------------------------------------------------
export class TableItemManager {
    /** 테이블아이템 리스트 */
    list : {[id:string]:TableItemController} = {};
    /** 테이블 아이템 생성 */
    createItem ( id:string, name:string, useAction:UseAction ) {
        let item = new TableItemController( id, name, useAction );
        this.list[item.model.id] = item;
    }
}
/** 테이블아이템 관리자(인스턴스) */
export const tableItemManager = new TableItemManager;

// -----------------------------------------------------------------------------
/** 아이템 생성 : HP 포션 */
// -----------------------------------------------------------------------------
tableItemManager.createItem( "potion","Potion", (player:PlayerController) => {
    player.model.hp.value = 10;
    player.inventory.removeItem("potion",1);

    // 포션을 먹으면 인벤토리에 슈퍼공격 아이템이 생겨남
    player.inventory.addItem("superAttack", 1);
});

// -----------------------------------------------------------------------------
/** 아이템 생성 : 슈퍼 공격 */
// -----------------------------------------------------------------------------
tableItemManager.createItem( "superAttack","Super Attack", (player:PlayerController) => {
    for( let c=0; c<360; c+=10 ) {
        player.shootBullet(c,30);
    }
    player.inventory.removeItem("superAttack",1);
});

