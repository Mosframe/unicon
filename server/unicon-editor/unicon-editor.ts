// -----------------------------------------------------------------------------
// unicon-editor.ts
// -----------------------------------------------------------------------------
import  * as THREE                  from 'three';
import { Global                 }   from '../engine/global';
import { hasProperty            }   from '../engine/object';
import { HTMLGroup              }   from '../editor/html/group';
import { HTMLMesh               }   from '../editor/html/mesh';
import { Editor                 }   from '../editor/editor';
//import {Script                } from '../editor/script';
import { Viewport               }   from '../editor/viewport';
import { Player                 }   from '../editor/player';
import { Toolbar                }   from '../editor/toolbar';
import { Menubar                }   from '../editor/menubar';
import { RightSidebar           }   from '../editor/right-sidebar';
import { Modal as UIModal       }   from '../editor/gui/modal';
import { RemoveObjectCommand    }   from '../editor/commands/remove-object-command';

// global
let global = new Global();

// editor
let editor = new Editor();

let viewport = new Viewport( editor );
document.body.appendChild( viewport.core );

/*
let script = new Script( editor );
document.body.appendChild( script.container.core );
*/
let player = new Player( editor );
document.body.appendChild( player.core );

let toolbar = new Toolbar( editor );
document.body.appendChild( toolbar.container.core );

let menubar = new Menubar( editor );
document.body.appendChild( menubar.core );

let rightSidebar = new RightSidebar( editor );
document.body.appendChild( rightSidebar.core );

let modal = new UIModal();
document.body.appendChild( modal.container.core );

editor.setTheme( editor.config.getKey( 'theme' ) );


editor.storage.init( function() {

    editor.storage.get( function( state ) {

        if ( isLoadingFromHash ) return;

        if ( state !== undefined ) {
            editor.fromJSON( state );
        }

        let selected = editor.config.getKey( 'selected' );

        if ( selected !== undefined ) {
            editor.selectByUuid( selected );
        }
    });

    //

    let timeout;

    function saveState( scene ) {

        if ( editor.config.getKey( 'autosave' ) === false ) {

            return;

        }

        clearTimeout( timeout );

        timeout = setTimeout( function () {

            editor.signals.savingStarted.dispatch();

            timeout = setTimeout( function () {

                editor.storage.set( editor.toJSON(), ()=>{} );

                editor.signals.savingFinished.dispatch();

            }, 100 );

        }, 1000 );

    };

    let signals = editor.signals;

    signals.geometryChanged.add( saveState );
    signals.objectAdded.add( saveState );
    signals.objectChanged.add( saveState );
    signals.objectRemoved.add( saveState );
    signals.materialChanged.add( saveState );
    signals.sceneBackgroundChanged.add( saveState );
    signals.sceneFogChanged.add( saveState );
    signals.sceneGraphChanged.add( saveState );
    signals.scriptChanged.add( saveState );
    signals.historyChanged.add( saveState );

    signals.showModal.add( function ( content ) {

        modal.show( content );

    } );

} );


//

document.addEventListener( 'dragover', function ( event ) {

    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';

}, false );

document.addEventListener( 'drop', function ( event ) {

    event.preventDefault();

    if ( event.dataTransfer.files.length > 0 ) {

        editor.loader.loadFile( event.dataTransfer.files[ 0 ] );

    }

}, false );

document.addEventListener( 'keydown', function ( event ) {

    switch ( event.keyCode ) {

        case 8: // backspace

            event.preventDefault(); // prevent browser back

        case 46: // delete

            let object = editor.selected;
            if( object ) {
                if ( confirm( 'Delete ' + object.name + '?' ) === false ) return;
                if ( object.parent ) editor.execute( new RemoveObjectCommand( object ) );
            }

            break;

        case 90: // Register Ctrl-Z for Undo, Ctrl-Shift-Z for Redo

            if ( event.ctrlKey && event.shiftKey ) {
                editor.redo();
            } else if ( event.ctrlKey ) {
                editor.undo();
            }

            break;

        case 87: // Register W for translation transform mode

            editor.signals.transformModeChanged.dispatch( 'translate' );

            break;

        case 69: // Register E for rotation transform mode

            editor.signals.transformModeChanged.dispatch( 'rotate' );

            break;

        case 82: // Register R for scaling transform mode

            editor.signals.transformModeChanged.dispatch( 'scale' );

            break;

    }

}, false );

function onWindowResize( event ) {

    editor.signals.windowResize.dispatch();

}

window.addEventListener( 'resize', onWindowResize, false );

onWindowResize( null );

//

let isLoadingFromHash = false;
let hash = window.location.hash;

if ( hash.substr( 1, 5 ) === 'file=' ) {

    let file = hash.substr( 6 );

    if ( confirm( 'Any unsaved data will be lost. Are you sure?' ) ) {

        let loader = new THREE.FileLoader();
        if( hasProperty(loader,'crossOrigin') ) loader['crossOrigin'] = '';
        loader.load( file, function ( text ) {
            editor.clear();
            editor.fromJSON( JSON.parse( text ) );
        });
        isLoadingFromHash = true;
    }

}

/*
window.addEventListener( 'message', function ( event ) {

    editor.clear();
    editor.fromJSON( event.data );

}, false );
*/

// VR

let groupVR;

// TODO: Use editor.signals.enteredVR (WebVR 1.0)

editor.signals.enterVR.add( function () {

    if ( groupVR === undefined ) {

        groupVR = new HTMLGroup( viewport.core );
        editor.sceneHelpers.add( groupVR );

        let mesh = new HTMLMesh( rightSidebar.core );
        mesh.position.set( 15, 0, 15 );
        mesh.rotation.y = - 0.5;
        groupVR.add( mesh );

        let signals = editor.signals;

        function updateTexture() {
            mesh.material.update();
        }

        signals.objectSelected.add( updateTexture );
        signals.objectAdded.add( updateTexture );
        signals.objectChanged.add( updateTexture );
        signals.objectRemoved.add( updateTexture );
        signals.sceneGraphChanged.add( updateTexture );
        signals.historyChanged.add( updateTexture );
    }

    groupVR.visible = true;

} );

editor.signals.exitedVR.add( function () {

    if ( groupVR !== undefined ) groupVR.visible = false;

} );
