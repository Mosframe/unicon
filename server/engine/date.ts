// -----------------------------------------------------------------------------
// date.ts
// -----------------------------------------------------------------------------
/**
 * add days
 *
 * @author mosframe / https://github.com/mosframe
 * @export
 * @param {Date} date
 * @param {number} days
 * @returns {Date}
 */
export function addDays ( date:Date, days:number ) : Date {
   if (!days) return date;
   let out = clone(date);
   out.setDate(out.getDate() + days);
   return out;
}
/**
 * is today
 *
 * @author mosframe / https://github.com/mosframe
 * @export
 * @param {Date} date
 * @returns {boolean}
 */
export function isToday ( date:Date ) : boolean {
   return isSameDate( date, new Date() );
}
/**
 * clone date
 *
 * @author mosframe / https://github.com/mosframe
 * @export
 * @param {Date} date
 * @returns {Date}
 */
export function clone ( date:Date ): Date {
   return new Date(+date);
}
/**
 * date is another month
 *
 * @author mosframe / https://github.com/mosframe
 * @export
 * @param {Date} date1
 * @param {Date} date2
 * @returns {boolean}
 */
export function isAnotherMonth ( date1:Date, date2:Date ) : boolean {
   return date1 && date2 && date1.getMonth() !== date2.getMonth();
}
/**
 * date is weekend
 *
 * @author mosframe / https://github.com/mosframe
 * @export
 * @param {Date} date
 * @returns {boolean}
 */
export function isWeekend ( date:Date ): boolean {
   return date && date.getDay() === 0 || date.getDay() === 6;
}
/**
 * date is same date
 *
 * @author mosframe / https://github.com/mosframe
 * @export
 * @param {Date} date1
 * @param {Date} date2
 * @returns {boolean}
 */
export function isSameDate ( date1:Date, date2:Date ): boolean {
   return date1 && date2 && date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}
/**
 * now to log
 *
 * @author mosframe / https://github.com/mosframe
 * @export
 * @returns {string}
 */
export function nowToLog () : string {

    let date = new Date();
    let yyyy = date.getFullYear().toString();
    let MM = pad(date.getMonth()+1,2);
    let dd = pad(date.getDate(), 2);
    let hh = pad(date.getHours(), 2);
    let mm = pad(date.getMinutes(), 2)
    let ss = pad(date.getSeconds(), 2)

    return yyyy + '-' + MM + '-' + dd + ' ' + hh + '-' + mm + '-' + ss;
}

/** 10진수 숫자길이만큼 앞에 0을 입력한다. */
let pad = (num:any, length:number) => {
    let str = '' + num;
    while( str.length < length ) {
        str = '0' + str;
    }
    return str;
};

