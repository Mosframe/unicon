// -----------------------------------------------------------------------------
// number.ts
// -----------------------------------------------------------------------------
/**
 * number to string
 *
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @param {number} number
 * @returns {string}
 */
export function toString( number:number ) : string {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
