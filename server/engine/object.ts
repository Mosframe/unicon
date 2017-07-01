// -----------------------------------------------------------------------------
// object.ts
// -----------------------------------------------------------------------------
/**
 * object has property
 *
 * @author mosframe / https://github.com/mosframe
 * @export
 * @param {object} object
 * @param {string} propertyName
 * @returns {boolean}
 */
export function hasProperty ( object:object, propertyName:string ) : boolean {
    if( !object ) return false;
    return propertyName in object;
    //return Reflect.defineProperty( object, propertyName, {} );
}
