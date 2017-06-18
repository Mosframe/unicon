// -----------------------------------------------------------------------------
// number.ts
// -----------------------------------------------------------------------------

export{}

declare global {
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
        format: () => string;
    }
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
}
Number.format = () : string => {
    return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
Number.prototype.format = function (){
    return Number.format();
};
