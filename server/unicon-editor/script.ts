// -----------------------------------------------------------------------------
// script.ts
// -----------------------------------------------------------------------------
import {Element as UIElement    } from '../editor/gui/element';
import {Panel   as UIPanel      } from '../editor/gui/panel';
import {Text    as UIText       } from '../editor/gui/text';

/**
 * Script
 *
 *
 * @author mrdoob ( http://mrdoob.com/ )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Config
 */
export class Script {

    // [ Constructors ]

    constructor( editor:any ) {

        this.signals = editor.signals;

        this.container = new UIPanel();
        this.container.setId( 'script' );
        this.container.setPosition( 'absolute' );
        this.container.setBackgroundColor( '#272822' );
        this.container.setDisplay( 'none' );

        let header = new UIPanel();
        header.setPadding( '10px' );
        this.container.add( header );

        let title = new UIText().setColor( '#fff' );
        header.add( title );

        let buttonSVG = ( () => {
            let svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
            svg.setAttribute( 'width', '32' );
            svg.setAttribute( 'height', '32' );
            let path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );
            path.setAttribute( 'd', 'M 12,12 L 22,22 M 22,12 12,22' );
            path.setAttribute( 'stroke', '#fff' );
            svg.appendChild( path );
            return svg;
        })();
        let close = new UIElement( buttonSVG );
        close.setPosition( 'absolute' );
        close.setTop( '3px' );
        close.setRight( '1px' );
        close.setCursor( 'pointer' );
        close.onClick( () => {
            this.container.setDisplay( 'none' );
        });
        header.add( close );

        let renderer;
        this.signals.rendererChanged.add( ( newRenderer ) => {
            renderer = newRenderer;
        });

        let delay;
        let currentMode;
        let currentScript;
        let currentObject;

        let codemirror = CodeMirror( container.dom, {
            value: '',
            lineNumbers: true,
            matchBrackets: true,
            indentWithTabs: true,
            tabSize: 4,
            indentUnit: 4,
            hintOptions: {
                completeSingle: false
            }
        } );
        codemirror.setOption( 'theme', 'monokai' );
        codemirror.on( 'change', () => {

            if ( codemirror.state.focused === false ) return;

            clearTimeout( delay );
            delay = setTimeout( () => {

                let value = codemirror.getValue();

                if ( ! validate( value ) ) return;

                if ( typeof( currentScript ) === 'object' ) {

                    if ( value !== currentScript.source ) {

                        editor.execute( new SetScriptValueCommand( currentObject, currentScript, 'source', value ) );

                    }
                    return;
                }

                if ( currentScript !== 'programInfo' ) return;

                var json = JSON.parse( value );

                if ( JSON.stringify( currentObject.material.defines ) !== JSON.stringify( json.defines ) ) {

                    var cmd = new SetMaterialValueCommand( currentObject, 'defines', json.defines );
                    cmd.updatable = false;
                    editor.execute( cmd );

                }
                if ( JSON.stringify( currentObject.material.uniforms ) !== JSON.stringify( json.uniforms ) ) {

                    var cmd = new SetMaterialValueCommand( currentObject, 'uniforms', json.uniforms );
                    cmd.updatable = false;
                    editor.execute( cmd );

                }
                if ( JSON.stringify( currentObject.material.attributes ) !== JSON.stringify( json.attributes ) ) {

                    var cmd = new SetMaterialValueCommand( currentObject, 'attributes', json.attributes );
                    cmd.updatable = false;
                    editor.execute( cmd );

                }

            }, 300 );

        });

    }

    // [ Protected Variables ]

    signals     : any;
    container   : UIPanel;

}
