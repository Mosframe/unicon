// -----------------------------------------------------------------------------
// menubar.ts
// -----------------------------------------------------------------------------
import { Panel  as UIPanel  }   from '../editor/gui/panel';
import { FileMenu           }   from './menus/file-menu';
import { EditMenu           }   from './menus/edit-menu';

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
        //this.add( new Menubar.Add( editor ) );
        //this.add( new Menubar.Play( editor ) );
        //// this.add( new Menubar.View( editor ) );
        //this.add( new Menubar.Examples( editor ) );
        //this.add( new Menubar.Help( editor ) );
        //this.add( new Menubar.Status( editor ) );
    }
}