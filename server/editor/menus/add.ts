// -----------------------------------------------------------------------------
// add.ts
// -----------------------------------------------------------------------------
import *                as THREE                from 'three'                                    ;
import { Panel          as UIPanel          }   from '../../editor/gui/panel'                   ;
import { Row            as UIRow            }   from '../../editor/gui/row'                     ;
import { Button         as UIButton         }   from '../../editor/gui/button'                  ;
import { Number         as UINumber         }   from '../../editor/gui/number'                  ;
import { Text           as UIText           }   from '../../editor/gui/text'                    ;
import { Boolean        as UIBoolean        }   from '../../editor/gui/boolean'                 ;
import { HorizontalRule as UIHorizontalRule }   from '../../editor/gui/horizontal-rule'         ;
import { IEditor                            }   from '../interface'                             ;
import { AddObjectCommand                   }   from '../commands/add-object-command'           ;
import { RemoveObjectCommand                }   from '../commands/remove-object-command'        ;
import { SetMaterialValueCommand            }   from '../commands/set-material-value-command'   ;
import { MultiCmdsCommand                   }   from '../commands/multi-cmds-command'           ;
import { Menu                               }   from './menu'                                   ;


/**
 * add menu
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class AddMenu
 * @extends {Menu}
 */
export class AddMenu extends Menu {

    constructor( editor:IEditor ) {
        super('add');

        // [ Title ]
        let title = new UIPanel();
        title.setClass( 'title' );
        title.setTextContent( 'Add' );
        this.add( title );

        // [ Options ]
        let options = new UIPanel();
        options.setClass( 'options' );
        this.add( options );

        let meshCount = 0;
        let lightCount = 0;
        let cameraCount = 0;

        editor.signals.editorCleared.add( () => {

            meshCount = 0;
            lightCount = 0;
            cameraCount = 0;
        });

        // [ Group ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'Group' );
            option.onClick( () => {

                let mesh = new THREE.Group();
                mesh.name = 'Group ' + ( ++ meshCount );
                editor.execute( new AddObjectCommand( mesh ) );
            });
            options.add( option );
        }

        options.add( new UIHorizontalRule() );

