// -----------------------------------------------------------------------------
// entity : 엔티티
// -----------------------------------------------------------------------------
import CONST from '../shared/constant';
import * as Util from '../shared/util';
import {network} from './network-client';
import {IEntity} from '../shared/model-client';
import {playerManager} from './player';

// -----------------------------------------------------------------------------
/** 엔티티 컨트롤러 */
// -----------------------------------------------------------------------------
export class EntityController  {
    /** 엔티티 데이터 모델 */
    model : IEntity;
    /** 현재좌표(x) */
    cx     : number;
    /** 현재좌표(y) */
    cy     : number;

    /** 생성자 */
    constructor(model:IEntity) {
        this.model = model;
        this.cx = model.x;
        this.cy = model.y;
    }
    /** 위치 갱신 */
    updatePosition() {
        // 플레이어 기준 좌표로 변환
        this.cx = this.model.x - playerManager.myPlayer.model.x + CONST.SCREEN_WIDTH/2;
        this.cy = this.model.y - playerManager.myPlayer.model.y + CONST.SCREEN_HEIGHT/2;
    }
    /** 갱신 */
    update() {
        this.updatePosition();
    }
    /** 이벤트 : 데이터 모델 갱신 */
    onUpdate = (update:any) => {
        let names = Object.getOwnPropertyNames( this.model );
        for( let name of names ) {
            if( update[name] ) {
                //console.log(name,update[name]);
                (<any>this.model)[name] = update[name];
            }
        }
    }
}
// -----------------------------------------------------------------------------
/** 엔티티 관리자 */
// -----------------------------------------------------------------------------
export class EntityManager {
    /** 엔티티 리스트 */
    list : {[id:string]:EntityController} = {};

    /** 갱신 */
    update () {
        for( let id in this.list ) {
            this.list[id].update();
        }
    }
}
