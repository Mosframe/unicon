/**
 * util.ts
 *
 * @author jonghwa lee
 */


/**
 * clone object
 *
 * @export
 * @param {*} obj
 * @returns
 */
export function clone( obj:any ) : any {
    let copy:any;

    //
    if( null == obj || "object" != typeof(obj)) return obj;

    // Date
    if( obj instanceof Date ) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Array
    if( obj instanceof Array ) {
        copy = [];
        for (let i=0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Object
    if( obj instanceof Object ) {
        copy = {};
        for( let attr in obj ) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to clone object! Its type isn't supported.");
}

