// -----------------------------------------------------------------------------
// set-geometry-command.ts
// -----------------------------------------------------------------------------
import * as THREE     from 'three';
import {ICommand    } from '../interface';
import {IEditor     } from '../interface';
import {Command     } from '../command';

/**
 * SetGeometryCommand
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer / https://github.com/dforrer
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class SetGeometryCommand
 * @extends {Command}
 */
export class SetGeometryCommand extends Command {

    // [ Public ]

    object : any;

    execute () {
		this.object.geometry.dispose();
		this.object.geometry = this._newGeometry;
		this.object.geometry.computeBoundingSphere();
		this._editor.signals.geometryChanged.dispatch( this.object );
		this._editor.signals.sceneGraphChanged.dispatch();
    }

    undo () {
		this.object.geometry.dispose();
		this.object.geometry = this._oldGeometry;
		this.object.geometry.computeBoundingSphere();
		this._editor.signals.geometryChanged.dispatch( this.object );
		this._editor.signals.sceneGraphChanged.dispatch();
    }

    update ( cmd:SetGeometryCommand ) {
		this._newGeometry = cmd._newGeometry;
    }

    toJSON () : any {
        let output          = super.toJSON();
		output.objectUuid   = this.object.uuid;
		output.oldGeometry  = this.object.geometry.toJSON();
		output.newGeometry  = this._newGeometry.toJSON();
        return output;
    }

	fromJSON ( json:any ) {
        super.fromJSON( json );
		this.object         = this._editor.objectByUuid( json.objectUuid );
		this._oldGeometry   = this._parseGeometry( json.oldGeometry );
		this._newGeometry   = this._parseGeometry( json.newGeometry );
	}

    // [ Constructor ]

    constructor( object:any, newGeometry:THREE.Geometry|THREE.BufferGeometry ) {
        super();
        this.type           = 'SetGeometryCommand';
        this.name           = 'Set Geometry';
        this.updatable      = true;
        this.object         = object;
        this._oldGeometry   = ( object !== undefined ) ? object.geometry : undefined;
        this._newGeometry   = newGeometry;
    }

    // [ private ]

    private _oldGeometry : THREE.Geometry | THREE.BufferGeometry;
    private _newGeometry : THREE.Geometry | THREE.BufferGeometry;

    private _parseGeometry ( data:THREE.Geometry ) : any {
        let loader = new THREE.ObjectLoader();
        return loader.parseGeometries( [ data ] )[ data.uuid ];
    }

}
