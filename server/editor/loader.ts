// -----------------------------------------------------------------------------
// loader.ts
// -----------------------------------------------------------------------------
import * as THREE               from 'three';
import { ILoader            }   from './interface';
import { IEditor            }   from './interface';
import { ISignals           }   from './interface';
import { Config             }   from './config';
import { AddObjectCommand   }   from './commands/add-object-command';
import { SetSceneCommand    }   from './commands/set-scene-command';
/**
 * Loader
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Loader
 */
export class Loader implements ILoader {

    loadFile ( file:File ) {

        let filename = file.name;
        let extension = filename.split( '.' ).pop();
        if( extension ) extension = extension.toLowerCase();
        let reader = new FileReader();

        reader.addEventListener( 'progress', ( event ) => {

            let size = '(' + Math.floor( event.total / 1000 ).format() + ' KB)';
            let progress = Math.floor( ( event.loaded / event.total ) * 100 ) + '%';
            console.log( 'Loading', filename, size, progress );
        });

        /*
        switch ( extension ) {

        case '3ds':

            reader.addEventListener( 'load', function ( event ) {

                let loader = new THREE.TDSLoader();
                let object = loader.parse( event.target.result );

                editor.execute( new AddObjectCommand( object ) );

            }, false );
            reader.readAsArrayBuffer( file );

            break;

        case 'amf':

            reader.addEventListener( 'load', function ( event ) {

                let loader = new THREE.AMFLoader();
                let amfobject = loader.parse( event.target.result );

                editor.execute( new AddObjectCommand( amfobject ) );

            }, false );
            reader.readAsArrayBuffer( file );

            break;

        case 'awd':

            reader.addEventListener( 'load', function ( event ) {

                let loader = new THREE.AWDLoader();
                let scene = loader.parse( event.target.result );

                editor.execute( new SetSceneCommand( scene ) );

            }, false );
            reader.readAsArrayBuffer( file );

            break;

        case 'babylon':

            reader.addEventListener( 'load', function ( event ) {

                let contents = event.target.result;
                let json = JSON.parse( contents );

                let loader = new THREE.BabylonLoader();
                let scene = loader.parse( json );

                editor.execute( new SetSceneCommand( scene ) );

            }, false );
            reader.readAsText( file );

            break;

        case 'babylonmeshdata':

            reader.addEventListener( 'load', function ( event ) {

                let contents = event.target.result;
                let json = JSON.parse( contents );

                let loader = new THREE.BabylonLoader();

                let geometry = loader.parseGeometry( json );
                let material = new THREE.MeshStandardMaterial();

                let mesh = new THREE.Mesh( geometry, material );
                mesh.name = filename;

                editor.execute( new AddObjectCommand( mesh ) );

            }, false );
            reader.readAsText( file );

            break;

        case 'ctm':

            reader.addEventListener( 'load', function ( event ) {

                let data = new Uint8Array( event.target.result );

                let stream = new CTM.Stream( data );
                stream.offset = 0;

                let loader = new THREE.CTMLoader();
                loader.createModel( new CTM.File( stream ), function( geometry ) {

                    geometry.sourceType = "ctm";
                    geometry.sourceFile = file.name;

                    let material = new THREE.MeshStandardMaterial();

                    let mesh = new THREE.Mesh( geometry, material );
                    mesh.name = filename;

                    editor.execute( new AddObjectCommand( mesh ) );

                } );

            }, false );
            reader.readAsArrayBuffer( file );

            break;

        case 'dae':

            reader.addEventListener( 'load', function ( event ) {

                let contents = event.target.result;

                let loader = new THREE.ColladaLoader();
                let collada = loader.parse( contents );

                collada.scene.name = filename;

                editor.execute( new AddObjectCommand( collada.scene ) );

            }, false );
            reader.readAsText( file );

            break;

        case 'fbx':

            reader.addEventListener( 'load', function ( event ) {

                let contents = event.target.result;

                let loader = new THREE.FBXLoader();
                let object = loader.parse( contents );

                editor.execute( new AddObjectCommand( object ) );

            }, false );
            reader.readAsArrayBuffer( file );

            break;

        case 'glb':
        case 'gltf':

            reader.addEventListener( 'load', function ( event ) {

                let contents = event.target.result;

                let loader = new THREE.GLTFLoader();
                loader.parse( contents, function ( result ) {

                    result.scene.name = filename;
                    editor.execute( new AddObjectCommand( result.scene ) );

                } );

            }, false );
            reader.readAsArrayBuffer( file );

            break;

        case 'js':
        case 'json':

        case '3geo':
        case '3mat':
        case '3obj':
        case '3scn':

            reader.addEventListener( 'load', function ( event ) {

                let contents = event.target.result;

                // 2.0

                if ( contents.indexOf( 'postMessage' ) !== - 1 ) {

                    let blob = new Blob( [ contents ], { type: 'text/javascript' } );
                    let url = URL.createObjectURL( blob );

                    let worker = new Worker( url );

                    worker.onmessage = function ( event ) {

                        event.data.metadata = { version: 2 };
                        _handleJSON( event.data, file, filename );

                    };

                    worker.postMessage( Date.now() );

                    return;

                }

                // >= 3.0

                let data;

                try {

                    data = JSON.parse( contents );

                } catch ( error ) {

                    alert( error );
                    return;

                }

                _handleJSON( data, file, filename );

            }, false );
            reader.readAsText( file );

            break;


        case 'kmz':

            reader.addEventListener( 'load', function ( event ) {

                let loader = new THREE.KMZLoader();
                let collada = loader.parse( event.target.result );

                collada.scene.name = filename;

                editor.execute( new AddObjectCommand( collada.scene ) );

            }, false );
            reader.readAsArrayBuffer( file );

            break;

        case 'md2':

            reader.addEventListener( 'load', function ( event ) {

                let contents = event.target.result;

                let geometry = new THREE.MD2Loader().parse( contents );
                let material = new THREE.MeshStandardMaterial( {
                    morphTargets: true,
                    morphNormals: true
                } );

                let mesh = new THREE.Mesh( geometry, material );
                mesh.mixer = new THREE.AnimationMixer( mesh );
                mesh.name = filename;

                editor.execute( new AddObjectCommand( mesh ) );

            }, false );
            reader.readAsArrayBuffer( file );

            break;

        case 'obj':

            reader.addEventListener( 'load', function ( event ) {

                let contents = event.target.result;

                let object = new THREE.OBJLoader().parse( contents );
                object.name = filename;

                editor.execute( new AddObjectCommand( object ) );

            }, false );
            reader.readAsText( file );

            break;

        case 'playcanvas':

            reader.addEventListener( 'load', function ( event ) {

                let contents = event.target.result;
                let json = JSON.parse( contents );

                let loader = new THREE.PlayCanvasLoader();
                let object = loader.parse( json );

                editor.execute( new AddObjectCommand( object ) );

            }, false );
            reader.readAsText( file );

            break;

        case 'ply':

            reader.addEventListener( 'load', function ( event ) {

                let contents = event.target.result;

                let geometry = new THREE.PLYLoader().parse( contents );
                geometry.sourceType = "ply";
                geometry.sourceFile = file.name;

                let material = new THREE.MeshStandardMaterial();

                let mesh = new THREE.Mesh( geometry, material );
                mesh.name = filename;

                editor.execute( new AddObjectCommand( mesh ) );

            }, false );
            reader.readAsArrayBuffer( file );

            break;

        case 'stl':

            reader.addEventListener( 'load', function ( event ) {

                let contents = event.target.result;

                let geometry = new THREE.STLLoader().parse( contents );
                geometry.sourceType = "stl";
                geometry.sourceFile = file.name;

                let material = new THREE.MeshStandardMaterial();

                let mesh = new THREE.Mesh( geometry, material );
                mesh.name = filename;

                editor.execute( new AddObjectCommand( mesh ) );

            }, false );

            if ( reader.readAsBinaryString !== undefined ) {

                reader.readAsBinaryString( file );

            } else {

                reader.readAsArrayBuffer( file );

            }

            break;

//        case 'utf8':
//
//            reader.addEventListener( 'load', function ( event ) {
//
//                let contents = event.target.result;
//
//                let geometry = new THREE.UTF8Loader().parse( contents );
//                let material = new THREE.MeshLambertMaterial();
//
//                let mesh = new THREE.Mesh( geometry, material );
//
//                editor.execute( new AddObjectCommand( mesh ) );
//
//            }, false );
//            reader.readAsBinaryString( file );
//
//            break;

        case 'vtk':

            reader.addEventListener( 'load', function ( event ) {

                let contents = event.target.result;

                let geometry = new THREE.VTKLoader().parse( contents );
                geometry.sourceType = "vtk";
                geometry.sourceFile = file.name;

                let material = new THREE.MeshStandardMaterial();

                let mesh = new THREE.Mesh( geometry, material );
                mesh.name = filename;

                editor.execute( new AddObjectCommand( mesh ) );

            }, false );
            reader.readAsText( file );

            break;

        case 'wrl':

            reader.addEventListener( 'load', function ( event ) {

                let contents = event.target.result;

                let result = new THREE.VRMLLoader().parse( contents );

                editor.execute( new SetSceneCommand( result ) );

            }, false );
            reader.readAsText( file );

            break;

        default:

            alert( 'Unsupported file format (' + extension +  ').' );

            break;

        }
        */
    }

