// -----------------------------------------------------------------------------
// entity : 엔티티
// -----------------------------------------------------------------------------
import CONST from '../shared/constant';
import * as Util from '../shared/util';
import {network} from './network-client';
import {IPlayer,IInventory,IInventorySlot} from '../shared/model-client';
import {EntityController,EntityManager} from './entity';
import {InventoryController} from './inventory';
import {BulletController,bulletManager} from './bullet';


// -----------------------------------------------------------------------------
/** 플레이어 컨트롤러 */
// -----------------------------------------------------------------------------
export class PlayerController extends EntityController {

    model               : IPlayer;
    inventory           : InventoryController;
    image               : HTMLImageElement;

    /**
     * 플레이어(서버전용) 인스턴스 생성
     * @param {*} params
     *
     * @memberOf Player
     */
    constructor( model:IPlayer ) {
        super( model );

        this.inventory  = new InventoryController   ( this );

        this.image      = new Image();
        this.image.src  = "./client/images/player.png";
    }

    drawBody = (gameCtx:CanvasRenderingContext2D) => {
        if( playerManager.myPlayer.model.mapId !== this.model.mapId ) return;
        //console.log(this);
        gameCtx.drawImage( this.image,
            0,0,this.image.width,this.image.height,
            this.cx-this.model.width/2, this.cy-this.model.height/2, this.model.width, this.model.height );
    }

    drawHp = (gameCtx:CanvasRenderingContext2D) => {
        if( playerManager.myPlayer.model.mapId !== this.model.mapId ) return;
        let width = 30 * this.model.hp / this.model.hpMax;
        gameCtx.fillRect(this.cx-width/2,this.cy-this.model.height/2-10, width, 5 );
    }

    drawName =(gameCtx:CanvasRenderingContext2D) => {
        if( playerManager.myPlayer.model.mapId !== this.model.mapId ) return;
        gameCtx.fillText(this.model.userName,this.cx,this.cy-this.model.height/2-20);
    }
}

// -----------------------------------------------------------------------------
/**
 * 플레이어 관리자
 *
 * @export
 * @class PlayerManager
 */
export class PlayerManager extends EntityManager {
    /**
     * 플레이어 리스트
     *
     * @type {{[id:string]:Player}}
     * @memberOf PlayerManager
     */
    list : {[id:string]:PlayerController} = {};
    /**
     * 내 플레이어
     *
     * @type {PlayerController}
     * @memberof PlayerManager
     */
    myPlayer    :   PlayerController;
    /**
     * 플레이어 생성
     *
     *
     * @memberOf PlayerManager
     */
    createPlayer = (model:IPlayer) : PlayerController => {
        //console.log(model);
        let player = new PlayerController(model);
        //console.log(player);
        this.list[player.model.id] = player;
        return player;
    }
}

/** 플레이어 관리자 인스턴스 */
export let playerManager = new PlayerManager();