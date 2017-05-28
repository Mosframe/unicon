// -----------------------------------------------------------------------------
// default-type : 기본 타입 정의
// -----------------------------------------------------------------------------

/** boolean */
export type wboolean    = boolean;
/** number */
export type wnumber     = number;
/** string */
export type wstring     = string;

/** boolean 리턴 */
export const setWboolean   = (value:boolean) : wboolean    => {return value; }
/** number 리턴 */
export const setWnumber    = (value:number ) : wnumber     => {return value; }
/** string 리턴 */
export const setWstring    = (value:string ) : wstring     => {return value; }
