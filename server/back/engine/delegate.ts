// -----------------------------------------------------------------------------
// delegate.ts
// -----------------------------------------------------------------------------


export type Delegate = (...args: any[]) => any;

export const noop: Delegate = () => {};

export function delegate(...delegates: Delegate[]): Delegate {
    const callable = delegates.filter(f => f !== undefined && f !== null && f !== noop);
    if (callable.length === 0) {
        return noop;
    }

    return (...args: any[]) => callable.map(f => f(...args));
}

export type delegate0 = () => any;
export type delegate1 = (arg:any) => any;
