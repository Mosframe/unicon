// -----------------------------------------------------------------------------
// file-menu.ts
// -----------------------------------------------------------------------------
import *                as THREE                from 'three'                                ;
import { Panel          as UIPanel          }   from '../../editor/gui/panel'               ;
import { Row            as UIRow            }   from '../../editor/gui/row'                 ;
import { Button         as UIButton         }   from '../../editor/gui/button'              ;
import { Number         as UINumber         }   from '../../editor/gui/number'              ;
import { Text           as UIText           }   from '../../editor/gui/text'                ;
import { Boolean        as UIBoolean        }   from '../../editor/gui/boolean'             ;
import { HorizontalRule as UIHorizontalRule }   from '../../editor/gui/horizontal-rule'     ;
import { OBJExporter                        }   from '../../editor/exporters/obj-exporter'  ;
import { STLExporter                        }   from '../../editor/exporters/stl-exporter'  ;
import { IEditor                            }   from '../interface';
import { EditorPanel                        }   from '../editor-panel';


let JSZip = require('../../lib/three.js/examples/js/libs/jszip.min');

let NUMBER_PRECISION = 6;

/**
 * file menu
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class FileMenu
 * @extends {EditorPanel}
 */
export class FileMenu extends EditorPanel {

	parseNumber( key, value ) {
		return typeof value === 'number' ? parseFloat( value.toFixed( NUMBER_PRECISION ) ) : value;
	}

    constructor( editor:IEditor ) {
        super('file');

        this.setClass( 'menu' );

        let title = new UIPanel();
        title.setClass( 'title' );
        title.setTextContent( 'File' );
        this.add( title );

        let options = new UIPanel();
        options.setClass( 'options' );
        this.add( options );

        // [ New ]

        let option = new UIRow();
        option.setClass( 'option' );
        option.setTextContent( 'New' );
        option.onClick( () => {
            if ( confirm( 'Any unsaved data will be lost. Are you sure?' ) ) {
                editor.clear();
            }
        });
        options.add( option );

        options.add( new UIHorizontalRule() );

        // [ Import ]

        let fileInput = document.createElement( 'input' );
        fileInput.type = 'file';
        fileInput.addEventListener( 'change', ( event ) => {

            if( fileInput.files ) editor.loader.loadFile( fileInput.files[ 0 ] );
        } );

        option = new UIRow();
        option.setClass( 'option' );
        option.setTextContent( 'Import' );
        option.onClick( () => {

            fileInput.click();

        } );
        options.add( option );

        //

        options.add( new UIHorizontalRule() );

        // Export Geometry

        option = new UIRow();
        option.setClass( 'option' );
        option.setTextContent( 'Export Geometry' );
        option.onClick( () => {

            let object = editor.selected;

            if ( object === null ) {
                alert( 'No object selected.' );
                return;
            }

            if( ! (object instanceof THREE.Mesh) ) {
                alert( 'No mesh selected.' );
                return;
            }

            let geometry = object.geometry;

            if ( geometry === undefined ) {

                alert( 'The selected object doesn\'t have geometry.' );
                return;

            }

            let output = geometry.toJSON();

            try {

                output = JSON.stringify( output, this.parseNumber, '\t' );
                output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );

            } catch ( e ) {

                output = JSON.stringify( output );

            }

            saveString( output, 'geometry.json' );

        } );
        options.add( option );

        // Export Object

