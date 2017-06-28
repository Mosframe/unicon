// -----------------------------------------------------------------------------
// edit.ts
// -----------------------------------------------------------------------------
import *                as THREE                from 'three'                                    ;
import { Panel          as UIPanel          }   from '../../editor/gui/panel'                   ;
import { Row            as UIRow            }   from '../../editor/gui/row'                     ;
import { Button         as UIButton         }   from '../../editor/gui/button'                  ;
import { Number         as UINumber         }   from '../../editor/gui/number'                  ;
import { Text           as UIText           }   from '../../editor/gui/text'                    ;
import { Boolean        as UIBoolean        }   from '../../editor/gui/boolean'                 ;
import { HorizontalRule as UIHorizontalRule }   from '../../editor/gui/horizontal-rule'         ;
import { IEditor                            }   from '../interface'                             ;
import { AddObjectCommand                   }   from '../commands/add-object-command'           ;
import { RemoveObjectCommand                }   from '../commands/remove-object-command'        ;
import { SetMaterialValueCommand            }   from '../commands/set-material-value-command'   ;
import { MultiCmdsCommand                   }   from '../commands/multi-cmds-command'           ;
import { Menu                               }   from './menu'                                   ;


let glslprep = require('../../lib/glslprep/glslprep.min');

/**
 * edit menu
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class EditMenu
 * @extends {Menu}
 */
export class EditMenu extends Menu {

    constructor( editor:IEditor ) {
        super('edit');

        let title = new UIPanel();
        title.setClass( 'title' );
        title.setTextContent( 'Edit' );
        this.add( title );

        let options = new UIPanel();
        options.setClass( 'options' );
        this.add( options );

        // [ Undo ]

        let undo = new UIRow();
        undo.setClass( 'option' );
        undo.setTextContent( 'Undo (Ctrl+Z)' );
        undo.onClick( () => { editor.undo(); });
        options.add( undo );

        // [ Redo ]

        let redo = new UIRow();
        redo.setClass( 'option' );
        redo.setTextContent( 'Redo (Ctrl+Shift+Z)' );
        redo.onClick( () => { editor.redo(); });
        options.add( redo );

        // [ Clear History ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'Clear History' );
            option.onClick( () => {
                if ( confirm( 'The Undo/Redo History will be cleared. Are you sure?' ) ) {
                    editor.history.clear();
                }
            });
            options.add( option );

            editor.signals.historyChanged.add( () => {

                let history = editor.history;

                undo.setClass( 'option' );
                redo.setClass( 'option' );

                if ( history.undos.length == 0 ) {
                    undo.setClass( 'inactive' );
                }

                if ( history.redos.length == 0 ) {
                    redo.setClass( 'inactive' );
                }
            });

            options.add( new UIHorizontalRule() );
        }

        // [ Clone ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'Clone' );
            option.onClick( () => {
                let object = editor.selected;
                if( object ) {
                    if ( object.parent === null ) return; // avoid cloning the camera or scene
                    object = object.clone();
                    editor.execute( new AddObjectCommand( object ) );
                }
            });
            options.add( option );
        }

        // [ Delete ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'Delete (Del)' );
            option.onClick( () => {
                let object = editor.selected;
                if( object ) {
                    if ( confirm( 'Delete ' + object.name + '?' ) === false ) return;
                    let parent = object.parent;
                    if ( parent === undefined ) return; // avoid deleting the camera or scene
                    editor.execute( new RemoveObjectCommand( object ) );
                }
            });
            options.add( option );
        }

        // [ Minify shaders ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'Minify Shaders' );
            option.onClick( () => {

                let root                = editor.selected || editor.scene;
                let errors  : any       = [];
                let path    : any       = [];
                let cmds    : any       = [];
                let nMaterialsChanged   = 0;

                function getPath ( object ) {

                    path.length = 0;

                    let parent = object.parent;
                    if ( parent !== undefined ) getPath( parent );

                    path.push( object.name || object.uuid );

                    return path;
                }

                root.traverse( ( object:any ) => {

                    let material = object.material;

                    if ( material instanceof THREE.ShaderMaterial ) {

                        try {
                            let shader = glslprep.minifyGlsl( [ material.vertexShader, material.fragmentShader ] );

                            cmds.push( new SetMaterialValueCommand( object, 'vertexShader', shader[ 0 ] ) );
                            cmds.push( new SetMaterialValueCommand( object, 'fragmentShader', shader[ 1 ] ) );

                            ++nMaterialsChanged;

                        } catch ( e ) {

                            let path = getPath( object ).join( "/" );

                            if ( e instanceof glslprep.SyntaxError )
                                errors.push( path + ":" + e.line + ":" + e.column + ": " + e.message );
                            else {
                                errors.push( path + ": Unexpected error (see console for details)." );
                                console.error( e.stack || e );
                            }
                        }
                    }
                });

                if ( nMaterialsChanged > 0 ) {
                    editor.execute( new MultiCmdsCommand( cmds ), 'Minify Shaders' );
                }

                window.alert( nMaterialsChanged + " material(s) were changed.\n" + errors.join( "\n" ) );
            });
            options.add( option );
        }
    }
}
