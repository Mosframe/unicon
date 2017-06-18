// -----------------------------------------------------------------------------
// command.ts
// -----------------------------------------------------------------------------
import {Editor} from './editor';
import {Config} from './config';

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
    static editor : Editor;

    // [ Public Variables ]

	id          : number;
	inMemory    : boolean;
	updatable   : boolean;
	type        : string;
	name        : string;

    // [ Public Functions ]

    /**
     * command to json
     *
     * @returns {Command}
     *
     * @memberof Command
     */
    toJSON () : Command {
        let output  = new Command(this._editor);
        output.type = this.type;
        output.id   = this.id;
        output.name = this.name;
        return output;
    }
    /**
     * command from json
     *
     * @param {Command} json
     *
     * @memberof Command
     */
    fromJSON ( json:Command ) {
        this.inMemory   = true;
        this.type       = json.type;
        this.id         = json.id;
        this.name       = json.name;
    }


    // [ Constructors ]

    /**
     * Creates an instance of Command.
     * @param {Editor} editor
     *
     * @memberof Command
     */
    constructor( editor:Editor ) {
        this.id         = - 1;
        this.inMemory   = false;
        this.updatable  = false;
        this.type       = '';
        this.name       = '';

        if( editor !== undefined ) {
            Command.editor = editor;
        }
        this._editor = Command.editor;
    }

    // [ Protected Variables ]

	protected _editor : Editor;
}
