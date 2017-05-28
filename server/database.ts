// -----------------------------------------------------------------------------
// database : 데이터베이스
// -----------------------------------------------------------------------------
import CONST from './shared/constant';
import {tableItemManager} from './table-item';
import {PlayerController,playerManager} from './player';
import {BulletController,bulletManager} from './bullet';

// -----------------------------------------------------------------------------
/** 데이터베이스 */
// TODO : 향후 mongojs를 타입을 제공하는 mongoose로 변경을 시도해 본다.
// -----------------------------------------------------------------------------
export class Database {
    /** DB 커넥터 */
    private db:any;

    /** 생성자 */
    constructor() {
        let mongojs = require('mongojs');
        this.db = mongojs('localhost:27017/Unicon',['account','progress']);
    }
    /** 비밀번호 검증 */
    isValidPassword = ( userName:string, password:string, callback:{(err:any,success:boolean):void} )=> {
        this.db.account.find({userName,password},(err:any,res:string)=>{
            let success = false;
            if( err )
                console.error( err );
            else
                if( res.length > 0 )
                    success = true;
            callback( err, success );
        });
    };
    /** 회원 확인 */
    isMember = ( data:{userName:string, password:string}, callback:{(err:any,success:boolean):void} )=> {
        this.db.account.find({userName:data.userName},(err:any,res:string)=>{
            let success = false;
            if( err )
                console.error( err );
            else
                if( res.length > 0 )
                    success = true;
            callback( err, success );
        });
    };
    /** 회원 등록 */
    addMember = ( data:{userName:string, password:string}, callback:{(err:any,success:boolean):void} )=> {
        // 이미 등록된 회원이 있는가?
        this.isMember( data, (err:any,success:boolean)=> {
            if( success )
                callback( err, false );
            else {
                this.db.account.insert({userName:data.userName,password:data.password},(err:any)=> {
                    if( err ) {
                        console.error( err );
                    } else {
                        success = true;
                    }
                    callback( err, success );
                });
            }
        });
   };
}
/** 데이터베이스(인스턴스) */
export let db:Database;
if( CONST.DATABASE ) {
    db = new Database();
}
