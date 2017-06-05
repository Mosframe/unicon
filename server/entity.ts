// -----------------------------------------------------------------------------
// entity : 엔티티
// -----------------------------------------------------------------------------
import * as SocketIO from 'socket.io';
import * as Util from './shared/util';
import {setWboolean,setWnumber,setWstring,watch} from './shared/watch-type';
import {IEntity} from './shared/model-server';
import {PlayerController,playerManager} from './player';
import {BulletController,bulletManager} from './bullet';


// -----------------------------------------------------------------------------
/** 엔티티 컨트롤러 */
// -----------------------------------------------------------------------------
export class EntityController {
    /** 엔티티 데이터 모델 */
    model       : IEntity;
    /** x축 이동속도 */
    moveSpeedX  : number = 0;
    /** y축 이동속도 */
    moveSpeedY  : number = 0;

    /** 생성자 */
    constructor( id:string, mapId:string, x:number, y:number ) {
        this.model = {
            id          : id,
            mapId       : setWstring(mapId),
            x           : setWnumber(x),
            y           : setWnumber(y),
            width       : setWnumber(0),
            height      : setWnumber(0),
        };
    }
    /** 갱신 */
    update() {
        this.updatePosition();
    }
    /** 위치 갱신 */
    updatePosition() {
        this.model.x.value += this.moveSpeedX;
        this.model.y.value += this.moveSpeedY;
    }
    /** 생성 패킷 얻기 */
    getCreatePack = () : string => {
        return JSON.stringify(this.model,(key:string,value:any)=>{
            if( value instanceof watch ) {
                return value.value;
            }
            return value;
        });
    }
    /** 갱신 패킷 얻기 : 변경된 데이터만 추출함 */
    getUpdatePack = () : string => {
        // 변경된 값이 있을때만 패킷에 id를 추가해 준다.
        let json =  JSON.stringify(this.model,(key:string,value:any)=>{
            //console.log(key);
            if( value instanceof watch ) {
                if( value.changed ) {
                    return value.flush;
                }
                return undefined;
            }
            if( !key ) return value; // 처음 콜백은 키가 없이 모든 JSON 문자열 value로 나온다.
            return undefined;
        });
        if( json.length > 2 ) { // 변경된 값이 없을때 : {}
            json = '{"id":"' + this.model.id +'",'+json.substr(1);
        } else {
            json = '';
        }
        return json;
    }
    /** 삭제 패킷 얻기 */
    getRemovePack = () : string => {
        return JSON.stringify(this.model.id);
    }
    //** 다른 엔티티와의 거리값을 구한다. */
    getDistance = ( target:EntityController ) : number => {
        let vx = this.model.x.value - target.model.x.value;
        let vy = this.model.y.value - target.model.y.value;
        return Math.sqrt( vx*vx + vy*vy );
    }
    /** 다른 엔티티와 충돌 유무를 알아낸다. */
    testCollision = ( target:EntityController ) : boolean => {
        let rect1 = {
            x       : this.model.x.value-this.model.width.value/2,
            y       : this.model.y.value-this.model.height.value/2,
            width   : this.model.width.value,
            height  : this.model.height.value,
        }
        let rect2 = {
            x       : target.model.x.value-target.model.width.value/2,
            y       : target.model.y.value-target.model.height.value/2,
            width   : target.model.width.value,
            height  : target.model.height.value,
        }
        return Util.testCollisionRect2( rect1, rect2 );
    }
}

// -----------------------------------------------------------------------------
/** 엔티티 관리자 */
// -----------------------------------------------------------------------------
export class EntityManager {
    /** 엔티티 리스트 */
    list : {[id:string]:EntityController} = {};
    /** 엔티티 생성 패킷 목록 : 최근 새로 생성된 엔티티 목록 */
    createPack : string[] = [];
    /** 엔티티 갱신 패킷 목록 : 최근 새로 갱신된 엔티티 목록 */
    updatePack : string[] = [];
    /** 엔티티 삭제 패킷 목록 : 최근 삭제된 엔티티 목록 */
    removePack : string[] = [];

    /** 엔티티 등록 */
    protected register (entity:EntityController) {
        this.list[entity.model.id] = entity;
        this.createPack.push( entity.getCreatePack() );
    }
    /** 엔티티 등록해제 */
    unregister ( id:string )  {
        delete this.list[id];
        this.removePack.push(id);
    }
    /** 업데이트 */
    update() {
        // 모든 엔티티 업데이트 & 업데이트 패킷 생성
        for( let id in this.list ) {
            let entity = this.list[id];
            entity.update();
            let pack = entity.getUpdatePack();
            if( pack ) {
                this.updatePack.push( pack );
            }
        }

        // 모든 변화된 패킷들을 묶는다.
        let packs = {
            create: this.createPack,
            update: this.updatePack,
            remove: this.removePack,
        };

        // 갱신후 모든 팩킷들은 초기화 한다.
        this.createPack  = [];
        this.updatePack  = [];
        this.removePack  = [];

        return packs;
    }
    /** 생성 패키지를 만든다. */
    getCreatePack() {
        let pack:string[] = [];
        // 모든 엔티티 업데이트 & 업데이트 패킷 생성
        for( let id in this.list ) {
            let entity = this.list[id];
            pack.push( entity.getCreatePack() );
        }
        return pack;
    }
}

