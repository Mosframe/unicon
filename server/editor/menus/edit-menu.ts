// -----------------------------------------------------------------------------
// edit-menu.ts
// -----------------------------------------------------------------------------
import *                as THREE                from 'three'                                    ;
import { Panel          as UIPanel          }   from '../../editor/gui/panel'                   ;
import { Row            as UIRow            }   from '../../editor/gui/row'                     ;
import { Button         as UIButton         }   from '../../editor/gui/button'                  ;
import { Number         as UINumber         }   from '../../editor/gui/number'                  ;
import { Text           as UIText           }   from '../../editor/gui/text'                    ;
import { Boolean        as UIBoolean        }   from '../../editor/gui/boolean'                 ;
import { HorizontalRule as UIHorizontalRule }   from '../../editor/gui/horizontal-rule'         ;
import { OBJExporter                        }   from '../../editor/exporters/obj-exporter'      ;
import { STLExporter                        }   from '../../editor/exporters/stl-exporter'      ;
import { IEditor                            }   from '../interface'                             ;
import { EditorPanel                        }   from '../editor-panel'                          ;
import { AddObjectCommand                   }   from '../commands/add-object-command'           ;
import { RemoveObjectCommand                }   from '../commands/remove-object-command'        ;
import { SetMaterialValueCommand            }   from '../commands/set-material-value-command'   ;
import { MultiCmdsCommand                   }   from '../commands/multi-cmds-command'           ;


let glslprep = require('../../lib/glslprep/glslprep.min');

/**
 * edit menu
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class EditMenu
 * @extends {EditorPanel}
 */
export class EditMenu extends EditorPanel {

    constructor( editor:IEditor ) {
        super('edit');

        this.setClass( 'menu' );

        var title = new UIPanel();
        title.setClass( 'title' );
        title.setTextContent( 'Edit' );
        this.add( title );

        var options = new UIPanel();
        options.setClass( 'options' );
        this.add( options );

        // Undo

        var undo = new UIRow();
        undo.setClass( 'option' );
        undo.setTextContent( 'Undo (Ctrl+Z)' );
        undo.onClick( function () {

            editor.undo();

        } );
        options.add( undo );

        // Redo

        var redo = new UIRow();
        redo.setClass( 'option' );
        redo.setTextContent( 'Redo (Ctrl+Shift+Z)' );
        redo.onClick( function () {

            editor.redo();

        } );
        options.add( redo );

        // Clear History

        var option = new UIRow();
        option.setClass( 'option' );
        option.setTextContent( 'Clear History' );
        option.onClick( function () {

            if ( confirm( 'The Undo/Redo History will be cleared. Are you sure?' ) ) {

                editor.history.clear();

            }

        } );
        options.add( option );


        editor.signals.historyChanged.add( function () {

            var history = editor.history;

            undo.setClass( 'option' );
            redo.setClass( 'option' );

            if ( history.undos.length == 0 ) {

                undo.setClass( 'inactive' );

            }

            if ( history.redos.length == 0 ) {

                redo.setClass( 'inactive' );

            }

        } );

        // ---

        options.add( new UIHorizontalRule() );

        // Clone

        var option = new UIRow();
        option.setClass( 'option' );
        option.setTextContent( 'Clone' );
        option.onClick( function () {

            var object = editor.selected;
            if( object ) {
                if ( object.parent === null ) return; // avoid cloning the camera or scene

                object = object.clone();

                editor.execute( new AddObjectCommand( object ) );
            }
        } );
        options.add( option );

        // Delete

        var option = new UIRow();
        option.setClass( 'option' );
        option.setTextContent( 'Delete (Del)' );
        option.onClick( function () {

            var object = editor.selected;
            if( object ) {

                if ( confirm( 'Delete ' + object.name + '?' ) === false ) return;

                var parent = object.parent;
                if ( parent === undefined ) return; // avoid deleting the camera or scene

                editor.execute( new RemoveObjectCommand( object ) );
            }

        } );
        options.add( option );

        // Minify shaders

        var option = new UIRow();
        option.setClass( 'option' );
        option.setTextContent( 'Minify Shaders' );
        option.onClick( function() {

            var root = editor.selected || editor.scene;

            var errors : any = [];
            var nMaterialsChanged = 0;
            var path : any = [];

            function getPath ( object ) {

                path.length = 0;

                var parent = object.parent;
                if ( parent !== undefined ) getPath( parent );

                path.push( object.name || object.uuid );

                return path;

            }

            var cmds : any = [];
            root.traverse( function ( object:any ) {

                var material = object.material;

                if ( material instanceof THREE.ShaderMaterial ) {

                    try {

                        var shader = glslprep.minifyGlsl( [
                                material.vertexShader, material.fragmentShader ] );

                        cmds.push( new SetMaterialValueCommand( object, 'vertexShader', shader[ 0 ] ) );
                        cmds.push( new SetMaterialValueCommand( object, 'fragmentShader', shader[ 1 ] ) );

                        ++nMaterialsChanged;

                    } catch ( e ) {

                        var path = getPath( object ).join( "/" );

                        if ( e instanceof glslprep.SyntaxError )

                            errors.push( path + ":" + e.line + ":" + e.column + ": " + e.message );
                        else {
                            errors.push( path + ": Unexpected error (see console for details)." );
                            console.error( e.stack || e );
                        }

                    }

                }

            } );

            if ( nMaterialsChanged > 0 ) {

                editor.execute( new MultiCmdsCommand( cmds ), 'Minify Shaders' );

            }

            window.alert( nMaterialsChanged +
                    " material(s) were changed.\n" + errors.join( "\n" ) );

        } );
        options.add( option );
    }
}
