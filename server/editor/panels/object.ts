// -----------------------------------------------------------------------------
// object.ts
// -----------------------------------------------------------------------------
import *            as THREE            from 'three';
import { Panel      as UIPanel      }   from '../gui/panel';
import { Button     as UIButton     }   from '../gui/button';
import { Number     as UINumber     }   from '../gui/number';
import { Div        as UIDiv        }   from '../gui/div';
import { Span       as UISpan       }   from '../gui/span';
import { Row        as UIRow        }   from '../gui/row';
import { Color      as UIColor      }   from '../gui/color';
import { Text       as UIText       }   from '../gui/text';
import { Break      as UIBreak      }   from '../gui/break';
import { Select     as UISelect     }   from '../gui/select';
import { Boolean    as UIBoolean    }   from '../gui/boolean';
import { Input      as UIInput      }   from '../gui/input';
import { Checkbox   as UICheckbox   }   from '../gui/checkbox';
import { TextArea   as UITextArea   }   from '../gui/text-area';
import { Outliner   as UIOutliner   }   from '../gui/outliner';
import { SetPositionCommand         }   from '../commands/set-position-command';
import { SetRotationCommand         }   from '../commands/set-rotation-command';
import { SetScaleCommand            }   from '../commands/set-scale-command';
import { SetUuidCommand             }   from '../commands/set-uuid-command';
import { SetValueCommand            }   from '../commands/set-value-command';
import { SetColorCommand            }   from '../commands/set-color-command';

import { IEditor                    }   from '../interface';
import { ISignals                   }   from '../interface';
import { EditorPanel                }   from './editor';


/**
 * object panel
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class ObjectPanel
 * @extends {EditorPanel}
 */
export class ObjectPanel extends EditorPanel {

    // [ Constructor ]

