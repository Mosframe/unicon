// -----------------------------------------------------------------------------
// script.ts
// -----------------------------------------------------------------------------
import  *           as esprima      from 'esprima';
import  *           as THREE        from 'three';
import { Element    as UIElement}   from './gui/element';
import { Panel      as UIPanel  }   from './gui/panel';
import { Text       as UIText   }   from './gui/text';
import { IEditor                }   from './interface';
import { SetMaterialValueCommand}   from './commands/set-material-value-command';
import { SetScriptValueCommand  }   from './commands/set-script-value-command';

let jsonlint    = require( 'jsonlint' );
let CodeMirror  = window['CodeMirror'];//require( '../lib/codemirror/codemirror' );
let glslprep    = require( '../lib/glslprep/glslprep.min' );

/**
 * Script
 *
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class Script
 * @extends {UIPanel}
 */
export class Script extends UIPanel {

    // [ Constructors ]

    constructor( editor:IEditor ) {
        super();

        let signals = editor.signals;

        this.setId( 'script' );
        this.setPosition( 'absolute' );
        this.setBackgroundColor( '#272822' );
        this.setDisplay( 'none' );

        let header = new UIPanel();
        header.setPadding( '10px' );
        this.add( header );

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
        } )();

        let close = new UIElement( buttonSVG );
        close.setPosition( 'absolute' );
        close.setTop( '3px' );
        close.setRight( '1px' );
        close.setCursor( 'pointer' );
        close.onClick( () => {

            this.setDisplay( 'none' );

        } );
        header.add( close );


        let renderer;

        signals.rendererChanged.add( ( newRenderer ) => {

            renderer = newRenderer;

        } );


        let delay;
        let currentMode;
        let currentScript;
        let currentObject;

        let codemirror = CodeMirror( this.core, {
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

                let json = JSON.parse( value );

                if ( JSON.stringify( currentObject.material.defines ) !== JSON.stringify( json.defines ) ) {

                    let cmd = new SetMaterialValueCommand( currentObject, 'defines', json.defines );
                    cmd.updatable = false;
                    editor.execute( cmd );

                }
                if ( JSON.stringify( currentObject.material.uniforms ) !== JSON.stringify( json.uniforms ) ) {

                    let cmd = new SetMaterialValueCommand( currentObject, 'uniforms', json.uniforms );
                    cmd.updatable = false;
                    editor.execute( cmd );

                }
                if ( JSON.stringify( currentObject.material.attributes ) !== JSON.stringify( json.attributes ) ) {

                    let cmd = new SetMaterialValueCommand( currentObject, 'attributes', json.attributes );
                    cmd.updatable = false;
                    editor.execute( cmd );

                }

            }, 300 );

        });

        // prevent backspace from deleting objects
        let wrapper = codemirror.getWrapperElement();
        wrapper.addEventListener( 'keydown', ( event ) => {

            event.stopPropagation();

        } );

        // validate

        let errorLines  : any = [];
        let widgets     : any = [];

        let validate = ( string ) => {

            let valid  : any;
            let errors : any = [];

            return codemirror.operation( () => {

                while ( errorLines.length > 0 ) {

                    codemirror.removeLineClass( errorLines.shift(), 'background', 'errorLine' );

                }

                while ( widgets.length > 0 ) {

                    codemirror.removeLineWidget( widgets.shift() );

                }

                //

                switch ( currentMode ) {

                    case 'javascript':

                        try {

                            let syntax = esprima.parse( string, { tolerant: true } );
                            //errors = syntax.errors;

                        } catch ( error ) {

                            errors.push( {

                                lineNumber: error.lineNumber - 1,
                                message: error.message

                            } );

                        }

                        for ( let i = 0; i < errors.length; i ++ ) {

                            let error = errors[ i ];
                            error.message = error.message.replace(/Line [0-9]+: /, '');

                        }

                        break;

                    case 'json':

                        errors = [];

                        jsonlint.parseError = ( message, info ) => {

                            message = message.split('\n')[3];

                            errors.push( {

                                lineNumber: info.loc.first_line - 1,
                                message: message

                            } );

                        };

                        try {

                            jsonlint.parse( string );

                        } catch ( error ) {

                            // ignore failed error recovery

                        }

                        break;

                    case 'glsl':

                        try {

                            let shaderType = currentScript === 'vertexShader' ?
                                    glslprep.Shader.VERTEX : glslprep.Shader.FRAGMENT;

                            glslprep.parseGlsl( string, shaderType );

                        } catch( error ) {

                            if ( error instanceof glslprep.SyntaxError ) {

                                errors.push( {

                                    lineNumber: error.line,
                                    message: "Syntax Error: " + error.message

                                } );

                            } else {

                                console.error( error.stack || error );

                            }

                        }

                        if ( errors.length !== 0 ) break;
                        if ( renderer instanceof THREE.WebGLRenderer === false ) break;

                        currentObject.material[ currentScript ] = string;
                        currentObject.material.needsUpdate = true;
                        signals.materialChanged.dispatch( currentObject.material );

                        let programs = renderer.info.programs;

                        valid = true;
                        let parseMessage = /^(?:ERROR|WARNING): \d+:(\d+): (.*)/g;

                        for ( let i = 0, n = programs.length; i !== n; ++ i ) {

                            let diagnostics = programs[i].diagnostics;

                            if ( diagnostics === undefined ||
                                    diagnostics.material !== currentObject.material ) continue;

                            if ( ! diagnostics.runnable ) valid = false;

                            let shaderInfo = diagnostics[ currentScript ];
                            let lineOffset = shaderInfo.prefix.split(/\r\n|\r|\n/).length;

                            while ( true ) {

                                let parseResult : any = parseMessage.exec( shaderInfo.log );
                                if ( parseResult === null ) break;

                                errors.push( {

                                    lineNumber: parseResult[ 1 ] - lineOffset,
                                    message: parseResult[ 2 ]

                                } );

                            } // messages

                            break;

                        } // programs

                } // mode switch

                for ( let i = 0; i < errors.length; i ++ ) {

                    let error = errors[ i ];

                    let message = document.createElement( 'div' );
                    message.className = 'esprima-error';
                    message.textContent = error.message;

                    let lineNumber = Math.max( error.lineNumber, 0 );
                    errorLines.push( lineNumber );

                    codemirror.addLineClass( lineNumber, 'background', 'errorLine' );

                    let widget = codemirror.addLineWidget( lineNumber, message );

                    widgets.push( widget );

                }

                return valid !== undefined ? valid : errors.length === 0;

            });

        };

        // tern js autocomplete

        let server = new CodeMirror.TernServer( {
            caseInsensitive: true,
            plugins: { threejs: null }
        } );

        codemirror.setOption( 'extraKeys', {
            'Ctrl-Space': (cm) => { server.complete     (cm); },
            'Ctrl-I'    : (cm) => { server.showType     (cm); },
            'Ctrl-O'    : (cm) => { server.showDocs     (cm); },
            'Alt-.'     : (cm) => { server.jumpToDef    (cm); },
            'Alt-,'     : (cm) => { server.jumpBack     (cm); },
            'Ctrl-Q'    : (cm) => { server.rename       (cm); },
            'Ctrl-.'    : (cm) => { server.selectName   (cm); }
        } );

        codemirror.on( 'cursorActivity', ( cm ) => {

            if ( currentMode !== 'javascript' ) return;
            server.updateArgHints( cm );

        } );

        codemirror.on( 'keypress', ( cm, kb ) => {

            if ( currentMode !== 'javascript' ) return;
            let typed = String.fromCharCode( kb.which || kb.keyCode );
            if ( /[\w\.]/.exec( typed ) ) {

                server.complete( cm );

            }

        } );


        //

        signals.editorCleared.add( () => {

            this.setDisplay( 'none' );

        } );

        signals.editScript.add( ( object, script ) => {

            let mode, name, source;

            if ( typeof( script ) === 'object' ) {

                mode = 'javascript';
                name = script.name;
                source = script.source;
                title.setValue( object.name + ' / ' + name );

            } else {

                switch ( script ) {

                    case 'vertexShader':

                        mode = 'glsl';
                        name = 'Vertex Shader';
                        source = object.material.vertexShader || "";

                        break;

                    case 'fragmentShader':

                        mode = 'glsl';
                        name = 'Fragment Shader';
                        source = object.material.fragmentShader || "";

                        break;

                    case 'programInfo':

                        mode = 'json';
                        name = 'Program Properties';
                        let json = {
                            defines: object.material.defines,
                            uniforms: object.material.uniforms,
                            attributes: object.material.attributes
                        };
                        source = JSON.stringify( json, null, '\t' );

                }
                title.setValue( object.material.name + ' / ' + name );

            }

            currentMode = mode;
            currentScript = script;
            currentObject = object;

            this.setDisplay( '' );
            codemirror.setValue( source );
            codemirror.clearHistory();
            if ( mode === 'json' ) mode = { name: 'javascript', json: true };
            codemirror.setOption( 'mode', mode );

        } );

        signals.scriptRemoved.add( ( script ) => {

            if ( currentScript === script ) {

                this.setDisplay( 'none' );

            }

        } );
	}
}
