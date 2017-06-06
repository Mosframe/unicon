// -----------------------------------------------------------------------------
// type.ts
// -----------------------------------------------------------------------------

/**
 * IType
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @interface IType
 * @template T
 */
export interface IType<T> {
    new():T;
}
