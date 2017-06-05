// -----------------------------------------------------------------------------
// script : 서버 스크립트
// -----------------------------------------------------------------------------
import {bulletManager} from './bullet';
import {playerManager} from './player';
import {tableItemManager} from './table-item';


/** 스크립트 실행 */
export const runScript = (script:string) : any => {
    let result:any;
    try {
        result = eval(script);
    } catch (err) {
        result = err.message;
    }
    return result;
}

/** 모델리스트를 JSON으로 변환 */
const modelListToJson = (list:any):string[] => {
    let result:string[] = [];
    for( let id in list ) {
        let e = list[id];
        if( e ) {
            result.push( JSON.stringify( e.model ) );
        }
    }
    return result;
}

/** 플레이어 리스트 얻기 */
let players = ():string[] => {
    return modelListToJson( playerManager.list );
}

/** 플레이어 정보 얻기 */
let player = (id:string,member:string):string[] => {
    let result:string[] = [];
    result.push( JSON.stringify( (<any>playerManager.list[id])[member] ) );
    return result;
}

/** 총알 리스트 얻기 */
let bullets = ():string[] => {
    return modelListToJson( bulletManager.list );
}

/** 총알 정보 얻기 */
let bullet = (id:string,member:string):string[] => {
    let result:string[] = [];
    result.push( JSON.stringify( (<any>bulletManager.list[id])[member] ) );
    return result;
}

/** 테이블아이템 리스트 얻기 */
let tableItems = ():string[] =>{
    return modelListToJson( tableItemManager.list );
}
/** 테이블아이템 정보 얻기 */
let tableItem = (id:string,member:string):string[] => {
    let result:string[] = [];
    result.push( JSON.stringify( (<any>tableItemManager.list[id])[member] ) );
    return result;
}
