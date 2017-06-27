// -----------------------------------------------------------------------------
// script.ts
// -----------------------------------------------------------------------------
import *        as esprima        from 'esprima';
//import *        as CodeMirror     from 'codemirror';
import *        as THREE          from 'three';
import {                        } from '../engine/object';
import {Element as UIElement    } from '../editor/gui/element';
import {Panel   as UIPanel      } from '../editor/gui/panel';
import {Text    as UIText       } from '../editor/gui/text';
import {IEditor                 } from './interface';
import {SetMaterialValueCommand } from './commands/set-material-value-command';
import {SetScriptValueCommand   } from './commands/set-script-value-command';

//let jsonlint    = require( 'jsonlint' );
let jsonlint    = require( '../lib/jsonlint/jsonlint' );
let CodeMirror  = require( '../lib/codemirror/codemirror' );
//let CodeMirrorJs    = require( '../lib/codemirror/mode/javascript' );
//let CodeMirrorGlsl  = require( '../lib/codemirror/mode/glsl' );

let glslprep    = require( '../lib/glslprep/glslprep.min' );

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

    // [ Public Variables ]

    public  container     : UIPanel;

    // [ Constructors ]

    constructor( editor:IEditor ) {

        this.editor     = editor;
        this.signals    = editor.signals;
        this.container  = new UIPanel();
        this.container.setId( 'script' );
        this.container.setPosition( 'absolute' );
        this.container.setBackgroundColor( '#272822' );
        this.container.setDisplay( 'none' );

        let header = new UIPanel();
        header.setPadding( '10px' );
        this.container.add( header );

        this.title = new UIText().setColor( '#fff' );
        header.add( this.title );

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

        let core : any = this.container.core;
        this.codemirror = CodeMirror( core, {
            value: '',
            lineNumbers: true,
            //matchBrackets: true,
            indentWithTabs: true,
            tabSize: 4,
            indentUnit: 4,
            //hintOptions: {
            //    completeSingle: false
            //}
        });
        this.codemirror.setOption( 'theme', 'monokai' );
        this.codemirror.on( 'change', () => {


        });
        // prevent backspace from deleting objects
        let wrapper = this.codemirror.getWrapperElement();
        wrapper.addEventListener( 'keydown', this.onkeydown );

        // tern js autocomplete
        let server = new CodeMirror.TernServer( {
            caseInsensitive: true,
            plugins: { threejs: null }
        });
        this.codemirror.setOption( 'extraKeys', {
            'Ctrl-Space': function(cm) { server.complete(cm); },
            'Ctrl-I': function(cm) { server.showType(cm); },
            'Ctrl-O': function(cm) { server.showDocs(cm); },
            'Alt-.': function(cm) { server.jumpToDef(cm); },
            'Alt-,': function(cm) { server.jumpBack(cm); },
            'Ctrl-Q': function(cm) { server.rename(cm); },
            'Ctrl-.': function(cm) { server.selectName(cm); }
        } );

        this.codemirror.on( 'cursorActivity', ( cm:any ) => {
            if ( this.currentMode !== 'javascript' ) return;
            server.updateArgHints( cm );
        });

        this.codemirror.on( 'keypress', ( cm:any, kb:any ) => {

            if ( this.currentMode !== 'javascript' ) return;
            let typed = String.fromCharCode( kb.which || kb.keyCode );
            if ( /[\w\.]/.exec( typed ) ) {
                server.complete( cm );
            }
        });

        this.signals.editorCleared.add( ()=> {
            this.container.setDisplay( 'none' );

        } );

        this.signals.editScript.add( ( object:any, script:any ) => {

            let mode, name, source;
            if ( typeof( script ) === 'object' ) {

                mode = 'javascript';
                name = script.name;
                source = script.source;
                this.title.value = object.name + ' / ' + name;

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
                        var json = {
                            defines: object.material.defines,
                            uniforms: object.material.uniforms,
                            attributes: object.material.attributes
                        };
                        source = JSON.stringify( json, null, '\t' );

                }
                this.title.value = object.material.name + ' / ' + name;

            }

            this.currentMode = mode;
            this.currentScript = script;
            this.currentObject = object;

            this.container.setDisplay( '' );
            this.codemirror.setValue( source );
            this.codemirror.clearHistory();
            if ( mode === 'json' ) mode = { name: 'javascript', json: true };
            this.codemirror.setOption( 'mode', mode );
        } );

        this.signals.scriptRemoved.add( ( script:any ) => {

            if ( this.currentScript === script ) {
                this.container.setDisplay( 'none' );
            }
        });
   }

    // [ Protected Variables ]

    protected editor        : IEditor;
    protected title         : UIText;
    protected signals       : any;
    protected codemirror    : any;//CodeMirror.Editor;
    protected currentObject : any;
    protected currentScript : any;
    protected currentMode   : any;
    protected errorLines    : any[] = [];
    protected widgets       : any[] = [];
    protected delay         : NodeJS.Timer;

    // [ Protected Events ]

    protected onkeydown ( event:KeyboardEvent ) {
        event.stopPropagation();
    }

    protected onChange () {
        if ( this.codemirror.state.focused === false ) return;

        clearTimeout( this.delay );
        this.delay = setTimeout( () => {

            let value = this.codemirror.getValue();

            if ( ! this.validate( value ) ) return;

            if ( typeof( this.currentScript ) === 'object' ) {
                if ( this.currentScript.hasProterty( 'source') && value !== this.currentScript['source'] ) {
                    this.editor.execute( new SetScriptValueCommand( this.currentObject, this.currentScript, 'source', value ) );
                }
                return;
            }

            if ( this.currentScript !== 'programInfo' ) return;

            let json = JSON.parse( value );

            if ( JSON.stringify( this.currentObject.material.defines ) !== JSON.stringify( json.defines ) ) {

                let cmd = new SetMaterialValueCommand( this.currentObject, 'defines', json.defines );
                cmd.updatable = false;
                this.editor.execute( cmd );
            }
            if ( JSON.stringify( this.currentObject.mateiral.uniforms ) !== JSON.stringify( json.uniforms ) ) {

                let cmd = new SetMaterialValueCommand( this.currentObject, 'uniforms', json.uniforms );
                cmd.updatable = false;
                this.editor.execute( cmd );
            }
            if ( JSON.stringify( this.currentObject.material.attributes ) !== JSON.stringify( json.attributes ) ) {

                let cmd = new SetMaterialValueCommand( this.currentObject, 'attributes', json.attributes );
                cmd.updatable = false;
                this.editor.execute( cmd );
            }
        }, 300 );
    }

	protected validate ( string:string ) : boolean {

		let valid;
		let errors : any[] = [];

		return this.codemirror.operation( function () {

			while ( this.errorLines.length > 0 ) {
				this.codemirror.removeLineClass( this.errorLines.shift(), 'background', 'errorLine' );
			}

			while ( this.widgets.length > 0 ) {
				this.codemirror.removeLineWidget( this.widgets.shift() );
			}

			//
			switch ( this.currentMode ) {

				case 'javascript':
					try {
						let syntax = esprima.parse( string, { tolerant: true } );
					} catch ( error ) {
						errors.push( {
							lineNumber: error.lineNumber - 1,
							message: error.message
						});
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
						});
					};

					try {
						jsonlint.parse( string );
					} catch ( error ) {
						// ignore failed error recovery
					}

					break;

				case 'glsl':

					try {
						let shaderType = this.currentScript === 'vertexShader' ? glslprep.Shader.VERTEX : glslprep.Shader.FRAGMENT;
						glslprep.parseGlsl( string, shaderType );

					} catch( error ) {

						if ( error instanceof glslprep.SyntaxError ) {
							errors.push( {
								lineNumber: error.line,
								message: "Syntax Error: " + error.message
							});
						} else {
							console.error( error.stack || error );
						}
					}

					if ( errors.length !== 0 ) break;
					if ( this.renderer instanceof THREE.WebGLRenderer === false ) break;

					this.currentObject.material[ this.currentScript ] = string;
					this.currentObject.material.needsUpdate = true;
					this.signals.materialChanged.dispatch( this.currentObject.material );

					let programs = this.renderer.info.programs;

					valid = true;
					let parseMessage = /^(?:ERROR|WARNING): \d+:(\d+): (.*)/g;

					for ( let i = 0, n = programs.length; i !== n; ++ i ) {

						let diagnostics = programs[i].diagnostics;
						if ( diagnostics === undefined || diagnostics.material !== this.currentObject.material ) continue;
						if ( ! diagnostics.runnable ) valid = false;

						let shaderInfo = diagnostics[ this.currentScript ];
						let lineOffset = shaderInfo.prefix.split(/\r\n|\r|\n/).length;

						while ( true ) {
							let parseResult:any = parseMessage.exec( shaderInfo.log );
							if ( parseResult === null ) break;

							errors.push( {
								lineNumber: parseResult[ 1 ] - lineOffset,
								message: parseResult[ 2 ]
							});
						} // messages
						break;
					} // programs
			} // mode switch

			for ( let i = 0; i < errors.length; i ++ ) {

				let error : any = errors[ i ];

				let message = document.createElement( 'div' );
				message.className = 'esprima-error';
				message.textContent = error.message;

				let lineNumber : number = Math.max( error.lineNumber, 0 );
				this.errorLines.push( lineNumber );

				this.codemirror.addLineClass( lineNumber, 'background', 'errorLine' );

				let widget = this.codemirror.addLineWidget( lineNumber, message );
				this.widgets.push( widget );
			}
			return valid !== undefined ? valid : errors.length === 0;
		});
	}
}
