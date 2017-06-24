// -----------------------------------------------------------------------------
// number.ts
// -----------------------------------------------------------------------------

export{}

declare global {

    /**
     * Number
     *
     * @author mosframe ( https://github.com/mosframe )
     * @export
     * @interface Number
     */
    export interface Number {
        /**
         * number to string format
         *
         *
         * @memberof Number
         */
        format: () => string;
    }

    /**
     * NumberConstructor
     *
     * @author mosframe ( https://github.com/mosframe )
     * @export
     * @interface Number
     */
    export interface NumberConstructor {
        /**
         * number to string format
         *
         *
         * @memberof NumberConstructor
         */
        format: ( number:number ) => string;
    }
}

Number.prototype.format = () => {
    return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

Number.format = ( number:number ) : string => {
    return number.format();
};
