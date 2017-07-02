// -----------------------------------------------------------------------------
// texture.ts
// -----------------------------------------------------------------------------
import * as THREE               from 'three';
import { MoveObjectCommand  }   from '../../editor/commands/move-object-command'
import { TGALoader          }   from '../loaders/tga-loader';
import { Element            }   from './element';
import { Span               }   from './span';
import { Checkbox           }   from './checkbox';
import { Text               }   from './text';
/**
 * Texture
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class Texture
 * @extends {Element}
 */
export class Texture  extends Element {


    getValue ()             { return this._texture; }
    setValue ( texture )    {

        let canvas  : any = this.core.children[ 0 ];
        let name    : any = this.core.children[ 1 ];
        let context = canvas.getContext( '2d' );

        if ( texture !== null ) {

            let image = texture.image;

            if ( image !== undefined && image.width > 0 ) {

                name.value = texture.sourceFile;

                let scale = canvas.width / image.width;
                context.drawImage( image, 0, 0, image.width * scale, image.height * scale );

            } else {

                name.value = texture.sourceFile + ' (error)';
                context.clearRect( 0, 0, canvas.width, canvas.height );

            }

        } else {

            name.value = '';

            if ( context !== null ) {

                // Seems like context can be null if the canvas is not visible

                context.clearRect( 0, 0, canvas.width, canvas.height );

            }

        }

        this._texture = texture;
    }

    onChange ( callback ) {
        this._onChangeCallback = callback;
        return this;
    }


    constructor ( mapping?:THREE.Mapping ) {
        super( document.createElement( 'span' ) );

        let scope = this;

        let form = document.createElement( 'form' );
        let input = document.createElement( 'input' );
        input.type = 'file';
        input.addEventListener( 'change', function ( event:any ) {

            loadFile( event.target.files[ 0 ] );

        } );
        form.appendChild( input );

        let canvas = document.createElement( 'canvas' );
        canvas.width = 32;
        canvas.height = 16;
        canvas.style.cursor = 'pointer';
        canvas.style.marginRight = '5px';
        canvas.style.border = '1px solid #888';
        canvas.addEventListener( 'click', function ( event ) {

            input.click();

        }, false );
        canvas.addEventListener( 'drop', function ( event ) {

            event.preventDefault();
            event.stopPropagation();
            loadFile( event.dataTransfer.files[ 0 ] );

        }, false );
        this.core.appendChild( canvas );

        let name = document.createElement( 'input' );
        name.disabled = true;
        name.style.width = '64px';
        name.style.border = '1px solid #ccc';
        this.core.appendChild( name );

        function loadFile( file ) {

            if ( file.type.match( 'image.*' ) ) {

                let reader = new FileReader();

                if ( file.type === 'image/targa' ) {

                    reader.addEventListener( 'load', function ( event:any ) {

                        let canvas = new TGALoader().parse( event.target.result );

                        let texture = new THREE.CanvasTexture( canvas, mapping );
                        texture.sourceFile = file.name;

                        scope.setValue( texture );

                        if ( scope._onChangeCallback ) scope._onChangeCallback();

                    }, false );

                    reader.readAsArrayBuffer( file );

                } else {

                    reader.addEventListener( 'load', function ( event:any ) {

                        let image = document.createElement( 'img' );
                        image.addEventListener( 'load', function( event ) {

                            let texture = new THREE.Texture( this, mapping );
                            texture.sourceFile = file.name;
                            texture.needsUpdate = true;

                            scope.setValue( texture );

                            if ( scope._onChangeCallback ) scope._onChangeCallback();

                        }, false );

                        image.src = event.target.result;

                    }, false );

                    reader.readAsDataURL( file );

                }

            }

            form.reset();

        }

        this._texture = null;
        this._onChangeCallback = null;
    }

    // [ core ]

    get core() : HTMLSpanElement { return <HTMLSpanElement>this._core; }

    // [ Private ]

    private _texture            : any;
    private _onChangeCallback   : any;
}
