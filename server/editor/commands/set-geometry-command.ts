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

    // [ Public Variables ]

    object      : THREE.Line|THREE.Mesh|THREE.Points|THREE.Sprite;
    oldGeometry : THREE.Geometry | THREE.BufferGeometry;
    newGeometry : THREE.Geometry | THREE.BufferGeometry;

    // [ Public Functions ]

    /**
     * execute
     *
     * @memberof SetGeometryCommand
     */
    execute () {
		this.object.geometry.dispose();
		this.object.geometry = this.newGeometry;
		this.object.geometry.computeBoundingSphere();

		this._editor.signals.geometryChanged.dispatch( this.object );
		this._editor.signals.sceneGraphChanged.dispatch();
    }
    /**
     * undo
     *
     * @memberof SetGeometryCommand
     */
    undo () {
		this.object.geometry.dispose();
		this.object.geometry = this.oldGeometry;
		this.object.geometry.computeBoundingSphere();

		this._editor.signals.geometryChanged.dispatch( this.object );
		this._editor.signals.sceneGraphChanged.dispatch();
    }
    /**
     * update
     *
     * @param {SetGeometryCommand} cmd
     * @memberof SetGeometryCommand
     */
    update ( cmd:SetGeometryCommand ) {
		this.newGeometry = cmd.newGeometry;
    }
    /**
     * to JSON
     *
     * @returns {*}
     * @memberof SetGeometryCommand
     */
    toJSON () : any {
        let output          = super.toJSON();
		output.objectUuid   = this.object.uuid;
		output.oldGeometry  = this.object.geometry.toJSON();
		output.newGeometry  = this.newGeometry.toJSON();
        return output;
    }
    /**
     * from JSON
     *
     * @param {*} json
     * @memberof SetGeometryCommand
     */
	fromJSON ( json:any ) {
        super.fromJSON( json );

		this.object         = <THREE.Mesh>this._editor.objectByUuid( json.objectUuid );
		this.oldGeometry    = this._parseGeometry( json.oldGeometry );
		this.newGeometry    = this._parseGeometry( json.newGeometry );
	}
    // [ Constructors ]

    /**
     * Creates an instance of SetGeometryCommand.
     * @param {THREE.Line|THREE.Mesh|THREE.Points|THREE.Sprite} object
     * @param {(THREE.Geometry|THREE.BufferGeometry)} newGeometry
     * @memberof SetGeometryCommand
     */
    constructor( object:THREE.Line|THREE.Mesh|THREE.Points|THREE.Sprite, newGeometry:THREE.Geometry|THREE.BufferGeometry ) {
        super();
        this.type           = 'SetGeometryCommand';
        this.name           = 'Set Geometry';
        this.updatable      = true;
        this.object         = object;
        this.oldGeometry    = ( object !== undefined ) ? object.geometry : undefined;
        this.newGeometry    = newGeometry;
    }

    // [ Protected Functions ]

    protected _parseGeometry ( data:THREE.Geometry ) : any {
        let loader = new THREE.ObjectLoader();
        return loader.parseGeometries( [ data ] )[ data.uuid ];
    }

}
