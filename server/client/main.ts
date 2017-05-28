// -----------------------------------------------------------------------------
// main : 클라이언트 시작점
// -----------------------------------------------------------------------------
import CONST from '../shared/constant';
import {network} from './network-client';
import {IInventorySlot,IInventory} from '../shared/model-client';
import {InventoryController} from './inventory';
import {EntityController} from './entity';
import {PlayerController,playerManager} from './player';
import {BulletController,bulletManager} from './bullet';

network.connect();

// -----------------------------------------------------------------------------
// 로그인 로직
// -----------------------------------------------------------------------------
let signPage         = document.getElementById('signPage'         ) as HTMLDivElement   ; //
let signPageUsername = document.getElementById('signPageUsername' ) as HTMLInputElement ; //
let signPagePassword = document.getElementById('signPagePassword' ) as HTMLInputElement ; //
let signPageSignIn   = document.getElementById('signPageSignIn'   ) as HTMLButtonElement; //
let signPageSignUp   = document.getElementById('signPageSignUp'   ) as HTMLButtonElement; //

/** 이벤트 : 로그인 버튼 클릭 */
signPageSignIn.onclick = () => {
    network.signIn(
         signPageUsername.value,
         signPagePassword.value,
         (err:string,success:boolean) => {
            if( err ) {
                console.error( err );
            }
            if( success ) {
                if( signPage && gamePage ) {
                    signPage.style.display = 'none';
                    gamePage.style.display = 'inline-block';
                }
            } else {
                alert("로그인 실패!");
            }
         }
    );
}

/** 이벤트 : 회원가입 버튼 클릭 */
signPageSignUp.onclick = function() {
    network.signUp(
        signPageUsername.value,
        signPagePassword.value,
        (err:string,success:boolean) => {
            if( err ) {
                console.error( err );
            }
            if( success ) {
                alert("회원가입 성공!");
            } else {
                alert("회원가입 실패!");
            }
        }
    );
}

// -----------------------------------------------------------------------------
// 채팅 로직
// -----------------------------------------------------------------------------
let chatText    =  document.getElementById('chatText'   ) as HTMLDivElement   ; // 채팅 출력 문자열
let chatForm    =  document.getElementById('chatForm'   ) as HTMLFormElement  ; // 채팅 입력 폼
let chatInput   =  document.getElementById('chatInput'  ) as HTMLInputElement ; // 채팅 입력 입력창

/** 이벤트 : 채팅창 입력 완료 */
chatForm.onsubmit = function(e) {
    e.preventDefault(); // 이벤트 전파(상위에 테그들에 전달)를 막지 않고 이벤트 실행 취소

    // 스크립트 : /code
    if( chatInput.value[0] === '/' )
        network.runScript( chatInput.value.slice(1), (result:any)=>{
            console.log(result);
        });
    // 귓속말 : @userName,message
    else if( chatInput.value[0] === '@' ) {
        network.whisper(
            chatInput.value.slice(1,chatInput.value.indexOf(',')),
            chatInput.value.slice(chatInput.value.indexOf(',')+1),
            (message:string) => {
                if( chatText ) {
                    chatText.innerHTML += `<div>${message}</div>`;
                }
            }
        );
    // 채팅
    } else {
        network.chat( chatInput.value, (message:string) =>{
            if( chatText ) {
                chatText.innerHTML += `<div>${message}</div>`;
            }
        });
    }
    chatInput.value = '';
}

// -----------------------------------------------------------------------------
// 게임 로직
// -----------------------------------------------------------------------------
let gamePage        = <HTMLDivElement           > document.getElementById('gamePage');
let gameCanvas      = <HTMLCanvasElement        > document.getElementById("gameCanvas");
let uiCanvas        = <HTMLCanvasElement        > document.getElementById("uiCanvas");
let gameCtx         = <CanvasRenderingContext2D > gameCanvas.getContext("2d"); // 게임 컨텍스트
let uiCtx           = <CanvasRenderingContext2D > uiCanvas.getContext("2d"); // UI 컨텍스트
let changeMapButton = <HTMLButtonElement        > document.getElementById("changeMapButton");
gameCtx.font = '20px Arial';
uiCtx.font = '20px Arial';


/** 이벤트 : 맵 교체 버튼 클릭 */
changeMapButton.onclick = () => {
    network.changeMap();
}

// 그래픽 리소스들
let images:any = {};
images.maps = {};
images.maps.field = new Image(),
images.maps.field.src   = "./client/images/map.png";
images.maps.forest = new Image(),
images.maps.forest.src  = "./client/images/map2.png";

