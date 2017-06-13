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

    // [ Public Delegates ]

    // [ Public Static Variables ]
	static editor : Editor;

    // [ Public Variables ]
	id          : number;
	inMemory    : boolean;
	updatable   : boolean;
	type        : string;
	name        : string;

    // [ Constructors ]

    /**
     * Creates an instance of Command.
     * @param {Editor} editorRef
     *
     * @memberof Command
     */
    constructor( editorRef:Editor ) {
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

    // [ Public Static Functions ]

    static create( editorRef:Editor ) : Command {
        return new Command( editorRef );
    }

    // [ Public Functions ]

    // [ Public Operators ]

    // [ Public Events ]

    // [ Public Messages ]

    // [ Protected Variables ]
	protected _editor : Editor;

    // [ Protected Static Variables ]

    // [ Protected Functions ]

    // [ Protected Static Functions ]
}
