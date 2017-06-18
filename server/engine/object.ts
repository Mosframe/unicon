// -----------------------------------------------------------------------------
// number.ts
// -----------------------------------------------------------------------------

export{}

declare global {
    /**
     * Object
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
    export interface Object {
        /**
         * object has propery?
         *
         *
         * @memberof Object
         */
        hasProterty : ( object:object, propertyName:string ) => boolean;
        /**
         * object has function?
         *
         *
         * @memberof Object
         */
        hasFunction : ( object:object, functionName:string ) => boolean;
    }
}

Object.hasProterty = ( object:object, propertyName:string ) : boolean => {
    for( let name in object ) {
        if( name === propertyName ) {
            return true;
        }
    }
    return false;
};
Object.hasFunction = ( object:object, functionName:string ) : boolean => {
    for( let name in object ) {
        if( name === functionName ) {
            if( typeof object[name] == 'function' ) {
                return true;
            }
        }
    }
    return false;
};

Object.prototype.hasProterty = ( object:object, propertyName:string ) : boolean => {
    return Object.hasProterty( object, propertyName );
};
Object.prototype.hasFunction = ( object:object, functionName:string ) : boolean => {
    return Object.hasFunction( object, functionName );
};
