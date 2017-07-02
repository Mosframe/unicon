// -----------------------------------------------------------------------------
// properties.ts
// -----------------------------------------------------------------------------
import *            as THREE            from 'three';
import { Panel      as UIPanel      }   from '../gui/panel';
import { Button     as UIButton     }   from '../gui/button';
import { Number     as UINumber     }   from '../gui/number';
import { Div        as UIDiv        }   from '../gui/div';
import { Span       as UISpan       }   from '../gui/span';
import { Row        as UIRow        }   from '../gui/row';
import { Color      as UIColor      }   from '../gui/color';
import { Text       as UIText       }   from '../gui/text';
import { Break      as UIBreak      }   from '../gui/break';
import { Select     as UISelect     }   from '../gui/select';
import { Boolean    as UIBoolean    }   from '../gui/boolean';
import { Outliner   as UIOutliner   }   from '../gui/outliner';
import { IEditor                    }   from '../interface';
import { ObjectWindow               }   from '../windows/object';
import { GeometryWindow             }   from '../windows/geometry';
import { MaterialWindow             }   from '../windows/material';
import { TabPanel                   }   from './tab';


/**
 * properties panel
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class PropertiesPanel
 * @extends {TabPanel}
 */
export class PropertiesPanel extends TabPanel {

    // [ Constructor ]

    constructor ( editor:IEditor ) {
        super( 'properties', editor );

        this.setBorderTop( '0px' );
        this.setBorderBottom( '0px' );
        this.setPaddingLeft( '0px' );
        this.setPaddingTop( '0px' );

        this.attach ( new ObjectWindow( editor ) );
        this.attach ( new GeometryWindow( editor ) );
        this.attach ( new MaterialWindow( editor ) );

        this._select( 'object' );
    }
}
