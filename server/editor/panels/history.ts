// -----------------------------------------------------------------------------
// history.ts
// -----------------------------------------------------------------------------
import *            as THREE            from 'three';
import { System                     }   from '../../engine/system';
import { Panel      as UIPanel      }   from '../../editor/gui/panel';
import { Button     as UIButton     }   from '../../editor/gui/button';
import { Number     as UINumber     }   from '../../editor/gui/number';
import { Div        as UIDiv        }   from '../../editor/gui/div';
import { Span       as UISpan       }   from '../../editor/gui/span';
import { Row        as UIRow        }   from '../../editor/gui/row';
import { Color      as UIColor      }   from '../../editor/gui/color';
import { Text       as UIText       }   from '../../editor/gui/text';
import { Break      as UIBreak      }   from '../../editor/gui/break';
import { Select     as UISelect     }   from '../../editor/gui/select';
import { Boolean    as UIBoolean    }   from '../../editor/gui/boolean';
import { Outliner   as UIOutliner   }   from '../../editor/gui/outliner';
import { Checkbox   as UICheckbox   }   from '../../editor/gui/checkbox';
import { IEditor                    }   from '../interface';
import { EditorPanel                }   from '../editor-panel';


/**
 * history panel
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class HistoryPanel
 * @extends {EditorPanel}
 */
export class HistoryPanel extends EditorPanel {

    constructor( editor:IEditor ) {
        super( 'history' );

        let signals = editor.signals;
        let config  = editor.config;
        let history = editor.history;

        this.add( new UIText( 'HISTORY' ) );

        //

        let persistent = new UIBoolean( config.getKey( 'settings/history' ), 'persistent' );
        persistent.setPosition( 'absolute' ).setRight( '8px' );
        persistent.onChange( function () {

            let value = this.getValue();

            config.setKey( 'settings/history', value );

            if ( value ) {

                alert( 'The history will be preserved across sessions.\nThis can have an impact on performance when working with textures.' );

                let lastUndoCmd = history.undos[ history.undos.length - 1 ];
                let lastUndoId = ( lastUndoCmd !== undefined ) ? lastUndoCmd.id : 0;
                editor.history.enableSerialization( lastUndoId );

            } else {

                signals.historyChanged.dispatch();

            }

        } );
        this.add( persistent );

        this.add( new UIBreak(), new UIBreak() );

        let ignoreObjectSelectedSignal = false;

        let outliner = new UIOutliner( editor );
        outliner.onChange( function () {

            ignoreObjectSelectedSignal = true;

            editor.history.goToState( parseInt( outliner.getValue() ) );

            ignoreObjectSelectedSignal = false;

        } );
        this.add( outliner );

        //

        let refreshUI = function () {

            let options : any = [];
            let enumerator = 1;

            function buildOption( object ) {

                let option = document.createElement( 'div' );
                option['value'] = object.id;

                return option;

            }

            ( function addObjects( objects ) {

                for ( let i = 0, l = objects.length; i < l; i ++ ) {

                    let object = objects[ i ];

                    let option = buildOption( object );
                    option.innerHTML = '&nbsp;' + object.name;

                    options.push( option );

                }

            } )( history.undos );


            ( function addObjects( objects, pad ) {

                for ( let i = objects.length - 1; i >= 0; i -- ) {

                    let object = objects[ i ];

                    let option = buildOption( object );
                    option.innerHTML = '&nbsp;' + object.name;
                    option.style.opacity = '0.3';

                    options.push( option );
                }

            } )( history.redos, '&nbsp;' );

            outliner.setOptions( options );

        };

        refreshUI();

        // events

        signals.editorCleared.add( refreshUI );

        signals.historyChanged.add( refreshUI );
        signals.historyChanged.add( function ( cmd ) {

            outliner.setValue( cmd !== undefined ? cmd.id : null );

        } );
    }
}