// -----------------------------------------------------------------------------
// script.ts
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
import { Input      as UIInput      }   from '../gui/input';
import { AddScriptCommand           }   from '../commands/add-script-command';
import { SetScriptValueCommand      }   from '../commands/set-script-value-command';
import { RemoveScriptCommand        }   from '../commands/remove-script-command';
import { IEditor                    }   from '../interface';
import { EditorPanel                }   from './editor';


/**
 * script panel
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class ScriptPanel
 * @extends {EditorPanel}
 */
export class ScriptPanel extends EditorPanel {

    // [ Constructor ]

    constructor ( editor:IEditor ) {
        super( 'script' );

        this.setBorderTop( '0' );
        this.setPaddingTop( '20px' );
        this.setPaddingRight( '0px' );

        let signals = editor.signals;

        this.setDisplay( 'none' );

        this.add( new UIText( 'Script' ).setTextTransform( 'uppercase' ) );
        this.add( new UIBreak() );
        this.add( new UIBreak() );

        //

        let scriptsContainer = new UIRow();
        this.add( scriptsContainer );

        let newScript = new UIButton( 'New' );
        newScript.onClick( () => {

            if( editor.selected ) {
                let script = { name: '', source: 'function update( event ) {}' };
                editor.execute( new AddScriptCommand( editor.selected, script ) );
            }

        } );
        this.add( newScript );

        /*
        let loadScript = new UIButton( 'Load' );
        loadScript.setMarginLeft( '4px' );
        this.add( loadScript );
        */

        //

        function update() {

            scriptsContainer.clear();
            scriptsContainer.setDisplay( 'none' );

            let object = editor.selected;

            if ( object === null ) {

                return;

            }

            let scripts = editor.scripts[ object.uuid ];

            if ( scripts !== undefined ) {

                scriptsContainer.setDisplay( 'block' );

                for ( let i = 0; i < scripts.length; i ++ ) {

                    ( function ( object, script ) {

                        let name = new UIInput( script.name ).setWidth( '130px' ).setFontSize( '12px' );
                        name.onChange( function () {

                            if( editor.selected ) {
                                editor.execute( new SetScriptValueCommand( editor.selected, script, 'name', this.getValue() ) );
                            }

                        } );
                        scriptsContainer.add( name );

                        let edit = new UIButton( 'Edit' );
                        edit.setMarginLeft( '4px' );
                        edit.onClick( function () {

                            signals.editScript.dispatch( object, script );

                        } );
                        scriptsContainer.add( edit );

                        let remove = new UIButton( 'Remove' );
                        remove.setMarginLeft( '4px' );
                        remove.onClick( function () {

                            if ( confirm( 'Are you sure?' ) ) {

                                if( editor.selected ) {
                                    editor.execute( new RemoveScriptCommand( editor.selected, script ) );
                                }

                            }

                        } );
                        scriptsContainer.add( remove );

                        scriptsContainer.add( new UIBreak() );

                    } )( object, scripts[ i ] )

                }

            }

        }

        // signals

        signals.objectSelected.add( ( object ) => {

            if ( object !== null && editor.camera !== object ) {

                this.setDisplay( 'block' );

                update();

            } else {

                this.setDisplay( 'none' );

            }

        } );

        signals.scriptAdded.add( update );
        signals.scriptRemoved.add( update );
        signals.scriptChanged.add( update );
    }
}