/** 맵 렌더링 */
let drawMap = function() {
    let x = CONST.SCREEN_WIDTH/2 - playerManager.myPlayer.model.x;
    let y = CONST.SCREEN_HEIGHT/2 - playerManager.myPlayer.model.y;

    gameCtx.drawImage(images.maps[playerManager.myPlayer.model.mapId],x,y);
}

/** 마지막 렌더링된 점수 */
let lastScore:number|null = null;
/** 점수 렌더링 */
let drawScore = function() {
    if( lastScore === playerManager.myPlayer.model.score ) return;
    lastScore = playerManager.myPlayer.model.score;

    uiCtx.save();

    uiCtx.clearRect(0,0,500,500);

    uiCtx.font          = '20px Arial';
    uiCtx.fillStyle     = 'white';
    uiCtx.textAlign     = 'left';
    uiCtx.textBaseline  = 'middle';
    uiCtx.fillText("SCORE : "+playerManager.myPlayer.model.score,0,20);

    uiCtx.restore();
}

/** 모든 엔티티 갱신 */
const update = () => {
    playerManager.update();
    bulletManager.update();
}
/** Game캔버스 렌더링 */
const gameRendering = () => {
    gameCtx.save();

    gameCtx.clearRect(0,0,500,500);

    drawMap();

    gameCtx.fillStyle = 'green';
    for( let c in playerManager.list ) {
        playerManager.list[c].drawBody(gameCtx);
    }
    gameCtx.fillStyle = 'red';
    for( let c in playerManager.list ) {
        playerManager.list[c].drawHp(gameCtx);
    }

    gameCtx.font        = '16px Arial';
    gameCtx.fillStyle   = 'yellow';
    gameCtx.textAlign   = 'center';
    gameCtx.textBaseline= 'middle';
    for( let c in playerManager.list ) {
        playerManager.list[c].drawName(gameCtx);
    }

    gameCtx.fillStyle = 'purple';
    for( let c in bulletManager.list ) {
        bulletManager.list[c].draw(gameCtx);
    }
    gameCtx.restore();
}
/** UI캔버스 렌더링 */
const uiRendering = () => {
    drawScore();
}

/** 모든 캔버스 렌더링 */
const rendering = () => {
    gameRendering();
    uiRendering();
}

/** 게임 루프 (25프레임) */
setInterval( () => {
    if( !playerManager || !playerManager.myPlayer ) return;
    update();
    rendering();
},1000/25);


/** 이벤트 : 키보드 눌림 */
document.onkeydown = function( event ) {
    //console.log(event.keyCode);
    // 자바스크립트 키코드 표 : http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
           if( event.keyCode === 68 ) { // d
        network.keyState( 'right', true );
    } else if( event.keyCode === 83 ) { // s
        network.keyState( 'down' , true );
    } else if( event.keyCode === 65 ) { // a
        network.keyState( 'left' , true );
    } else if( event.keyCode === 87 ) { // w
        network.keyState( 'up'   , true );
    }
}

/** 이벤트 : 키보드 눌림해제 */
document.onkeyup = function( event ) {
           if( event.keyCode === 68 ) { // d
        network.keyState( 'right', false );
    } else if( event.keyCode === 83 ) { // s
        network.keyState( 'down' , false );
    } else if( event.keyCode === 65 ) { // a
        network.keyState( 'left' , false );
    } else if( event.keyCode === 87 ) { // w
        network.keyState( 'up'   , false );
    }
}

/** 이벤트 : 마우스 좌측버튼 눌림 */
document.onmousedown = function( event ) {
    if(event.which === 1 )
        network.keyState('attack',true);
    else
        network.keyState('specialAttack',true);
}

/** 이벤트 : 마우스 좌측버튼 눌림해제 */
document.onmouseup = function( event ) {
    if(event.which === 1 )
        network.keyState('attack',false);
    else
        network.keyState('specialAttack',false);
}

/** 이벤트 : 마우스 좌표 이동 */
document.onmousemove = function( event ) {
    let x = -250 + event.clientX - 8;
    let y = -250 + event.clientY - 8;
    let angle = Math.atan2(y,x) / Math.PI * 180; // atan2(y,x) : x축에 대한 좌표의 각도를 라디안값으로 얻는다. ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2 )
    network.keyState('attackAngle',angle);
}

/** 이벤트 : 마우스 우측버튼 클릭 */
document.oncontextmenu = ( mouse:any ) => {
    mouse.preventDefault(); // 컨텍스트 메뉴를 제거한다.
}

