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
         * exist property
         *
         * @memberof ObjectConstructor
         */
        existProterty : ( object:Object, property:string ) => boolean;
    }
}

Object.existProterty = ( object:Object, property:string ) : boolean => {
    let names = Object.getOwnPropertyNames( object );
    for( let name of names ) {
        if( name === property ) {
            return true;
        }
    }
    return false;
};
