// -----------------------------------------------------------------------------
// outliner.ts
// -----------------------------------------------------------------------------
import * as THREE               from 'three';
import { IEditor            }   from '../interface';
import { MoveObjectCommand  }   from '../commands/move-object-command'
import { TGALoader          }   from '../loaders/tga-loader';
import { Element            }   from './element';
import { Span               }   from './span';
import { Checkbox           }   from './checkbox';
import { Text               }   from './text';


/**
 * Outliner
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class Outliner
 * @extends {Element}
 */
export class Outliner extends Element {

    editor          : IEditor;
    scene           : THREE.Scene;
    selectedIndex   : number;
    selectedValue   : any;
    options         : any;
    className       : string;
    value           : any;
    clientHeight    : any;
    nextSibling     : any;

    constructor ( editor:IEditor ) {

        let element = document.createElement( 'div' );
        element.className   = 'Outliner';
        element.tabIndex    = 0;	// keyup event is ignored without setting tabIndex
        super( element );

        this.editor = editor;

        // hack
        this.scene = editor.scene;

        // Prevent native scroll behavior
        this.core.addEventListener( 'keydown', ( event ) =>{

            switch ( event.keyCode ) {
                case 38: // up
                case 40: // down
                    event.preventDefault();
                    event.stopPropagation();
                    break;
            }

        }, false );

        // Keybindings to support arrow navigation
        this.core.addEventListener( 'keyup', ( event ) => {

            switch ( event.keyCode ) {
                case 38: // up
                    this.selectIndex( this.selectedIndex - 1 );
                    break;
                case 40: // down
                    this.selectIndex( this.selectedIndex + 1 );
                    break;
            }

        }, false );

        this.options = [];
        this.selectedIndex = - 1;
        this.selectedValue = null;

        return this;

    }

    selectIndex ( index:number ) {

        if ( index >= 0 && index < this.options.length ) {

            this.setValue( this.options[ index ].value );

            var changeEvent = document.createEvent( 'HTMLEvents' );
            changeEvent.initEvent( 'change', true, true );
            this.core.dispatchEvent( changeEvent );
        }

    }

    setOptions ( options ) {

        var scope = this;

        while ( scope.core.children.length > 0 ) {
            if( scope.core.firstChild ) scope.core.removeChild( scope.core.firstChild );
        }


        function onClick() {

            scope.setValue( this.value );
            var changeEvent = document.createEvent( 'HTMLEvents' );
            changeEvent.initEvent( 'change', true, true );
            scope.core.dispatchEvent( changeEvent );
        }

        // Drag

    	var currentDrag;

        function onDrag( event ) {
            currentDrag = this;
        }

        function onDragStart( event ) {
            event.dataTransfer.setData( 'text', 'foo' );
        }

        function onDragOver( event ) {

            if ( this === currentDrag ) return;

            var area = event.offsetY / this.clientHeight;

            if ( area < 0.25 ) {

                this.className = 'option dragTop';

            } else if ( area > 0.75 ) {

                this.className = 'option dragBottom';

            } else {

                this.className = 'option drag';

            }
        }

        function onDragLeave() {

            if ( this === currentDrag ) return;

            this.className = 'option';

        }

        function onDrop( event ) {

            if ( this === currentDrag ) return;

            this.className = 'option';

            var scene = scope.scene;
            var object = scene.getObjectById( currentDrag.value );

            var area = event.offsetY / this.clientHeight;

            if ( area < 0.25 ) {

                var nextObject = scene.getObjectById( this.value );
                moveObject( object, nextObject.parent, nextObject );

            } else if ( area > 0.75 ) {

                var nextObject = scene.getObjectById( this.nextSibling.value );
                moveObject( object, nextObject.parent, nextObject );

            } else {
                var parentObject = scene.getObjectById( this.value );
                moveObject( object, parentObject );
            }

        }

        function moveObject( object, newParent, nextObject?:any ) {

            if ( nextObject === null ) nextObject = undefined;

            var newParentIsChild = false;

            object.traverse( function ( child ) {

                if ( child === newParent ) newParentIsChild = true;

            } );

            if ( newParentIsChild ) return;

            this.editor.execute( new MoveObjectCommand( object, newParent, nextObject ) );

            var changeEvent = document.createEvent( 'HTMLEvents' );
            changeEvent.initEvent( 'change', true, true );
            scope.core.dispatchEvent( changeEvent );

        }

        //

        scope.options = [];

        for ( var i = 0; i < options.length; i ++ ) {

            var div = options[ i ];
            div.className = 'option';
            scope.core.appendChild( div );

            scope.options.push( div );

            div.addEventListener( 'click', onClick, false );

            if ( div.draggable === true ) {

                div.addEventListener( 'drag', onDrag, false );
                div.addEventListener( 'dragstart', onDragStart, false ); // Firefox needs this

                div.addEventListener( 'dragover', onDragOver, false );
                div.addEventListener( 'dragleave', onDragLeave, false );
                div.addEventListener( 'drop', onDrop, false );

            }
        }

        return scope;
    }

    getValue () {

        return this.selectedValue;

    }

    setValue ( value ) {

        for ( var i = 0; i < this.options.length; i ++ ) {

            var element = this.options[ i ];

            if ( element.value === value ) {

                element.classList.add( 'active' );

                // scroll into view

                var y = element.offsetTop - this.core.offsetTop;
                var bottomY = y + element.offsetHeight;
                var minScroll = bottomY - this.core.offsetHeight;

                if ( this.core.scrollTop > y ) {

                    this.core.scrollTop = y;

                } else if ( this.core.scrollTop < minScroll ) {

                    this.core.scrollTop = minScroll;
                }

                this.selectedIndex = i;

            } else {
                element.classList.remove( 'active' );
            }
        }

        this.selectedValue = value;

        return this;
    }

    // [ core ]

    get core() : HTMLDivElement { return <HTMLDivElement>this._core; }

}
