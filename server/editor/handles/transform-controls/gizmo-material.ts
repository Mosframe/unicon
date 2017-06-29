// -----------------------------------------------------------------------------
// gizmo-material.ts
// -----------------------------------------------------------------------------
import * as THREE from 'three';

/**
 * GizmoMaterial
 *
 * @author arodic ( https://github.com/arodic )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class GizmoMaterial
 * @extends {THREE.MeshBasicMaterial}
 */
export class GizmoMaterial extends THREE.MeshBasicMaterial {

    // [ Public Functions ]

    highlight ( highlighted:boolean ) {
        if ( highlighted ) {
            this.color.setRGB( 1, 1, 0 );
            this.opacity = 1;
        } else {
            this.color.copy( this._oldColor );
            this.opacity = this._oldOpacity;
        }
    }

    // [ Constructor ]

    constructor(parameters?: THREE.MeshBasicMaterialParameters) {
        super(parameters);

		this.depthTest      = false;
		this.depthWrite     = false;
		this.side           = THREE.FrontSide;
		this.transparent    = true;
        if( parameters ) this.setValues( parameters );

		this._oldColor      = this.color.clone();
		this._oldOpacity    = this.opacity;
    }

    // [ Protected Veriables ]

    protected _oldColor    : THREE.Color;
    protected _oldOpacity  : number;

}

export let pickerMaterial = new GizmoMaterial( { visible: false, transparent: false } );
