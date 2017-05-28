// -----------------------------------------------------------------------------
// inventory : 인벤토리
// -----------------------------------------------------------------------------
import {IInventory, IInventorySlot} from '../shared/model-client';
import {network} from './network-client';
import {PlayerController} from './player';

// -----------------------------------------------------------------------------
/** 인벤토리 컨트롤러 */
// -----------------------------------------------------------------------------
export class InventoryController {
    /** 인벤토리 데이터 모델 */
    model : IInventory;
    /** 인벤토리 소유자 */
    owner : PlayerController;

    /** 생성자 */
    constructor( owner : PlayerController ) {
        this.owner = owner;
        this.model = {slots:[]}

        this.onUpdateInventory();
    }
    /** 이벤트 : 인벤토리 갱신 */
    private onUpdateInventory() {
        network.onUpdateInventory( (model:IInventory) => {
            this.model = model;
            this.refresh();
        });
    }
    /** 새로고침 */
    private refresh = () => {
        // 슬롯 버튼들 새로 생성
        let inventory = document.getElementById("inventory") as HTMLDivElement;
        inventory.innerHTML = "";

        const addButton = ( slot:IInventorySlot ) => {
            let button = document.createElement('button');
            button.onclick = () => {
                network.useItem( slot.item.id );
            }
            button.innerText = slot.item.name + " x " + slot.amount;
            inventory.appendChild(button);
        }

        for( let slotIndex in this.model.slots ) {
            addButton( this.model.slots[slotIndex] );
        }
    }
}
