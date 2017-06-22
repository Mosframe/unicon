// -----------------------------------------------------------------------------
// command.ts
// -----------------------------------------------------------------------------
import {IEditor     } from './interface';
import {ICommand    } from './interface';
import {Config      } from './config';

/**
 * Command
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer ( https://github.com/dforrer )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Command
 * @implements {ICommand}
 */
export class Command implements ICommand {

    // [ Public Static Variables ]

    static editor   : IEditor;

    // [ Public Variables ]

	id              : number;
	type            : string;
	name            : string;
	inMemory        : boolean;
	updatable       : boolean;
    object          : THREE.Object3D;
    script          : object;
    attributeName   : string;
    json            : any;

    // [ Public Functions ]

    execute () {}

    undo    () {}

    toJSON  () : any {
        return {
            type             : this.type,
            id               : this.id,
            name             : this.name,
        }
    }

    fromJSON ( json:any ) {
        this.inMemory       = true;
        this.type           = json.type;
        this.id             = json.id;
        this.name           = json.name;
    }
    update ( cmd:ICommand ) {}

    // [ Constructors ]

    /**
     * Creates an instance of Command.
     * @param {IEditor} [editorRef] editorRef pointer to main editor object used to initialize each command object with a reference to the editor
     * @memberof Command
     */
    constructor( editorRef?:IEditor ) {
        this.id         = - 1;
        this.inMemory   = false;
        this.updatable  = false;
        this.type       = '';
        this.name       = '';

        if( editorRef !== undefined ) {
            Command.editor = editorRef;
        }
        this._editor = Command.editor;
    }

    // [ Protected Variables ]

	protected _editor : IEditor;
}
