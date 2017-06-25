// -----------------------------------------------------------------------------
// menubar.ts
// -----------------------------------------------------------------------------
import {Panel as UIPanel    }   from '../editor/gui/panel';
import {Menubar_File        }   from './menubar.file';


/**
 * @author mrdoob / http://mrdoob.com/
 */

export class Menubar {

    container : UIPanel;

    constructor ( editor:any ) {
        this.container = new UIPanel();
        this.container.setId( 'menubar' );
        this.container.add( new Menubar_File( editor ).container );
        //this.container.add( new Menubar.Edit( editor ) );
        //this.container.add( new Menubar.Add( editor ) );
        //this.container.add( new Menubar.Play( editor ) );
        //// this.container.add( new Menubar.View( editor ) );
        //this.container.add( new Menubar.Examples( editor ) );
        //this.container.add( new Menubar.Help( editor ) );
        //this.container.add( new Menubar.Status( editor ) );
    }
}