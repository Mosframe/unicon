// -----------------------------------------------------------------------------
// 유틸리티
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// 2 박스가 충돌 테스트
// -----------------------------------------------------------------------------
exports.testCollisionRect2 = function( rect1, rect2 ) {
    return rect1.x <= rect2.x+rect2.width
        && rect2.x <= rect1.x+rect1.width
        && rect1.y <= rect2.y+rect2.height
        && rect2.y <= rect1.y+rect1.height;
}

// -----------------------------------------------------------------------------
// 현재 시간을 로그문자열로 출력 (yyyy-mm-dd hh-mm-ss)
// -----------------------------------------------------------------------------
exports.nowLogString = function() {
    var d = new Date();
    return d.toLogString();
}

Date.prototype.toLogString = function () {
    var yyyy = this.getFullYear().toString();
    var MM = pad(this.getMonth()+1,2);
    var dd = pad(this.getDate(), 2);
    var hh = pad(this.getHours(), 2);
    var mm = pad(this.getMinutes(), 2)
    var ss = pad(this.getSeconds(), 2)

    return yyyy + '-' + MM + '-' + dd + ' ' + hh + '-' + mm + '-' + ss;
};

// 10진수 숫자길이만큼 앞에 0을 입력한다.
pad = function(number, length) {
    var str = '' + number;
    while( str.length < length ) {
        str = '0' + str;
    }
    return str;
}