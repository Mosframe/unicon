// -----------------------------------------------------------------------------
// number.ts
// -----------------------------------------------------------------------------

export{}

declare global {

    /**
     * Object
     *
     * @export
     * @interface Object
     */
    export interface Object {
        /**
         * object has propery?
         *
         *
         * @memberof Object
         */
        hasProterty : ( propertyName:string ) => boolean;
        /**
         * object has function?
         *
         *
         * @memberof Object
         */
        hasFunction : ( functionName:string ) => boolean;
    }

    /**
     * ObjectConstructor
     *
     * @author mosframe ( https://github.com/mosframe )
     * @export
     * @interface Object
     */
    export interface ObjectConstructor {
        /**
         * object has propery?
         *
         *
         * @memberof ObjectConstructor
         */
        hasProterty : ( object:object, propertyName:string ) => boolean;
        /**
         * object has function?
         *
         *
         * @memberof ObjectConstructor
         */
        hasFunction : ( object:object, functionName:string ) => boolean;
    }
}

Object.prototype.hasProterty = ( propertyName:string ) : boolean => {
    for( let name in this ) {
        if( name === propertyName ) {
            return true;
        }
    }
    return false;
};

Object.prototype.hasFunction = ( functionName:string ) : boolean => {
    for( let name in this ) {
        if( name === functionName ) {
            if( typeof this[name] == 'function' ) {
                return true;
            }
        }
    }
    return false;
};

Object.hasProterty = ( object:object, propertyName:string ) : boolean => {
    return object.hasProterty( propertyName );
};

Object.hasFunction = ( object:object, functionName:string ) : boolean => {
    return object.hasProterty( functionName );
};

