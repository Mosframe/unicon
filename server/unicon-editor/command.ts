// -----------------------------------------------------------------------------
// command.ts
// -----------------------------------------------------------------------------
import {IEditor     } from './interface';
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
 */
export class Command {

    // [ Public Static Variables ]
    static editor : IEditor;

    // [ Public Variables ]

	id              : number;
	type            : string;
	name            : string;
	inMemory        : boolean;
	updatable       : boolean;

    // [ Public Functions ]

    /**
     * execute
     *
     * @memberof Command
     */
    execute () {}
    /**
     * undo
     *
     * @memberof Command
     */
    undo () {}
    /**
     * command to json
     *
     * @returns {*}
     *
     * @memberof Command
     */
    toJSON () : any {
        return {
            type             : this.type,
            id               : this.id,
            name             : this.name,
        }
    }
    /**
     * command from json
     *
     * @param {*} json
     *
     * @memberof Command
     */
    fromJSON ( json:any ) {
        this.inMemory       = true;
        this.type           = json.type;
        this.id             = json.id;
        this.name           = json.name;
    }

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
