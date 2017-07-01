// -----------------------------------------------------------------------------
// tab.ts
// -----------------------------------------------------------------------------
import { Panel           as UIPanel     }   from '../gui/panel';
import { Button          as UIButton    }   from '../gui/button';
import { Number          as UINumber    }   from '../gui/number';
import { Div             as UIDiv       }   from '../gui/div';
import { Span            as UISpan      }   from '../gui/span';
import { Text            as UIText      }   from '../gui/text';
import { Boolean         as UIBoolean   }   from '../gui/boolean';
import { IEditor                        }   from '../interface';
import { EditorWindow                   }   from '../windows/editor';


/**
 * tab panel
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class TabPanel
 * @extends {UIPanel}
 */
export class TabPanel extends UIPanel {

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

    constructor ( id:string, editor : IEditor ) {
        super();

        this.setId( id );

        // [ TAB ]
        this._tabs = new UIDiv();
        this._tabs.setId( 'tabs' );
        this.add( this._tabs );
    }

    // [ Protected Members ]

    protected _tabs          : UIDiv;
    protected _tabHeaders   : {[title:string]:UIText} = {};
    protected _windows      : {[title:string]:UISpan} = {};

    protected _onTabClick = ( event:MouseEvent ) => {
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
