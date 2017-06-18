// -----------------------------------------------------------------------------
// gizmo-line-material.ts
// -----------------------------------------------------------------------------
import * as THREE from 'three';

/**
 * GizmoLineMaterial
 *
 * @author arodic ( https://github.com/arodic )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class GizmoLineMaterial
 * @extends {THREE.LineBasicMaterial}
 */
export class GizmoLineMaterial extends THREE.LineBasicMaterial {

    // [ Public Functions ]

    highlight ( highlighted:boolean ) {
        if ( highlighted ) {
            this.color.setRGB( 1, 1, 0 );
            this.opacity = 1;
        } else {
            this.color.copy( this._oldColor );
            this.opacity = this._oldOpacity;
        }
    };

    // [ Constructors ]

    /**
     * Creates an instance of GizmoLineMaterial.
     * @param {THREE.LineBasicMaterialParameters} [parameters]
     *
     * @memberof GizmoLineMaterial
     */
    constructor(parameters?: THREE.LineBasicMaterialParameters) {
        super(parameters);

		this.depthTest      = false;
		this.depthWrite     = false;
		this.transparent    = true;
		this.linewidth      = 1;
		if( parameters ) this.setValues( parameters );

		this._oldColor      = this.color.clone();
		this._oldOpacity    = this.opacity;
    }

    // [ Protected Veriables ]

    protected _oldColor    : THREE.Color;
    protected _oldOpacity  : number;
}

