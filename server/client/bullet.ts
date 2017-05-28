// -----------------------------------------------------------------------------
// bullet : 총알
// -----------------------------------------------------------------------------
import CONST from '../shared/constant';
import * as Util from '../shared/util';
import {IBullet} from '../shared/model-client';
import {network} from './network-client';
import {EntityController,EntityManager} from './entity';
import {InventoryController} from './inventory';
import {PlayerController,playerManager} from './player';


// -----------------------------------------------------------------------------
/** 총알 컨트롤러 */
// -----------------------------------------------------------------------------
export class BulletController extends EntityController {
    /** 총알 데이터 모델 */
    model : IBullet;
    /** 총알 이미지 */
    image : HTMLImageElement;

    /** 생성자 */
    constructor( model:IBullet ) {
        super( model );

        this.image      = new Image();
        this.image.src  = "./client/images/bullet.png";
    }
    /** 총알 렌더링 */
    draw( gameCtx:CanvasRenderingContext2D ) {
        if( playerManager.myPlayer.model.mapId !== this.model.mapId ) return;

        gameCtx.drawImage( this.image,
            0, 0, this.image.width, this.image.height,
            this.cx-this.model.width/2, this.cy-this.model.height/2, this.model.width, this.model.height );
    }
}

// -----------------------------------------------------------------------------
/** 총알 관리자 */
// -----------------------------------------------------------------------------
export class BulletManager extends EntityManager {
    /** 총알 리스트 */
    list : {[id:string]:BulletController} = {};
    /** 총알 생성 */
    createBullet = (model:IBullet) : BulletController => {
        //console.log(model);
        let bullet = new BulletController(model);
        //console.log(bullet);
        this.list[bullet.model.id] = bullet;
        return bullet;
    }
}
/** 총알 관리자(인스턴스) */
export let bulletManager = new BulletManager();

