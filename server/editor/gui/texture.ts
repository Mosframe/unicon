/**
 * @author mrdoob / http://mrdoob.com/
 */

import {} from '../../engine/object';

import * as THREE from 'three';
import {Element} from './element';
import {Span} from './span';
import {Checkbox} from './checkbox';
import {Text} from './text';
import {MoveObjectCommand} from '../../unicon-editor/commands/move-object-command'
import {TGALoader} from '../loaders/tga-loader';

export class Texture  extends Element {

    mapping             : THREE.Mapping;
    texture             : HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    onChangeCallback    : Function;
    form                : HTMLFormElement;

    constructor ( mapping:THREE.Mapping ) {

        super( document.createElement( 'span' ) );
        let dom = this.core;

        this.mapping = mapping;

        let form = document.createElement( 'form' );
        this.form = form;

        let input = document.createElement( 'input' );
        input.type = 'file';
        input.addEventListener( 'change', ( event:any )=> {
            this.loadFile( event.target.files[ 0 ] );
        });
        form.appendChild( input );

        let canvas = document.createElement( 'canvas' );
        canvas.width = 32;
        canvas.height = 16;
        canvas.style.cursor = 'pointer';
        canvas.style.marginRight = '5px';
        canvas.style.border = '1px solid #888';
        canvas.addEventListener( 'click', ( event ) => {
            input.click();
        }, false );
        canvas.addEventListener( 'drop', ( event ) => {
            event.preventDefault();
            event.stopPropagation();
            this.loadFile( event.dataTransfer.files[ 0 ] );

        }, false );
        dom.appendChild( canvas );

        let name = document.createElement( 'input' );
        name.disabled = true;
        name.style.width = '64px';
        name.style.border = '1px solid #ccc';
        dom.appendChild( name );

        this.texture = null;
        this.onChangeCallback = null;
    }

    loadFile( file ) {

        if ( file.type.match( 'image.*' ) ) {

            let reader = new FileReader();

            if ( file.type === 'image/targa' ) {

                reader.addEventListener( 'load', ( event ) => {

                    let canvas = new TGALoader().parse( event.target['result'] );

                    let texture = new THREE.CanvasTexture( canvas, this.mapping );
                    texture.sourceFile = file.name;

                    this.setValue( texture );

                    if ( this.onChangeCallback ) this.onChangeCallback();

                }, false );

                reader.readAsArrayBuffer( file );

            } else {

                reader.addEventListener( 'load', ( event ) => {

                    let image = document.createElement( 'img' );
                    image.addEventListener( 'load', ( event ) => {

                        let texture = new THREE.Texture( image, this.mapping );
                        texture.sourceFile = file.name;
                        texture.needsUpdate = true;

                        this.setValue( texture );

                        if ( this.onChangeCallback ) this.onChangeCallback();

                    }, false );

                    image.src = event.target['result'];

                }, false );

                reader.readAsDataURL( file );

            }

        }
        this.form.reset();
        return this;
    }

    getValue () {
        return this.texture;
    }

    setValue ( texture ) {

        let canvas  = <HTMLCanvasElement>this.core.children[ 0 ];
        let name    = <HTMLInputElement>this.core.children[ 1 ];
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

        this.texture = texture;
        return this;
    }

    onChange ( callback ) {

        this.onChangeCallback = callback;

        return this;

    }

    // [ core ]

    get core() : HTMLSpanElement { return <HTMLSpanElement>this._core; }

}
