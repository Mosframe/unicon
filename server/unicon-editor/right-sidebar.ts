// -----------------------------------------------------------------------------
// right-sidebar.ts
// -----------------------------------------------------------------------------
import { Panel           as UIPanel     }   from '../editor/gui/panel';
import { Button          as UIButton    }   from '../editor/gui/button';
import { Number          as UINumber    }   from '../editor/gui/number';
import { Div             as UIDiv       }   from '../editor/gui/div';
import { Span            as UISpan      }   from '../editor/gui/span';
import { Text            as UIText      }   from '../editor/gui/text';
import { Boolean         as UIBoolean   }   from '../editor/gui/boolean';
import { IEditor                        }   from './interface';
import { HierarchyWindow                }   from './windows/hierarchy-window';
import { ProjectWindow                  }   from './windows/project-window';
import { SettingWindow                  }   from './windows/setting-window';


/**
 * right sidebar
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class Sidebar
 * @extends {UIPanel}
 */
export class RightSidebar extends UIPanel {

    attach ( window:UISpan ) {
        window.releaseEvent('click');
        window.onClick( this._onTabClick );
        this._windows[window.getName()] = window;
        this._tab.add( window );
    }

    // [ Constructor ]

    constructor ( editor : IEditor ) {
        super();

        this.setId( 'sidebar' );

        // [ TAB ]
        this._tabHeaders.hierarchy  = new UIText( 'Hierarchy'   ).setName('HierarchyWindow').onClick( this._onTabClick );
        this._tabHeaders.project    = new UIText( 'Project'     ).setName('ProjectWindow').onClick( this._onTabClick );
        this._tabHeaders.setting    = new UIText( 'Setting'     ).setName('SettingWindow').onClick( this._onTabClick );

        this._tab = new UIDiv();
        this._tab.setId( 'tab' );
        for( let i in this._tabHeaders ) {
            this._tab.add( this._tabHeaders[i] );
        }
        this.add( this._tab );

        // [ Hierarchy ]
        this._windows.hierarchy = new HierarchyWindow( editor );
        this.add( this._windows.hierarchy );

        // [ Project ]
        this._windows.project = new ProjectWindow( editor )
        this.add( this._windows.project );

        // [ Setting ]
        this._windows.setting = new SettingWindow( editor )
        this.add( this._windows.setting );

        // default tab
        this._select( 'Hierarchy' );
    }

    // [ Protected Members ]

    protected _tab          : UIDiv;
    protected _tabHeaders   : {[name:string]:UIText} = {};
    protected _windows      : {[name:string]:UISpan} = {};

    protected _onTabClick = ( event:MouseEvent ) => {
        this._select( event.target['textContent'] );
    }

    protected _select ( section:string ) {

        let s = section.toLocaleLowerCase();

        for( let i in this._tabHeaders ) {
            this._tabHeaders[i].setClass( '' );
        }

        for( let w in this._windows ) {
            this._windows[w].setDisplay( 'none' );
        }

        this._tabHeaders[s].setClass('selected');
        this._windows[s].setDisplay( '' );
    }
}