    constructor ( editor:IEditor ) {
        super( 'object' );

        this._editor     = editor;
        this._signals    = editor.signals;

        this.setBorderTop   ( '0' );
        this.setPaddingTop  ( '20px' );
        this.setPaddingRight( '0px' );
        this.setDisplay     ( 'none' );

        this._objectActions = new UISelect().setPosition( 'absolute' ).setRight( '8px' ).setFontSize( '11px' );
        this._objectActions.setOptions( {
            'Actions'       : 'Actions',
            'Reset Position': 'Reset Position',
            'Reset Rotation': 'Reset Rotation',
            'Reset Scale'   : 'Reset Scale'
        });
        this._objectActions.onClick( ( event ) => {
            event.stopPropagation(); // Avoid panel collapsing
        });
        this._objectActions.onChange( ( event ) => {

            let object = editor.selected;
            if( object ) {
                switch ( this._objectActions.getValue() ) {

                case 'Reset Position':
                    editor.execute( new SetPositionCommand( object, new THREE.Vector3( 0, 0, 0 ) ) );
                    break;

                case 'Reset Rotation':
                    editor.execute( new SetRotationCommand( object, new THREE.Euler( 0, 0, 0 ) ) );
                    break;

                case 'Reset Scale':
                    editor.execute( new SetScaleCommand( object, new THREE.Vector3( 1, 1, 1 ) ) );
                    break;
                }

                this._objectActions.setValue( 'Actions' );
            }
        });
        // this.addStatic( this._objectActions );

        // [ type ]

        this._objectTypeRow     = new UIRow();
        this._objectType        = new UIText();
        this._objectTypeRow.add( new UIText( 'Type' ).setWidth( '90px' ) );
        this._objectTypeRow.add( this._objectType );
        this.add( this._objectTypeRow );

        // [ uuid ]

        this._objectUUIDRow     = new UIRow();
        this._objectUUID        = new UIInput().setWidth( '102px' ).setFontSize( '12px' ).setDisabled( true );
        let objectUUIDRenew     = new UIButton( 'New' ).setMarginLeft( '7px' ).onClick( () => {
            if( editor.selected ) {
                this._objectUUID.setValue( THREE.Math.generateUUID() );
                editor.execute( new SetUuidCommand( editor.selected, this._objectUUID.getValue() ) );
            }
        });
        this._objectUUIDRow.add( new UIText( 'UUID' ).setWidth( '90px' ) );
        this._objectUUIDRow.add( this._objectUUID );
        this._objectUUIDRow.add( objectUUIDRenew );
        this.add( this._objectUUIDRow );

        // [ name ]

        this._objectNameRow  = new UIRow();
        this._objectName     = new UIInput().setWidth( '150px' ).setFontSize( '12px' ).onChange( () => {
            if( editor.selected ) {
                editor.execute( new SetValueCommand( editor.selected, 'name', this._objectName.getValue() ) );
            }
        });
        this._objectNameRow.add( new UIText( 'Name' ).setWidth( '90px' ) );
        this._objectNameRow.add( this._objectName );
        this.add( this._objectNameRow );

        // [ position ]

        this._objectPositionRow = new UIRow();
        this._objectPositionX = new UINumber().setWidth( '50px' ).onChange( this.update );
        this._objectPositionY = new UINumber().setWidth( '50px' ).onChange( this.update );
        this._objectPositionZ = new UINumber().setWidth( '50px' ).onChange( this.update );
        this._objectPositionRow.add( new UIText( 'Position' ).setWidth( '90px' ) );
        this._objectPositionRow.add( this._objectPositionX, this._objectPositionY, this._objectPositionZ );
        this.add( this._objectPositionRow );

        // [ rotation ]

        this._objectRotationRow = new UIRow();
        this._objectRotationX = new UINumber().setStep( 10 ).setUnit( '°' ).setWidth( '50px' ).onChange( this.update );
        this._objectRotationY = new UINumber().setStep( 10 ).setUnit( '°' ).setWidth( '50px' ).onChange( this.update );
        this._objectRotationZ = new UINumber().setStep( 10 ).setUnit( '°' ).setWidth( '50px' ).onChange( this.update );
        this._objectRotationRow.add( new UIText( 'Rotation' ).setWidth( '90px' ) );
        this._objectRotationRow.add( this._objectRotationX, this._objectRotationY, this._objectRotationZ );
        this.add( this._objectRotationRow );

        // [ scale ]

        this._objectScaleRow  = new UIRow();
        this._objectScaleLock = new UICheckbox( true ).setPosition( 'absolute' ).setLeft( '75px' );
        this._objectScaleX = new UINumber( 1 ).setRange( 0.01, Infinity ).setWidth( '50px' ).onChange( this.updateScaleX );
        this._objectScaleY = new UINumber( 1 ).setRange( 0.01, Infinity ).setWidth( '50px' ).onChange( this.updateScaleY );
        this._objectScaleZ = new UINumber( 1 ).setRange( 0.01, Infinity ).setWidth( '50px' ).onChange( this.updateScaleZ );
        this._objectScaleRow.add( new UIText( 'Scale' ).setWidth( '90px' ) );
        this._objectScaleRow.add( this._objectScaleLock );
        this._objectScaleRow.add( this._objectScaleX, this._objectScaleY, this._objectScaleZ );
        this.add( this._objectScaleRow );

        // [ fov ]

        this._objectFovRow    = new UIRow();
        this._objectFov       = new UINumber().onChange( this.update );
        this._objectFovRow.add( new UIText( 'Fov' ).setWidth( '90px' ) );
        this._objectFovRow.add( this._objectFov );
        this.add( this._objectFovRow );

        // [ near ]

        this._objectNearRow = new UIRow();
        this._objectNear = new UINumber().onChange( this.update );
        this._objectNearRow.add( new UIText( 'Near' ).setWidth( '90px' ) );
        this._objectNearRow.add( this._objectNear );
        this.add( this._objectNearRow );

        // [ far ]

        this._objectFarRow = new UIRow();
        this._objectFar = new UINumber().onChange( this.update );
        this._objectFarRow.add( new UIText( 'Far' ).setWidth( '90px' ) );
        this._objectFarRow.add( this._objectFar );
        this.add( this._objectFarRow );

        // [ intensity ]

        this._objectIntensityRow = new UIRow();
        this._objectIntensity = new UINumber().setRange( 0, Infinity ).onChange( this.update );
        this._objectIntensityRow.add( new UIText( 'Intensity' ).setWidth( '90px' ) );
        this._objectIntensityRow.add( this._objectIntensity );
        this.add( this._objectIntensityRow );

        // [ color ]

        this._objectColorRow = new UIRow();
        this._objectColor = new UIColor().onChange( this.update );
        this._objectColorRow.add( new UIText( 'Color' ).setWidth( '90px' ) );
        this._objectColorRow.add( this._objectColor );
        this.add( this._objectColorRow );

        // [ ground color ]

        this._objectGroundColorRow = new UIRow();
        this._objectGroundColor = new UIColor().onChange( this.update );
        this._objectGroundColorRow.add( new UIText( 'Ground color' ).setWidth( '90px' ) );
        this._objectGroundColorRow.add( this._objectGroundColor );
        this.add( this._objectGroundColorRow );

        // [ distance ]

        this._objectDistanceRow = new UIRow();
        this._objectDistance = new UINumber().setRange( 0, Infinity ).onChange( this.update );
        this._objectDistanceRow.add( new UIText( 'Distance' ).setWidth( '90px' ) );
        this._objectDistanceRow.add( this._objectDistance );
        this.add( this._objectDistanceRow );

        // [ angle ]

        this._objectAngleRow = new UIRow();
        this._objectAngle = new UINumber().setPrecision( 3 ).setRange( 0, Math.PI / 2 ).onChange( this.update );
        this._objectAngleRow.add( new UIText( 'Angle' ).setWidth( '90px' ) );
        this._objectAngleRow.add( this._objectAngle );
        this.add( this._objectAngleRow );

        // [ penumbra ]

        this._objectPenumbraRow = new UIRow();
        this._objectPenumbra = new UINumber().setRange( 0, 1 ).onChange( this.update );
        this._objectPenumbraRow.add( new UIText( 'Penumbra' ).setWidth( '90px' ) );
        this._objectPenumbraRow.add( this._objectPenumbra );
        this.add( this._objectPenumbraRow );

        // [ decay ]

        this._objectDecayRow = new UIRow();
        this._objectDecay = new UINumber().setRange( 0, Infinity ).onChange( this.update );
        this._objectDecayRow.add( new UIText( 'Decay' ).setWidth( '90px' ) );
        this._objectDecayRow.add( this._objectDecay );
        this.add( this._objectDecayRow );

        // [ shadow ]

        this._objectShadowRow = new UIRow();
        this._objectShadowRow.add( new UIText( 'Shadow' ).setWidth( '90px' ) );
        this._objectCastShadow = new UIBoolean( false, 'cast' ).onChange( this.update );
        this._objectShadowRow.add( this._objectCastShadow );
        this._objectReceiveShadow = new UIBoolean( false, 'receive' ).onChange( this.update );
        this._objectShadowRow.add( this._objectReceiveShadow );
        this._objectShadowRadius = new UINumber( 1 ).onChange( this.update );
        this._objectShadowRow.add( this._objectShadowRadius );
        this.add( this._objectShadowRow );

        // [ visible ]

        this._objectVisibleRow = new UIRow();
        this._objectVisible = new UICheckbox().onChange( this.update );
        this._objectVisibleRow.add( new UIText( 'Visible' ).setWidth( '90px' ) );
        this._objectVisibleRow.add( this._objectVisible );
        this.add( this._objectVisibleRow );

        // [ user data ]

        let timeout;
        this._objectUserDataRow = new UIRow();
        this._objectUserData = new UITextArea().setWidth( '150px' ).setHeight( '40px' ).setFontSize( '12px' ).onChange( this.update );
        this._objectUserData.onKeyUp( () => {
            try {
                JSON.parse( this._objectUserData.getValue() );
                this._objectUserData.core.classList.add( 'success' );
                this._objectUserData.core.classList.remove( 'fail' );
            } catch ( error ) {
                this._objectUserData.core.classList.remove( 'success' );
                this._objectUserData.core.classList.add( 'fail' );
            }
        });
        this._objectUserDataRow.add( new UIText( 'User data' ).setWidth( '90px' ) );
        this._objectUserDataRow.add( this._objectUserData );
        this.add( this._objectUserDataRow );


        // events

        this._signals.objectSelected.add( ( object ) => {

            if ( object !== null ) {
                this.setDisplay( 'block' );
                this.updateRows( object );
                this.updateUI( object );
            } else {
                this.setDisplay( 'none' );
            }
        });

        this._signals.objectChanged.add( ( object ) => {
            if ( object !== editor.selected ) return;
            this.updateUI( object );
        });

        this._signals.refreshSidebarObject3D.add( ( object ) => {
            if ( object !== editor.selected ) return;
            this.updateUI( object );
        });
    }


