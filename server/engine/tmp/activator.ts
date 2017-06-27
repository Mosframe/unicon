// -----------------------------------------------------------------------------
// activator.ts
// -----------------------------------------------------------------------------
/**
 * Activator
 *
 * @example {
 *
 * var activator = new Activator<Ubject>(window);
 *
 * var example = activator.createInstance('ClassA');
 *
 * }
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Activator
 * @template T
 */
export class Activator<T> {

    // [ Public Delegates ]

    // [ Public Static Variables ]

    // [ Public Variables ]

    // [ Constructors ]

    constructor( private context:Object ) {
    }

    // [ Public Static Functions ]

    // [ Public Functions ]

    createInstance( name:string, ...args: any[] ) : T {
        var instance = Object.create(this.context[name].prototype);
        instance.constructor.apply(instance, args);
        return <T> instance;
    }

    // [ Public Operators ]

    // [ Public Events ]

    // [ Public Messages ]

    // [ Protected Variables ]

    // [ Protected Static Variables ]

    // [ Protected Functions ]

    // [ Protected Static Functions ]
}