        option = new UIRow();
        option.setClass( 'option' );
        option.setTextContent( 'Export Object' );
        option.onClick( () => {

            let object = editor.selected;

            if ( object === null ) {

                alert( 'No object selected' );
                return;

            }

            let output = object.toJSON();

            try {

                output = JSON.stringify( output, this.parseNumber, '\t' );
                output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );

            } catch ( e ) {

                output = JSON.stringify( output );

            }

            saveString( output, 'model.json' );

        } );
        options.add( option );

        // Export Scene

        option = new UIRow();
        option.setClass( 'option' );
        option.setTextContent( 'Export Scene' );
        option.onClick( () => {

            let output = editor.scene.toJSON();

            try {

                output = JSON.stringify( output, this.parseNumber, '\t' );
                output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );

            } catch ( e ) {

                output = JSON.stringify( output );

            }

            saveString( output, 'scene.json' );

        } );
        options.add( option );

        // Export OBJ

        option = new UIRow();
        option.setClass( 'option' );
        option.setTextContent( 'Export OBJ' );
        option.onClick( () => {

            let object = editor.selected;

            if ( object === null ) {

                alert( 'No object selected.' );
                return;

            }

            let exporter = new OBJExporter();

            saveString( exporter.parse( object ), 'model.obj' );

        } );
        options.add( option );

        // Export STL

        option = new UIRow();
        option.setClass( 'option' );
        option.setTextContent( 'Export STL' );
        option.onClick( () => {

            let exporter = new STLExporter();

            saveString( exporter.parse( editor.scene ), 'model.stl' );

        } );
        options.add( option );

        //

        options.add( new UIHorizontalRule() );

        // Publish

        option = new UIRow();
        option.setClass( 'option' );
        option.setTextContent( 'Publish' );
        option.onClick( ()=> {

            let zip = new JSZip();

            //

            let output = editor.toJSON();
            output.metadata.type = 'App';
            delete output.history;

            let vr = output.project.vr;

            output = JSON.stringify( output, this.parseNumber, '\t' );
            output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );

            zip.file( 'app.json', output );

            //

            let manager = new THREE.LoadingManager( () => {

                save( zip.generate( { type: 'blob' } ), 'download.zip' );

            } );

            let loader = new THREE.FileLoader( manager );
            loader.load( 'js/libs/app/index.html', ( content ) => {

                let includes:any = [];

                if ( vr ) {

                    includes.push( '<script src="js/VRControls.js"></script>' );
                    includes.push( '<script src="js/VREffect.js"></script>' );
                    includes.push( '<script src="js/WebVR.js"></script>' );

                }

                content = content.replace( '<!-- includes -->', includes.join( '\n\t\t' ) );

                zip.file( 'index.html', content );

            } );
            loader.load( 'js/libs/app.js', ( content ) => {

                zip.file( 'js/app.js', content );

            } );
            loader.load( '../build/three.min.js', ( content ) => {

                zip.file( 'js/three.min.js', content );

            } );

            if ( vr ) {

                loader.load( '../examples/js/controls/VRControls.js', ( content ) => {

                    zip.file( 'js/VRControls.js', content );

                } );

                loader.load( '../examples/js/effects/VREffect.js', ( content ) => {

                    zip.file( 'js/VREffect.js', content );

                } );

                loader.load( '../examples/js/WebVR.js', ( content ) => {

                    zip.file( 'js/WebVR.js', content );

                } );

            }

        } );
        options.add( option );

        /*
        // Publish (Dropbox)

        let option = new UI.Row();
        option.setClass( 'option' );
        option.setTextContent( 'Publish (Dropbox)' );
        option.onClick( function () {

            let parameters = {
                files: [
                    { 'url': 'data:text/plain;base64,' + window.btoa( "Hello, World" ), 'filename': 'app/test.txt' }
                ]
            };

            Dropbox.save( parameters );

        } );
        options.add( option );
        */


        //

        let link = document.createElement( 'a' );
        link.style.display = 'none';
        document.body.appendChild( link ); // Firefox workaround, see #6594

        function save( blob, filename ) {

            link.href = URL.createObjectURL( blob );
            link.download = filename || 'data.json';
            link.click();

            // URL.revokeObjectURL( url ); breaks Firefox...

        }

        function saveString( text, filename ) {

            save( new Blob( [ text ], { type: 'text/plain' } ), filename );

        }
    }
}