    // [ Private ]

    private _editor                 : IEditor;
    private _signals                : ISignals;

    private _objectTypeRow          : UIRow;
    private _objectUUIDRow          : UIRow;
    private _objectNameRow          : UIRow;
    private _objectPositionRow      : UIRow;
    private _objectRotationRow      : UIRow;
    private _objectScaleRow         : UIRow;
    private _objectFovRow           : UIRow;
    private _objectNearRow          : UIRow;
    private _objectFarRow           : UIRow;
    private _objectIntensityRow     : UIRow;
    private _objectColorRow         : UIRow;
    private _objectGroundColorRow   : UIRow;
    private _objectDistanceRow      : UIRow;
    private _objectAngleRow         : UIRow;
    private _objectPenumbraRow      : UIRow;
    private _objectDecayRow         : UIRow;
    private _objectShadowRow        : UIRow;
    private _objectVisibleRow       : UIRow;
    private _objectUserDataRow      : UIRow;

    private _objectType             : UIText;
    private _objectUUID             : UIInput;
    private _objectName             : UIInput;
	private _objectActions          : UISelect;
    private _objectPositionX        : UINumber;
    private _objectPositionY        : UINumber;
    private _objectPositionZ        : UINumber;
    private _objectRotationX        : UINumber;
    private _objectRotationY        : UINumber;
    private _objectRotationZ        : UINumber;
    private _objectScaleLock        : UICheckbox;
    private _objectScaleX           : UINumber;
    private _objectScaleY           : UINumber;
    private _objectScaleZ           : UINumber;
    private _objectFov              : UINumber;
    private _objectNear             : UINumber;
    private _objectFar              : UINumber;
    private _objectIntensity        : UINumber;
    private _objectColor            : UIColor;
    private _objectGroundColor      : UIColor;
    private _objectDistance         : UINumber;
    private _objectAngle            : UINumber;
    private _objectPenumbra         : UINumber;
    private _objectDecay            : UINumber;
    private _objectCastShadow       : UIBoolean;
    private _objectReceiveShadow    : UIBoolean;
    private _objectShadowRadius     : UINumber;
    private _objectVisible          : UICheckbox;
    private _objectUserData         : UITextArea;

