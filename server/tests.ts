
// -----------------------------------------------------------------------------
// tests : 서버 코드 검증
// -----------------------------------------------------------------------------
import * as test from 'tape';


test('test',(t)=>{
    t.true( true, "test true 실패" );
    t.equal( 1,1,"test equal 실패" );
    t.end();
});


// TODO : itemManager.list[itemId] 에서 아이템 찾기 검증