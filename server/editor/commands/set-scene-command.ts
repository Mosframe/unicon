// -----------------------------------------------------------------------------
// set-scene-command.ts
// -----------------------------------------------------------------------------
import * as THREE             from 'three';
import {ICommand            } from '../interface';
import {IEditor             } from '../interface';
import {Command             } from '../command';
import {AddObjectCommand    } from './add-object-command';
import {SetValueCommand     } from './set-value-command';
import {SetUuidCommand      } from './set-uuid-command';

/**
 * SetSceneCommand
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer ( https://github.com/dforrer )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class SetSceneCommand
 * @extends {Command}
 */
export class SetSceneCommand extends Command {

    // [ public ]

    execute () {
		this._editor.signals.sceneGraphChanged.active = false;
		for ( let i = 0; i < this.cmdArray.length; i ++ ) {
			this.cmdArray[ i ].execute();
		}
		this._editor.signals.sceneGraphChanged.active = true;
		this._editor.signals.sceneGraphChanged.dispatch();
    }

    undo () {
		this._editor.signals.sceneGraphChanged.active = false;
		for ( let i = this.cmdArray.length - 1; i >= 0; i -- ) {
			this.cmdArray[ i ].undo();
		}
		this._editor.signals.sceneGraphChanged.active = true;
		this._editor.signals.sceneGraphChanged.dispatch();
    }

	update ( command:SetSceneCommand ) {
        super.update(command);
	}

    toJSON () : any {
        let output = super.toJSON();
		let cmds : any = [];
		for ( let i = 0; i < this.cmdArray.length; i ++ ) {
            cmds.push( this.cmdArray[ i ].toJSON() );
		}
		output.cmds = cmds;
        return output;
    }

	fromJSON ( json:any ) {
        super.fromJSON( json );
		let cmds = json.cmds;
		for ( let i = 0; i < cmds.length; i ++ ) {
			let cmd = new window[ cmds[ i ].type ]();	// creates a new object of type "json.type"
			cmd.fromJSON( cmds[ i ] );
			this.cmdArray.push( cmd );
		}
	}

    // [ Constructors ]

    constructor( object:THREE.Object3D, scene?:THREE.Scene ) {
        super();

        this.type   = 'SetSceneCommand';
        this.name   = 'Set Scene';

        if ( scene !== undefined ) {
            this.cmdArray.push( new SetUuidCommand( this._editor.scene, scene.uuid ) );
            this.cmdArray.push( new SetValueCommand( this._editor.scene, 'name', scene.name ) );
            this.cmdArray.push( new SetValueCommand( this._editor.scene, 'userData', JSON.parse( JSON.stringify( scene.userData ) ) ) );

            while ( scene.children.length > 0 ) {
                let child = scene.children.pop();
                if( child ) {
                    this.cmdArray.push( new AddObjectCommand( child ) );
                }
            }
        }
    }

    private cmdArray : ICommand[] = [];
}