    private updateScaleX = () => {

        let object = this._editor.selected;
        if( object ) {
            if ( this._objectScaleLock.getValue() === true ) {

                let scale = this._objectScaleX.getValue() / object.scale.x;

                this._objectScaleY.setValue( this._objectScaleY.getValue() * scale );
                this._objectScaleZ.setValue( this._objectScaleZ.getValue() * scale );

            }
           this.update();
        }
    }

    private updateScaleY = () => {

        let object = this._editor.selected;
        if( object ) {
            if ( this._objectScaleLock.getValue() ) {

                let scale = this._objectScaleY.getValue() / object.scale.y;

                this._objectScaleX.setValue( this._objectScaleX.getValue() * scale );
                this._objectScaleZ.setValue( this._objectScaleZ.getValue() * scale );
            }
            this.update();
        }
    }

    private updateScaleZ = () => {

        let object = this._editor.selected;
        if( object ) {
            if ( this._objectScaleLock.getValue() ) {
                let scale = this._objectScaleZ.getValue() / object.scale.z;
                this._objectScaleX.setValue( this._objectScaleX.getValue() * scale );
                this._objectScaleY.setValue( this._objectScaleY.getValue() * scale );
            }
            this.update();
        }
    }

    private update = () => {

        let object = <any>this._editor.selected;

        if ( object !== null ) {

            let newPosition = new THREE.Vector3( this._objectPositionX.getValue(), this._objectPositionY.getValue(), this._objectPositionZ.getValue() );
            if ( object.position.distanceTo( newPosition ) >= 0.01 ) {

                this._editor.execute( new SetPositionCommand( object, newPosition ) );

            }

            let newRotation = new THREE.Euler( this._objectRotationX.getValue() * THREE.Math.DEG2RAD, this._objectRotationY.getValue() * THREE.Math.DEG2RAD, this._objectRotationZ.getValue() * THREE.Math.DEG2RAD );
            if ( object.rotation.toVector3().distanceTo( newRotation.toVector3() ) >= 0.01 ) {

                this._editor.execute( new SetRotationCommand( object, newRotation ) );

            }

            let newScale = new THREE.Vector3( this._objectScaleX.getValue(), this._objectScaleY.getValue(), this._objectScaleZ.getValue() );
            if ( object.scale.distanceTo( newScale ) >= 0.01 ) {

                this._editor.execute( new SetScaleCommand( object, newScale ) );

            }

            // [ PerspectiveCamera ]

            if ( object.fov !== undefined && Math.abs( object.fov - this._objectFov.getValue() ) >= 0.01 ) {
                this._editor.execute( new SetValueCommand( object, 'fov', this._objectFov.getValue() ) );
                object.updateProjectionMatrix();
            }

            if ( object.near !== undefined && Math.abs( object.near - this._objectNear.getValue() ) >= 0.01 ) {
                this._editor.execute( new SetValueCommand( object, 'near', this._objectNear.getValue() ) );
            }

            if ( object.far !== undefined && Math.abs( object.far - this._objectFar.getValue() ) >= 0.01 ) {
                this._editor.execute( new SetValueCommand( object, 'far', this._objectFar.getValue() ) );
            }

            // [ Light ]

            if ( object.intensity !== undefined && Math.abs( object.intensity - this._objectIntensity.getValue() ) >= 0.01 ) {
                this._editor.execute( new SetValueCommand( object, 'intensity', this._objectIntensity.getValue() ) );
            }

            // [ Material ]

            if ( object.color !== undefined && object.color.getHex() !== this._objectColor.getHexValue() ) {
                this._editor.execute( new SetColorCommand( object, 'color', this._objectColor.getHexValue() ) );
            }

            if ( object.groundColor !== undefined && object.groundColor.getHex() !== this._objectGroundColor.getHexValue() ) {
                this._editor.execute( new SetColorCommand( object, 'groundColor', this._objectGroundColor.getHexValue() ) );
            }

            if ( object.distance !== undefined && Math.abs( object.distance - this._objectDistance.getValue() ) >= 0.01 ) {
                this._editor.execute( new SetValueCommand( object, 'distance', this._objectDistance.getValue() ) );
            }

            if ( object.angle !== undefined && Math.abs( object.angle - this._objectAngle.getValue() ) >= 0.01 ) {
                this._editor.execute( new SetValueCommand( object, 'angle', this._objectAngle.getValue() ) );

            }
            if ( object.penumbra !== undefined && Math.abs( object.penumbra - this._objectPenumbra.getValue() ) >= 0.01 ) {
                this._editor.execute( new SetValueCommand( object, 'penumbra', this._objectPenumbra.getValue() ) );
            }

            if ( object.decay !== undefined && Math.abs( object.decay - this._objectDecay.getValue() ) >= 0.01 ) {
                this._editor.execute( new SetValueCommand( object, 'decay', this._objectDecay.getValue() ) );
            }

            if ( object.visible !== this._objectVisible.getValue() ) {
                this._editor.execute( new SetValueCommand( object, 'visible', this._objectVisible.getValue() ) );
            }

            if ( object.castShadow !== undefined && object.castShadow !== this._objectCastShadow.getValue() ) {
                this._editor.execute( new SetValueCommand( object, 'castShadow', this._objectCastShadow.getValue() ) );
            }

            if ( object.receiveShadow !== undefined && object.receiveShadow !== this._objectReceiveShadow.getValue() ) {
                this._editor.execute( new SetValueCommand( object, 'receiveShadow', this._objectReceiveShadow.getValue() ) );
                object.material.needsUpdate = true;
            }

            if ( object.shadow !== undefined ) {
                if ( object.shadow.radius !== this._objectShadowRadius.getValue() ) {
                    this._editor.execute( new SetValueCommand( object.shadow, 'radius', this._objectShadowRadius.getValue() ) );
                }
            }

            try {
                let userData = JSON.parse( this._objectUserData.getValue() );
                if ( JSON.stringify( object.userData ) != JSON.stringify( userData ) ) {
                    this._editor.execute( new SetValueCommand( object, 'userData', userData ) );
                }
            } catch ( exception ) {
                console.warn( exception );
            }
        }
    }

