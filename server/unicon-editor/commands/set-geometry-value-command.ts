// -----------------------------------------------------------------------------
// set-geometry-value-command.ts
// -----------------------------------------------------------------------------
import * as THREE     from 'three';
import {            } from '../../engine/object';
import {ICommand    } from '../interface';
import {IEditor     } from '../interface';
import {Command     } from '../command';

/**
 * SetGeometryValueCommand
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer ( https://github.com/dforrer )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class SetGeometryValueCommand
 * @extends {Command}
 */
export class SetGeometryValueCommand extends Command {

    // [ Public Variables ]

    object      : THREE.Mesh;
    oldValue    : THREE.Geometry;
    newValue    : THREE.Geometry;

    // [ Public Functions ]

    /**
     * execute
     *
     * @memberof SetGeometryValueCommand
     */
    execute () {
		this.object.geometry[ this.attributeName ] = this.newValue;
		this._editor.signals.objectChanged.dispatch( this.object );
		this._editor.signals.geometryChanged.dispatch();
		this._editor.signals.sceneGraphChanged.dispatch();
    }
    /**
     * undo
     *
     * @memberof SetGeometryValueCommand
     */
    undo () {
		this.object.geometry[ this.attributeName ] = this.oldValue;
		this._editor.signals.objectChanged.dispatch( this.object );
		this._editor.signals.geometryChanged.dispatch();
		this._editor.signals.sceneGraphChanged.dispatch();
    }
    /**
     * to JSON
     *
     * @returns {*}
     * @memberof SetGeometryValueCommand
     */
    toJSON () : any {
        let output          = super.toJSON();
		output.objectUuid   = this.object.uuid;
		output.attributeName= this.attributeName;
		output.oldValue     = this.oldValue;
		output.newValue     = this.newValue;
        return output;
    }
    /**
     * from JSON
     *
     * @param {*} json
     * @memberof SetGeometryValueCommand
     */
	fromJSON ( json:any ) {
        super.fromJSON( json );
		this.object         = <THREE.Mesh>this._editor.objectByUuid( json.objectUuid );
		this.attributeName  = json.attributeName;
		this.oldValue       = json.oldValue;
		this.newValue       = json.newValue;
	}

    // [ Constructors ]

    /**
     * Creates an instance of SetGeometryValueCommand.
     * @param {THREE.Mesh} object
     * @param {string} attributeName
     * @param {THREE.Geometry} newValue
     * @memberof SetGeometryValueCommand
     */
    constructor( object:THREE.Mesh, attributeName:string, newValue:THREE.Geometry ) {
        super();

        this.type = 'SetGeometryValueCommand';
        this.name = 'Set Geometry.' + attributeName;

        this.object = object;
        this.attributeName = attributeName;
        this.oldValue = ( object !== undefined ) ? object.geometry[ attributeName ] : undefined;
        this.newValue = newValue;
    }
}
