// -----------------------------------------------------------------------------
// bullet : 총알
// -----------------------------------------------------------------------------
import {setWboolean,setWnumber,setWstring} from './shared/watch-type';
import {IBullet} from './shared/model-server';
import {EntityController,EntityManager} from './entity';
import {PlayerController,playerManager} from './player';

// -----------------------------------------------------------------------------
/** 총알 컨트롤러 */
// -----------------------------------------------------------------------------
export class BulletController extends EntityController {
    /** 총알 데이터 모델 */
    model       :IBullet;
    /** 총알을 발사한 플레이어 */
    owner       : PlayerController;
    /** 진행 방향 (각도) */
    angle       : number;
    /** 생명 유지 시간 (초) */
    lifeTime    : number;
    /** 파괴됨 */
    toRemove    : boolean;

    /** 생성자 */
    constructor( mapId:string,x:number,y:number,angle:number,lifeTime:number,owner:PlayerController ) {
        super(''+Math.random(),mapId,x,y);

        this.model.width    = setWnumber(20);
        this.model.height   = setWnumber(20);
        this.angle          = angle;
        this.moveSpeedX     = Math.cos(angle/180*Math.PI) * 10;
        this.moveSpeedY     = Math.sin(angle/180*Math.PI) * 10;
        this.owner          = owner;
        this.lifeTime       = lifeTime;
        this.toRemove       = false;
    }
    /** 갱신 */
    update() {
        if( this.lifeTime-- <= 0) {
            this.toRemove = true;
        } else {
            super.update();
            for( let id in playerManager.list ) {
                let player = playerManager.list[id];

                if( this.owner !== player
                &&  this.model.mapId.value === player.model.mapId.value
                &&  this.testCollision(player) ) {
                    player.model.hp.value -= 1;
                    if( player.model.hp.value <= 0 ) {
                        player.respawn();
                        if( this.owner ) this.owner.model.score.value += 1;
                    }
                    this.toRemove = true;
                }
            }
        }

        if( this.toRemove ) {
            bulletManager.unregister( this.model.id );
        }
    }
}

// -----------------------------------------------------------------------------
/** 총알 관리자 */
// -----------------------------------------------------------------------------
export class BulletManager extends EntityManager {
    /** 총알 리스트 */
    list : {[id:string]:BulletController} = {}
    /** 총알 생성 */
    createBullet ( mapId:string, x:number, y:number, angle:number, lifeTime:number, owner:PlayerController ) {
        let bullet = new BulletController( mapId, x, y, angle, lifeTime, owner );
        this.register( bullet );
    }
}
/** 총알 관리자(인스턴스) */
export let bulletManager = new BulletManager();
