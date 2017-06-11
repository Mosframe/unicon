// -----------------------------------------------------------------------------
// mesh-filter.ts
// -----------------------------------------------------------------------------
import * as GL        from '../engine/graphic';
import {Component   } from '../engine/component';
import {GameObject  } from '../engine/game-object';
import {Material    } from '../engine/material';
import {Mesh        } from '../engine/mesh';

/**
 * A class to access the Mesh of the mesh filter.
 *
 * @author mosframe ( https://github.com/mosframe )
 *
 * @export
 * @class MeshFilter
 * @extends {Component}
 */
export class MeshFilter extends Component {

    // [ Public Variables ]

    /**
     * get GL.Mesh
     *
     * @readonly
     * @type {GL.Mesh}
     * @memberof MeshFilter
     */
    get core() : GL.Mesh { return <GL.Mesh>this.gameObject.core; }

    /**
     * Returns the instantiated Mesh assigned to the mesh filter.
     *
     * @type {Mesh}
     * @memberof MeshFilter
     */
    get mesh() : Mesh       { return <Mesh>Component.instantiate( this.sharedMesh ); }
    set mesh( value:Mesh )  {
        this.sharedMesh = value;
        if( value ) this.core.geometry = value.geometry.core;
    }
    /**
     * Returns the shared mesh of the mesh filter.
     *
     *
     * @memberof MeshFilter
     */
    get sharedMesh() : Mesh         { return this._sharedMesh; }
    set sharedMesh( value:Mesh )    {
        this._sharedMesh=value;
    }

    // [ Constructors ]

    /**
     * Creates an instance of MeshFilter.
     * @param {GameObject} gameObject
     *
     * @memberof MeshFilter
     */
    constructor( gameObject:GameObject ) {
        super(gameObject);

        this.gameObject.core = new GL.Mesh();
    }

    // [ Public Functions ]

    // [ Public Static Variables ]

    // [ Public Static Functions ]

    // [ Public Operators ]

    // [ Public Events ]

    // [ Protected Variables ]

    protected _sharedMesh : Mesh;


    // [ Protected Functions ]

    // [ Protected Static Variables ]

    // [ Protected Static Functions ]
}
