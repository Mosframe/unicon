// -----------------------------------------------------------------------------
// command.ts
// -----------------------------------------------------------------------------
import {Config} from './config';


/**
 * ICommand
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer ( https://github.com/dforrer )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @interface ICommand
 */
export interface ICommand {
	type            : string;
	id              : number;
	name            : string;
    object          : object;
    script          : string;
    attributeName   : string;
}

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
    static editor : any;

    // [ Public Variables ]

	type            : string;
	id              : number;
	name            : string;
    object          : any;
    script          : any;
    attributeName   : string;

	inMemory        : boolean;
	updatable       : boolean;
    json            : ICommand;

    // [ Public Functions ]

    /**
     * command to json
     *
     * @returns {ICommand}
     *
     * @memberof Command
     */
    toJSON () : ICommand {
        return {
            type             : this.type,
            id               : this.id,
            name             : this.name,
            object           : this.object,
            script           : this.script,
            attributeName    : this.attributeName
        }
    }
    /**
     * command from json
     *
     * @param {ICommand} json
     *
     * @memberof Command
     */
    fromJSON ( json:ICommand ) {
        this.inMemory       = true;
        this.type           = json.type;
        this.id             = json.id;
        this.name           = json.name;
        this.object         = json.object;
        this.script         = json.script;
        this.attributeName  = json.attributeName;
    }

    execute () {

    }

    update ( cmd:Command ) {

    }

    undo() {

    }


    // [ Constructors ]

    /**
     * Creates an instance of Command.
     * @param {Editor} editor
     *
     * @memberof Command
     */
    constructor( editor:any ) {
        this.id         = - 1;
        this.inMemory   = false;
        this.updatable  = false;
        this.type       = '';
        this.name       = '';
        this.object     = null;
        this.script     = null;

        if( editor !== undefined ) {
            Command.editor = editor;
        }
        this._editor = Command.editor;
    }

    // [ Protected Variables ]

	protected _editor : any;
}
