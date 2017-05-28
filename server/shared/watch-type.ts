// -----------------------------------------------------------------------------
// watch-type : 감시형 타입 정의
// -----------------------------------------------------------------------------

//** 감시형 템플릿 */
export class watch<T> {
    private _value: T;
    private _changed: boolean;
    constructor(_value: T) {this.value = _value;}
    get changed(): boolean { return this._changed; }
    get value(): T { return this._value; }
    set value(_value: T) { if( this._value !== _value ) {this._value = _value; this._changed = true;} }
    get flush(): T { this._changed = false; return this._value; }
}


/** 감시형 boolean */
export type wboolean    = watch<boolean>;
/** 감시형 number */
export type wnumber     = watch<number>;
/** 감시형 string */
export type wstring     = watch<string>;

/** 감시형 boolean 생성 */
export const setWboolean   = (value:boolean) : wboolean    => {return new watch<boolean>(value); }
/** 감시형 number 생성 */
export const setWnumber    = (value:number ) : wnumber     => {return new watch<number >(value); }
/** 감시형 string 생성 */
export const setWstring    = (value:string ) : wstring     => {return new watch<string >(value); }
