// -----------------------------------------------------------------------------
// html-to-canvas.ts
// -----------------------------------------------------------------------------
import * as THREE from 'three';
/**
 * HTML to Canvas
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @param {HTMLElement} element
 * @returns
 */
export function htmlToCanvas( element:HTMLElement ) {

	let range = document.createRange();

	function Clipper( context:CanvasRenderingContext2D ) {

		let clips : any = [];
		let isClipping = false;

		function doClip() {

			if ( isClipping ) {

				isClipping = false;
				context.restore();
			}

			if ( clips.length === 0 ) return;

			let minX = - Infinity, minY = - Infinity;
			let maxX = Infinity, maxY = Infinity;

			for ( let i = 0; i < clips.length; i ++ ) {

				let clip = clips[ i ];

				minX = Math.max( minX, clip.x );
				minY = Math.max( minY, clip.y );
				maxX = Math.min( maxX, clip.x + clip.width );
				maxY = Math.min( maxY, clip.y + clip.height );

			}

			context.save();
			context.beginPath();
			context.rect( minX, minY, maxX - minX, maxY - minY );
			context.clip();

			isClipping = true;

		}

		return {
			add: function ( clip ) {
				clips.push( clip );
				doClip();
			},
			remove: function () {
				clips.pop();
				doClip();
			}
		};

	}

	function drawText( style, x, y, string ) {

		if ( string !== '' ) {
			if( context ) {
				context.font = style.fontSize + ' ' + style.fontFamily;
				context.textBaseline = 'top';
				context.fillStyle = style.color;
				context.fillText( string, x, y );
			}
		}
	}

	function drawBorder( style, which, x, y, width, height ) {

		let borderWidth = style[ which + 'Width' ];
		let borderStyle = style[ which + 'Style' ];
		let borderColor = style[ which + 'Color' ];

		if ( borderWidth !== '0px' && borderStyle !== 'none' && borderColor !== 'transparent' && borderColor !== 'rgba(0, 0, 0, 0)' ) {

			if( context ) {
				context.strokeStyle = borderColor;
				context.beginPath();
				context.moveTo( x, y );
				context.lineTo( x + width, y + height );
				context.stroke();
			}
		}
	}

	function drawElement( element, style?:any ) {

		let x = 0, y = 0, width = 0, height = 0;

		if ( element.nodeType === 3 ) {

			// text

			range.selectNode( element );

			let rect = range.getBoundingClientRect();

			x = rect.left - offset.left - 0.5;
			y = rect.top - offset.top - 0.5;
			width = rect.width;
			height = rect.height;

			drawText( style, x, y, element.nodeValue.trim() );

		} else {

			if ( element.style.display === 'none' ) return;

			let rect = element.getBoundingClientRect();

			x = rect.left - offset.left - 0.5;
			y = rect.top - offset.top - 0.5;
			width = rect.width;
			height = rect.height;

			style = window.getComputedStyle( element );

			let backgroundColor = style.backgroundColor;

			if ( backgroundColor !== 'transparent' && backgroundColor !== 'rgba(0, 0, 0, 0)' ) {

				if( context ) {
					context.fillStyle = backgroundColor;
					context.fillRect( x, y, width, height );
				}
			}

			drawBorder( style, 'borderTop', x, y, width, 0 );
			drawBorder( style, 'borderLeft', x, y, 0, height );
			drawBorder( style, 'borderBottom', x, y + height, width, 0 );
			drawBorder( style, 'borderRight', x + width, y, 0, height );

			if ( element.type === 'color' || element.type === 'text' ) {

				clipper.add( { x: x, y: y, width: width, height: height } );

				drawText( style, x + parseInt( style.paddingLeft ), y + parseInt( style.paddingTop ), element.value );

				clipper.remove();

			}

		}

		/*
		// debug

		context.strokeStyle = '#' + Math.random().toString( 16 ).slice( - 3 );
		context.strokeRect( x - 0.5, y - 0.5, width + 1, height + 1 );
		*/

		let isClipping = style.overflow === 'auto' || style.overflow === 'hidden';

		if ( isClipping ) clipper.add( { x: x, y: y, width: width, height: height } );

		for ( let i = 0; i < element.childNodes.length; i ++ ) {

			drawElement( element.childNodes[ i ], style );

		}

		if ( isClipping ) clipper.remove();

	}

	let offset = element.getBoundingClientRect();

	let canvas = document.createElement( 'canvas' );
	canvas.width = offset.width;
	canvas.height = offset.height;

	let context = canvas.getContext( '2d'/*, { alpha: false }*/ );
	if( !context ) return canvas;

	let clipper = Clipper( context );

	console.time( 'drawElement' );

	drawElement( element );

	console.timeEnd( 'drawElement' );

	return canvas;
}