    private updateRows = ( object ) => {

        let properties = {
            'fov'           : this._objectFovRow,
            'near'          : this._objectNearRow,
            'far'           : this._objectFarRow,
            'intensity'     : this._objectIntensityRow,
            'color'         : this._objectColorRow,
            'groundColor'   : this._objectGroundColorRow,
            'distance'      : this._objectDistanceRow,
            'angle'         : this._objectAngleRow,
            'penumbra'      : this._objectPenumbraRow,
            'decay'         : this._objectDecayRow,
            'castShadow'    : this._objectShadowRow,
            'receiveShadow' : this._objectReceiveShadow,
            'shadow'        : this._objectShadowRadius
        };

        for ( let property in properties ) {
            properties[ property ].setDisplay( object[ property ] !== undefined ? '' : 'none' );
        }
    }

    private updateTransformRows = ( object ) =>{

        if ( object instanceof THREE.Light || ( object instanceof THREE.Object3D && object.userData.targetInverse ) ) {
            this._objectRotationRow.setDisplay( 'none' );
            this._objectScaleRow.setDisplay( 'none' );
        } else {
            this._objectRotationRow.setDisplay( '' );
            this._objectScaleRow.setDisplay( '' );
        }
    }

    private updateUI = ( object ) => {

        this._objectType.setValue( object.type );

        this._objectUUID.setValue( object.uuid );
        this._objectName.setValue( object.name );

        this._objectPositionX.setValue( object.position.x );
        this._objectPositionY.setValue( object.position.y );
        this._objectPositionZ.setValue( object.position.z );

        this._objectRotationX.setValue( object.rotation.x * THREE.Math.RAD2DEG );
        this._objectRotationY.setValue( object.rotation.y * THREE.Math.RAD2DEG );
        this._objectRotationZ.setValue( object.rotation.z * THREE.Math.RAD2DEG );

        this._objectScaleX.setValue( object.scale.x );
        this._objectScaleY.setValue( object.scale.y );
        this._objectScaleZ.setValue( object.scale.z );

        if ( object.fov !== undefined ) {
            this._objectFov.setValue( object.fov );
        }
        if ( object.near !== undefined ) {
            this._objectNear.setValue( object.near );
        }
        if ( object.far !== undefined ) {
            this._objectFar.setValue( object.far );
        }
        if ( object.intensity !== undefined ) {
            this._objectIntensity.setValue( object.intensity );
        }
        if ( object.color !== undefined ) {
            this._objectColor.setHexValue( object.color.getHexString() );
        }
        if ( object.groundColor !== undefined ) {
            this._objectGroundColor.setHexValue( object.groundColor.getHexString() );
        }
        if ( object.distance !== undefined ) {
            this._objectDistance.setValue( object.distance );
        }
        if ( object.angle !== undefined ) {
            this._objectAngle.setValue( object.angle );
        }
        if ( object.penumbra !== undefined ) {
            this._objectPenumbra.setValue( object.penumbra );
        }
        if ( object.decay !== undefined ) {
            this._objectDecay.setValue( object.decay );
        }
        if ( object.castShadow !== undefined ) {
            this._objectCastShadow.setValue( object.castShadow );
        }
        if ( object.receiveShadow !== undefined ) {
            this._objectReceiveShadow.setValue( object.receiveShadow );
        }
        if ( object.shadow !== undefined ) {
            this._objectShadowRadius.setValue( object.shadow.radius );
        }
        this._objectVisible.setValue( object.visible );
        try {
            this._objectUserData.setValue( JSON.stringify( object.userData, null, '  ' ) );
        } catch ( error ) {
            console.log( error );
        }

        this._objectUserData.setBorderColor( 'transparent' );
        this._objectUserData.setBackgroundColor( '' );
        this.updateTransformRows( object );
    }
}
