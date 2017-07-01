// -----------------------------------------------------------------------------
// right-sidebar.3.ts
// -----------------------------------------------------------------------------
import { Panel           as UIPanel     }   from './gui/panel';
import { Button          as UIButton    }   from './gui/button';
import { Number          as UINumber    }   from './gui/number';
import { Div             as UIDiv       }   from './gui/div';
import { Span            as UISpan      }   from './gui/span';
import { Text            as UIText      }   from './gui/text';
import { Boolean         as UIBoolean   }   from './gui/boolean';
import { IEditor                        }   from './interface';
import { TabPanel                       }   from './panels/tab';
import { HierarchyWindow                }   from './windows/hierarchy';
import { ProjectWindow                  }   from './windows/project';
import { SettingsWindow                 }   from './windows/settings';


/**
 * right sidebar 3
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class Sidebar
 * @extends {TabPanel}
 */
export class RightSidebar3 extends TabPanel {


    // [ Constructor ]

    constructor ( editor : IEditor ) {
        super('sidebar-3',editor);

        // [ TAB ]
        this.attach ( new HierarchyWindow( editor ) );
        this.attach ( new ProjectWindow  ( editor ) );
        this.attach ( new SettingsWindow ( editor ) );

        // default tab
        this._select( 'hierarchy' );
    }

}
