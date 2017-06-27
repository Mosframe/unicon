// -----------------------------------------------------------------------------
// right-sidebar.ts
// -----------------------------------------------------------------------------
import { Panel           as UIPanel     }   from './gui/panel';
import { Button          as UIButton    }   from './gui/button';
import { Number          as UINumber    }   from './gui/number';
import { Div             as UIDiv       }   from './gui/div';
import { Span            as UISpan      }   from './gui/span';
import { Text            as UIText      }   from './gui/text';
import { Boolean         as UIBoolean   }   from './gui/boolean';
import { IEditor                        }   from './interface';
import { EditorWindow                   }   from './editor-window';
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

    attach ( window:EditorWindow ) {

        let title = window.getTitle();
        if( title in this._windows ) return;

        let headerName = title.charAt(0).toUpperCase() + title.slice(1);
        let header = new UIText( headerName ).setTitle(title);
        this._tabHeaders[ header.getTitle() ] = header;
        this._tabs.add( header );

        header.onClick( this._onTabClick );
        this._windows[ title ] = window;

        this.add( window );
    }

    detach ( window:EditorWindow ) {

        let title = window.getTitle();
        if( title in this._windows ) {

            let header = this._tabHeaders[ title ];
            header.releaseEvent('click');

            delete this._tabHeaders[ title ];
            delete this._windows[ title ];

            this._tabs.remove( window );
            this.remove( window );
        }
    }

    // [ Constructor ]

    constructor ( editor : IEditor ) {
        super();

        this.setId( 'sidebar' );

        // [ TAB ]
        this._tabs = new UIDiv();
        this._tabs.setId( 'tabs' );
        this.add( this._tabs );

        this.attach ( new HierarchyWindow( editor ) );
        this.attach ( new ProjectWindow  ( editor ) );
        this.attach ( new SettingWindow  ( editor ) );

        // default tab
        this._select( 'hierarchy' );
    }

    // [ Protected Members ]

    protected _tabs          : UIDiv;
    protected _tabHeaders   : {[title:string]:UIText} = {};
    protected _windows      : {[title:string]:UISpan} = {};

    protected _onTabClick = ( event:MouseEvent ) => {
        console.log( event.target );
        this._select( event.target['title'] );
    }

    protected _select ( title:string ) {

        // [ header ]
        for( let t in this._tabHeaders ) {
            this._tabHeaders[t].setClass( '' );
        }
        this._tabHeaders[title].setClass('selected');

        // [ window ]
        for( let w in this._windows ) {
            this._windows[w].setDisplay( 'none' );
        }
        this._windows[title].setDisplay( '' );
    }
}