        // [ Plane ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'Plane' );
            option.onClick( () => {

                let geometry = new THREE.PlaneBufferGeometry( 2, 2 );
                let material = new THREE.MeshStandardMaterial();
                let mesh = new THREE.Mesh( geometry, material );
                mesh.name = 'Plane ' + ( ++ meshCount );

                editor.execute( new AddObjectCommand( mesh ) );

            });
            options.add( option );
        }

        // [ Box ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'Box' );
            option.onClick( () => {

                let geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
                let mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial() );
                mesh.name = 'Box ' + ( ++ meshCount );

                editor.execute( new AddObjectCommand( mesh ) );

            });
            options.add( option );
        }

        // [ Circle ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'Circle' );
            option.onClick( () => {

                let radius = 1;
                let segments = 32;

                let geometry = new THREE.CircleBufferGeometry( radius, segments );
                let mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial() );
                mesh.name = 'Circle ' + ( ++ meshCount );

                editor.execute( new AddObjectCommand( mesh ) );

            });
            options.add( option );
        }
        // [ Cylinder ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'Cylinder' );
            option.onClick( () => {

                let radiusTop = 1;
                let radiusBottom = 1;
                let height = 2;
                let radiusSegments = 32;
                let heightSegments = 1;
                let openEnded = false;

                let geometry = new THREE.CylinderBufferGeometry( radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded );
                let mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial() );
                mesh.name = 'Cylinder ' + ( ++ meshCount );

                editor.execute( new AddObjectCommand( mesh ) );

            });
            options.add( option );
        }

        // [ Sphere ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'Sphere' );
            option.onClick( () => {

                let radius = 1;
                let widthSegments = 32;
                let heightSegments = 16;
                let phiStart = 0;
                let phiLength = Math.PI * 2;
                let thetaStart = 0;
                let thetaLength = Math.PI;

                let geometry = new THREE.SphereBufferGeometry( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength );
                let mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial() );
                mesh.name = 'Sphere ' + ( ++ meshCount );

                editor.execute( new AddObjectCommand( mesh ) );

            });
            options.add( option );
        }

        // [ Icosahedron ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'Icosahedron' );
            option.onClick( () => {

                let radius = 1;
                let detail = 2;

                let geometry = new THREE.IcosahedronGeometry( radius, detail );
                let mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial() );
                mesh.name = 'Icosahedron ' + ( ++ meshCount );

                editor.execute( new AddObjectCommand( mesh ) );

            });
            options.add( option );
        }

        // [ Torus ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'Torus' );
            option.onClick( () => {

                let radius = 2;
                let tube = 1;
                let radialSegments = 32;
                let tubularSegments = 12;
                let arc = Math.PI * 2;

                let geometry = new THREE.TorusBufferGeometry( radius, tube, radialSegments, tubularSegments, arc );
                let mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial() );
                mesh.name = 'Torus ' + ( ++ meshCount );

                editor.execute( new AddObjectCommand( mesh ) );

            });
            options.add( option );
        }

        // [ TorusKnot ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'TorusKnot' );
            option.onClick( () => {

                let radius = 2;
                let tube = 0.8;
                let tubularSegments = 64;
                let radialSegments = 12;
                let p = 2;
                let q = 3;

                let geometry = new THREE.TorusKnotBufferGeometry( radius, tube, tubularSegments, radialSegments, p, q );
                let mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial() );
                mesh.name = 'TorusKnot ' + ( ++ meshCount );

                editor.execute( new AddObjectCommand( mesh ) );

            });
            options.add( option );
        }

        /*
        // [ Teapot ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'Teapot' );
            option.onClick( () => {

                let size = 50;
                let segments = 10;
                let bottom = true;
                let lid = true;
                let body = true;
                let fitLid = false;
                let blinnScale = true;

                let material = new THREE.MeshStandardMaterial();

                let geometry = new THREE.TeapotBufferGeometry( size, segments, bottom, lid, body, fitLid, blinnScale );
                let mesh = new THREE.Mesh( geometry, material );
                mesh.name = 'Teapot ' + ( ++ meshCount );

                editor.addObject( mesh );
                editor.select( mesh );

            });
            options.add( option );
        }
        */

        // [ Lathe ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'Lathe' );
            option.onClick( () => {

                let points = [
                    new THREE.Vector3( 0, 0 ),
                    new THREE.Vector3( 4, 0 ),
                    new THREE.Vector3( 3.5, 0.5 ),
                    new THREE.Vector3( 1, 0.75 ),
                    new THREE.Vector3( 0.8, 1 ),
                    new THREE.Vector3( 0.8, 4 ),
                    new THREE.Vector3( 1, 4.2 ),
                    new THREE.Vector3( 1.4, 4.8 ),
                    new THREE.Vector3( 2, 5 ),
                    new THREE.Vector3( 2.5, 5.4 ),
                    new THREE.Vector3( 3, 12 )
                ];
                let segments = 20;
                let phiStart = 0;
                let phiLength = 2 * Math.PI;

                let geometry = new THREE.LatheBufferGeometry( points, segments, phiStart, phiLength );
                let mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial( { side: THREE.DoubleSide } ) );
                mesh.name = 'Lathe ' + ( ++ meshCount );

                editor.execute( new AddObjectCommand( mesh ) );

            });
            options.add( option );
        }

        // [ Sprite ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'Sprite' );
            option.onClick( () => {

                let sprite = new THREE.Sprite( new THREE.SpriteMaterial() );
                sprite.name = 'Sprite ' + ( ++ meshCount );

                editor.execute( new AddObjectCommand( sprite ) );

            });
            options.add( option );
        }

        options.add( new UIHorizontalRule() );

        // [ PointLight ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'PointLight' );
            option.onClick( () => {

                let color = 0xffffff;
                let intensity = 1;
                let distance = 0;

                let light = new THREE.PointLight( color, intensity, distance );
                light.name = 'PointLight ' + ( ++ lightCount );

                editor.execute( new AddObjectCommand( light ) );

            });
            options.add( option );
        }

        // [ SpotLight ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'SpotLight' );
            option.onClick( () => {

                let color = 0xffffff;
                let intensity = 1;
                let distance = 0;
                let angle = Math.PI * 0.1;
                let penumbra = 0;

                let light = new THREE.SpotLight( color, intensity, distance, angle, penumbra );
                light.name = 'SpotLight ' + ( ++ lightCount );
                light.target.name = 'SpotLight ' + ( lightCount ) + ' Target';

                light.position.set( 5, 10, 7.5 );

                editor.execute( new AddObjectCommand( light ) );

            });
            options.add( option );
        }

        // [ DirectionalLight ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'DirectionalLight' );
            option.onClick( () => {

                let color = 0xffffff;
                let intensity = 1;

                let light = new THREE.DirectionalLight( color, intensity );
                light.name = 'DirectionalLight ' + ( ++ lightCount );
                light.target.name = 'DirectionalLight ' + ( lightCount ) + ' Target';

                light.position.set( 5, 10, 7.5 );

                editor.execute( new AddObjectCommand( light ) );

            });
            options.add( option );
        }

        // [ HemisphereLight ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'HemisphereLight' );
            option.onClick( () => {

                let skyColor = 0x00aaff;
                let groundColor = 0xffaa00;
                let intensity = 1;

                let light = new THREE.HemisphereLight( skyColor, groundColor, intensity );
                light.name = 'HemisphereLight ' + ( ++ lightCount );

                light.position.set( 0, 10, 0 );

                editor.execute( new AddObjectCommand( light ) );

            });
            options.add( option );
        }

        // [ AmbientLight ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'AmbientLight' );
            option.onClick( () => {

                let color = 0x222222;
                let light = new THREE.AmbientLight( color );
                light.name = 'AmbientLight ' + ( ++ lightCount );
                editor.execute( new AddObjectCommand( light ) );

            });
            options.add( option );
        }

        options.add( new UIHorizontalRule() );

        // [ PerspectiveCamera ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'PerspectiveCamera' );
            option.onClick( () => {

                let camera = new THREE.PerspectiveCamera( 50, 1, 1, 10000 );
                camera.name = 'PerspectiveCamera ' + ( ++ cameraCount );
                editor.execute( new AddObjectCommand( camera ) );
            });
            options.add( option );
        }
    }
}
