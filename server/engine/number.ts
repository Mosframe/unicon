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
    export interface NumberConstructor {
        format: () => string;
    }
}
Number.format = () => {
    return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
