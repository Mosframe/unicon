// -----------------------------------------------------------------------------
// date.ts
// -----------------------------------------------------------------------------

export {}

declare global {
    /**
     * Date
     *
     * @author mosframe ( https://github.com/mosframe )
     * @export
     * @interface Date
     */
    export interface Date {
        /**
         * 일수(days)를 더하기
         *
         * @param {number} 일수(days)
         * @returns {Date}
         *
         * @memberOf Date
         */
        addDays(days: number): Date;
        /**
         * 오늘인지 확인
         *
         * @returns {boolean}
         *
         * @memberOf Date
         */
        isToday(): boolean;
        /**
         * 복제
         *
         * @returns {Date}
         *
         * @memberOf Date
         */
        clone(): Date;
        /**
         * 다른 달인지 확인
         *
         * @param {Date} date
         * @returns {boolean}
         *
         * @memberOf Date
         */
        isAnotherMonth(date: Date): boolean;
        /**
         * 주말(토,일)인지 확인
         *
         * @returns {boolean}
         *
         * @memberOf Date
         */
        isWeekend(): boolean;
        /**
         * 날짜가 같은지 비교
         *
         * @param {Date} date
         * @returns {boolean}
         *
         * @memberOf Date
         */
        isSameDate(date: Date): boolean;
        /**
         * 로그파일용 문자열 출력
         *
         * @returns {string}
         *
         * @memberOf Date
         */
        toLogString():string;
    }
}

Date.prototype.addDays = (days: number): Date => {
   if (!days) return this;
   console.log(this);
   let date = this;
   date.setDate(date.getDate() + days);
   return date;
};

Date.prototype.isToday = (): boolean => {
   let today = new Date();
   return this.isSameDate(today);
};

Date.prototype.clone = (): Date => {
   return new Date(+this);
};

Date.prototype.isAnotherMonth = (date: Date): boolean => {
   return date && this.getMonth() !== date.getMonth();
};

Date.prototype.isWeekend = (): boolean => {
   return this.getDay() === 0 || this.getDay() === 6;
};

Date.prototype.isSameDate = (date: Date): boolean => {
   return date && this.getFullYear() === date.getFullYear() && this.getMonth() === date.getMonth() && this.getDate() === date.getDate();
};


Date.prototype.toLogString = function () {
    let yyyy = this.getFullYear().toString();
    let MM = pad(this.getMonth()+1,2);
    let dd = pad(this.getDate(), 2);
    let hh = pad(this.getHours(), 2);
    let mm = pad(this.getMinutes(), 2)
    let ss = pad(this.getSeconds(), 2)

    return yyyy + '-' + MM + '-' + dd + ' ' + hh + '-' + mm + '-' + ss;
};

/** 10진수 숫자길이만큼 앞에 0을 입력한다. */
let pad = (num:any, length:number) => {
    let str = '' + num;
    while( str.length < length ) {
        str = '0' + str;
    }
    return str;
}