    // [ Constructor ]

    constructor( editor:IEditor ) {

        this._editor        = editor;
        this._signals       = editor.signals;
        this._texturePath   = '';
    }

    private _editor         : IEditor;
    private _signals        : ISignals;
    private _texturePath    : string;

    private _handleJSON ( data:any, file:any, filename:string ) {

        if ( data.metadata === undefined ) { // 2.0

            data.metadata = { type: 'Geometry' };
        }

        if ( data.metadata.type === undefined ) { // 3.0

            data.metadata.type = 'Geometry';
        }

        if ( data.metadata.formatVersion !== undefined ) {

            data.metadata.version = data.metadata.formatVersion;
        }

        switch ( data.metadata.type.toLowerCase() ) {

        case 'buffergeometry':
            {
                let loader = new THREE.BufferGeometryLoader();
                let result = loader.parse( data );

                let mesh = new THREE.Mesh( result );

                this._editor.execute( new AddObjectCommand( mesh ) );
            }
            break;

        case 'geometry':
            {
                let loader = new THREE.JSONLoader();
                loader.setTexturePath( this._texturePath );

                let result : any = loader.parse( data );
                let geometry = result.geometry;
                let material;

                if ( result.materials !== undefined ) {

                    if ( result.materials.length > 1 ) {

                        material = new THREE.MultiMaterial( result.materials );

                    } else {

                        material = result.materials[ 0 ];

                    }

                } else {

                    material = new THREE.MeshStandardMaterial();

                }

                geometry.sourceType = "ascii";
                geometry.sourceFile = file.name;

                let mesh;

                if ( geometry.animation && geometry.animation.hierarchy ) {

                    mesh = new THREE.SkinnedMesh( geometry, material );

                } else {

                    mesh = new THREE.Mesh( geometry, material );

                }

                mesh.name = filename;

                this._editor.execute( new AddObjectCommand( mesh ) );
            }
            break;

        case 'object':
            {
                let loader = new THREE.ObjectLoader();
                loader.setTexturePath( this._texturePath );

                let result = loader.parse( data );

                if ( result instanceof THREE.Scene ) {
                    this._editor.execute( new SetSceneCommand( result ) );
                } else {
                    this._editor.execute( new AddObjectCommand( result ) );
                }
            }
            break;

        case 'app':
            {
                this._editor.fromJSON( data );
            }
            break;
        }
    }
}
