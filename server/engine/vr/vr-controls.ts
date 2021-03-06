// -----------------------------------------------------------------------------
// vr-controls.ts
// -----------------------------------------------------------------------------
import *      as THREE          from 'three';


/**
 * @author dmarcos / https://github.com/dmarcos
 * @author mrdoob / http://mrdoob.com
 */

export class VRControls{

    object : THREE.Object3D;
    onError : any;
	vrDisplay : any;
    vrDisplays : any;
    standingMatrix : THREE.Matrix4;
    frameData:any;
    scale:number;
    standing    : boolean;
    userHeight : number;


    gotVRDisplays( displays ) {

        this.vrDisplays = displays;

        if ( displays.length > 0 ) {

            this.vrDisplay = displays[ 0 ];

        } else {

            if ( this.onError ) this.onError( 'VR input not available.' );

        }

    }

    getVRDisplay () {

        return this.vrDisplay;

    }

    setVRDisplay ( value ) {

        this.vrDisplay = value;

    }

    getVRDisplays () {

        console.warn( 'THREE.VRControls: getVRDisplays() is being deprecated.' );
        return this.vrDisplays;

    }

    getStandingMatrix () {

        return this.standingMatrix;

    }

    update () {

        if ( this.vrDisplay ) {

            var pose;

            if ( this.vrDisplay.getFrameData ) {

                this.vrDisplay.getFrameData( this.frameData );
                pose = this.frameData.pose;

            } else if ( this.vrDisplay.getPose ) {

                pose = this.vrDisplay.getPose();

            }

            if ( pose.orientation !== null ) {

                this.object.quaternion.fromArray( pose.orientation );

            }

            if ( pose.position !== null ) {

                this.object.position.fromArray( pose.position );

            } else {

                this.object.position.set( 0, 0, 0 );

            }

            if ( this.standing ) {

                if ( this.vrDisplay.stageParameters ) {

                    this.object.updateMatrix();

                    this.standingMatrix.fromArray( this.vrDisplay.stageParameters.sittingToStandingTransform );
                    this.object.applyMatrix( this.standingMatrix );

                } else {

                    this.object.position.setY( this.object.position.y + this.userHeight );

                }

            }

            this.object.position.multiplyScalar( this.scale );

        }

    }

    dispose () {

        this.vrDisplay = null;

    }

    constructor ( object:THREE.Object3D, onError?:any ) {

        this.object = object;
        this.onError = onError;

        this.standingMatrix = new THREE.Matrix4();

        this.frameData = null;

        if ( 'VRFrameData' in window ) {
            this.frameData = new VRFrameData();
        }


        if ( navigator.getVRDisplays ) {

            navigator.getVRDisplays().then( this.gotVRDisplays ).catch( () => {

                console.warn( 'THREE.VRControls: Unable to get VR Displays' );

            });
        }

        // the Rift SDK returns the position in meters
        // this scale factor allows the user to define how meters
        // are converted to scene units.

        this.scale = 1;

        // If true will use "standing space" coordinate system where y=0 is the
        // floor and x=0, z=0 is the center of the room.
        this.standing = false;

        // Distance from the users eyes to the floor in meters. Used when
        // standing=true but the VRDisplay doesn't provide stageParameters.
        this.userHeight = 1.6;
    }
}