// -----------------------------------------------------------------------------
// object.ts
// -----------------------------------------------------------------------------
/**
 * object has property
 *
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @param {object} object
 * @param {string} propertyName
 * @returns {boolean}
 */
export function hasProperty ( object:object, propertyName:string ) : boolean {
    if( !object ) return false;
    for( let name in object ) {
        if( name === propertyName ) {
            return true;
        }
    }
    return false;
}
/**
 * object has function
 * '
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @param {object} object
 * @param {string} functionName
 * @returns {boolean}
 */
export function hasFunction ( object:object, functionName:string ) : boolean {
    if( !object ) return false;
    for( let name in object ) {
        if( name === functionName ) {
            if( typeof object[name] == 'function' ) {
                return true;
            }
        }
    }
    return false;
}
