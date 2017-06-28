// -----------------------------------------------------------------------------
// menubar.ts
// -----------------------------------------------------------------------------
import { Panel  as UIPanel  }   from '../editor/gui/panel';
import { FileMenu           }   from './menus/file';
import { EditMenu           }   from './menus/edit';
import { AddMenu            }   from './menus/add';
import { PlayMenu           }   from './menus/play';
import { ExamplesMenu       }   from './menus/examples';
import { HelpMenu           }   from './menus/help';
import { StatusMenu         }   from './menus/status';

/**
 * menubar
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class Menubar
 * @extends {UIPanel}
 */
export class Menubar extends UIPanel {

    constructor ( editor:any ) {
        super();

        this.setId( 'menubar' );

        this.add( new FileMenu( editor ) );
        this.add( new EditMenu( editor ) );
        this.add( new AddMenu( editor ) );
        this.add( new PlayMenu( editor ) );
        // this.add( new Menubar.View( editor ) );
        this.add( new ExamplesMenu( editor ) );
        this.add( new HelpMenu( editor ) );
        this.add( new StatusMenu( editor ) );
    }
}